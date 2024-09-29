import { z } from "zod";

export const symptomCheckerSchema = z.object({
  symptoms: z.string().min(1, "Please describe your symptoms"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid age",
  }),
  gender: z.enum(["male", "female", "other"]),
});

export type SymptomCheckerInput = z.infer<typeof symptomCheckerSchema>;

export type AnalysisResult = {
  symptoms: string[];
  age: number;
  gender: string;
  possibleConditions: Array<{ name: string; probability: string }>;
  recommendations: string[];
};
