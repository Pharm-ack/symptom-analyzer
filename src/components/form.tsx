"use client";

import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Send, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { analyzeSymptoms } from "@/actions/upload-action";
import { symptomCheckerSchema } from "@/lib/schema";
import PendingButton from "./pending-btn";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
  analysis?: string;
};

export default function Form() {
  const { toast } = useToast();
  const [formState, action] = useFormState<FormState, FormData>(
    async (prevState, formData) => {
      console.log("Form submitted, attempting to show toast");
      toast({
        title: "🎙️ Analyzing is in progress...",
        description:
          "Hang tight! Our digital wizards are sprinkling magic dust on your symptoms! ✨",
      });
      console.log("Toast called");

      const result = await analyzeSymptoms(prevState, formData);

      toast({
        title: "🎉 Woohoo! 🎊",
        description: "Symptoms analyzed successfully!",
      });

      if (result.status === "error") {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
      return result;
    },
    {
      status: undefined,
      message: "",
    }
  );

  const [form, fields] = useForm({
    lastResult: formState,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: symptomCheckerSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl relative">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            AI Health Symptom Checker
          </CardTitle>
          <CardDescription>
            Enter your symptoms for a preliminary analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="symptoms">Describe your symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="E.g., headache, fever, sore throat..."
                key={fields.symptoms.key}
                name={fields.symptoms.name}
                defaultValue={fields.symptoms.initialValue}
              />
              <p className="text-red-500 text-xs">{fields.symptoms.errors}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  key={fields.age.key}
                  name={fields.age.name}
                  defaultValue={fields.age.initialValue}
                />
                <p className="text-red-500 text-xs">{fields.age.errors}</p>
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  key={fields.gender.key}
                  name={fields.gender.name}
                  defaultValue={fields.gender.initialValue}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-xs">{fields.gender.errors}</p>
              </div>
            </div>
            <PendingButton>
              <Send className="w-4 h-4 mr-2" />
              Analyze Symptoms
            </PendingButton>
          </form>
        </CardContent>
        {formState.analysis && (
          <CardFooter className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <p>{formState.analysis}</p>
            </ScrollArea>
          </CardFooter>
        )}
      </Card>
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          This is not a substitute for professional medical advice. Always
          consult with a qualified healthcare provider for proper diagnosis and
          treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
}
