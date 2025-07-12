import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import { TextInput, Button, RadioButton } from "react-native-paper";

type FormData = {
  age: string;
  income: string;
  dependents: string;
  riskTolerance: "LOW" | "MEDIUM" | "HIGH";
};

export default function RecommendationForm() {
  const [result, setResult] = useState<null | {
    recommendation: string;
    explanation: string;
  }>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      age: "",
      income: "",
      dependents: "",
      riskTolerance: "MEDIUM",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}recommendation`;
      const res = await axios.post(url, {
        ...data,
        age: Number(data.age),
        income: Number(data.income),
        dependents: Number(data.dependents),
      });

      setResult(res.data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="p-4">
        <Text className="text-3xl font-bold mb-4">Life Insurance Form</Text>

        <Controller
          control={control}
          name="age"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Age"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.age && <Text className="text-red-500">Age is required</Text>}
        <Text className="my-1"></Text>

        <Controller
          control={control}
          name="income"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Income"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.income && (
          <Text className="text-red-500">Income is required</Text>
        )}
        <Text className="my-1"></Text>

        <Controller
          control={control}
          name="dependents"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Dependents"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.dependents && (
          <Text className="text-red-500">Dependents are required</Text>
        )}
        <Text className="my-1"></Text>

        <Text className="text-lg font-medium mt-4 mb-2">Risk Tolerance</Text>

        <Controller
          control={control}
          name="riskTolerance"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <RadioButton.Item label="Low" value="LOW" />
              <RadioButton.Item label="Medium" value="MEDIUM" />
              <RadioButton.Item label="High" value="HIGH" />
            </RadioButton.Group>
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          className="mt-4"
        >
          Submit
        </Button>

        {result && (
          <View className="mt-6 bg-gray-100 p-4 rounded">
            <Text className="text-lg font-bold">Recommendation:</Text>
            <Text>{result.recommendation}</Text>
            <Text className="text-lg font-bold mt-2">Explanation:</Text>
            <Text>{result.explanation}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
