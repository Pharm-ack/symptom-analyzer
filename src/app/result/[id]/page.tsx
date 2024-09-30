import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";

async function getSymptomAnalysis(id: string, userId: string) {
  const query = await prisma.query.findUnique({
    where: { id, userId },
    include: { result: true },
  });

  if (!query) notFound();

  return query;
}

export default async function SymptomAnalysisResult({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const userId = session.user.id;
  if (!userId) {
    throw new Error("User ID is required");
  }

  const query = await getSymptomAnalysis(params.id, userId);

  return (
    <div className="container py-16 sm:py-20 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Symptom Analysis Result</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Query Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Symptoms:</strong> {query.symptoms}
          </p>
          <p>
            <strong>Age:</strong> {query.age}
          </p>
          <p>
            <strong>Gender:</strong> {query.gender}
          </p>
          <p>
            <strong>Date:</strong> {query.createdAt.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            dangerouslySetInnerHTML={{
              __html: query.result?.analysis || "No analysis available",
            }}
          />
        </CardContent>
      </Card>

      <Badge className="mt-4">ID: {query.id}</Badge>
    </div>
  );
}
