"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getRecommendation } from "@/lib/api";

export default function RecommendationForm() {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [dependents, setDependents] = useState("");
  const [risk, setRisk] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    recommendation: string;
    explanation: string;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await getRecommendation({
        age: Number(age),
        income: Number(income),
        dependents: Number(dependents),
        riskTolerance: risk,
      });
      setResult(res);
    } catch (err) {
      alert("Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Life Insurance Recommendation</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="income">Income</Label>
          <Input
            id="income"
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dependents">Number of Dependents</Label>
          <Input
            id="dependents"
            type="number"
            min={0}
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Risk Tolerance</Label>
          <RadioGroup
            value={risk}
            onValueChange={(val) => setRisk(val as any)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          disabled={loading}
          variant="default"
          className="cursor-pointer bg-amber-400 text-white font-bold"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Recommendation
        </Button>
      </form>

      {result && (
        <div className="mt-8 border p-4 rounded-lg bg-muted">
          <h2 className="text-xl font-semibold text-primary">
            {result.recommendation}
          </h2>
          <p className="text-muted-foreground">{result.explanation}</p>
        </div>
      )}
    </main>
  );
}
