import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { ActivityIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getQueries(userId: string) {
  const queries = await prisma.query.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return queries;
}

export default async function ResultsPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  if (!userId) {
    throw new Error("User ID is required");
  }
  const queries = await getQueries(userId);

  return (
    <div className="container mx-auto p-4 py-16 sm:py-20 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Symptom Analysis Results
      </h1>

      {queries.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No results found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {queries.map((query) => (
            <Card key={query.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold truncate">
                  {query.symptoms}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(query.createdAt).toLocaleDateString()}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/result/${query.id}`}>
                    <ActivityIcon className="mr-2 h-4 w-4" /> View Analysis
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
