"use server";

export type RecommendationRequest = {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: "low" | "medium" | "high";
};

export type RecommendationResponse = {
  recommendation: string;
  explanation: string;
};

export async function getRecommendation(
  input: RecommendationRequest
): Promise<RecommendationResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}recommendation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  console.log("Response status:", res.status);

  if (!res.ok) throw new Error("Failed to fetch recommendation");

  return res.json();
}
