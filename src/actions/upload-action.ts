"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { symptomCheckerSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
  analysis?: string;
};

export async function analyzeSymptoms(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: symptomCheckerSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { symptoms, age, gender } = submission.value;

  const session = await auth();
  if (!session?.user) return { status: "error", message: "Unauthorized" };

  const userId = session.user.id;
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    // Use Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze these symptoms for a ${age}-year-old ${gender}: ${symptoms}. Provide possible conditions and general advice, but always recommend consulting a doctor.`;

    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    if (!analysis) {
      throw new Error("No analysis was generated");
    }

    // Save the query and result to the database
    const query = await prisma.query.create({
      data: {
        symptoms,
        age: parseInt(age),
        gender,
        result: {
          create: {
            analysis,
          },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        result: true,
      },
    });

    if (!query.result) {
      throw new Error("Failed to save analysis result");
    }

    return {
      status: "success",
      message: "Symptoms analyzed successfully.",
      analysis: query.result.analysis,
    };
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    return {
      status: "error",
      message: "An error occurred while analyzing symptoms.",
    };
  }
}
