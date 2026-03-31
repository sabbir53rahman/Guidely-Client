"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useRegisterStudentMutation,
  useRegisterMentorMutation,
} from "@/redux/features/auth/authApi";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "mentor"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerStudent, { isLoading: isRegisteringStudent }] =
    useRegisterStudentMutation();
  const [registerMentor, { isLoading: isRegisteringMentor }] =
    useRegisterMentorMutation();
  const router = useRouter();

  const isLoading = isRegisteringStudent || isRegisteringMentor;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { role, ...payload } = data;
      let result;

      if (role === "student") {
        result = await registerStudent(payload).unwrap();
      } else {
        result = await registerMentor(payload).unwrap();
      }

      if (result.success) {
        toast.success("Registration successful! Welcome to Guidely.");


        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(
        err?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4 text-left">
        <h1 className="text-4xl font-heading font-black tracking-tight text-foreground">
          Create account
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Join thousands of learners and experts today.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
            >
              Full Name
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-12 h-14 rounded-2xl bg-muted/50 border-border group-focus-within:border-primary group-focus-within:ring-1 group-focus-within:ring-primary transition-all text-base"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm font-medium text-destructive mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
            >
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-12 h-14 rounded-2xl bg-muted/50 border-border group-focus-within:border-primary group-focus-within:ring-1 group-focus-within:ring-primary transition-all text-base"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm font-medium text-destructive mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              I want to join as...
            </Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange("student")}
                    className={`relative group p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      field.value === "student"
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                          field.value === "student"
                            ? "bg-primary text-primary-foreground scale-110"
                            : "bg-muted text-muted-foreground group-hover:scale-105"
                        }`}
                      >
                        <GraduationCap className="h-7 w-7" />
                      </div>
                      <div>
                        <div
                          className={`font-bold text-lg ${
                            field.value === "student"
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          Student
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Learn from experts
                        </div>
                      </div>
                    </div>
                    {field.value === "student" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("mentor")}
                    className={`relative group p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      field.value === "mentor"
                        ? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
                        : "border-border bg-muted/30 hover:border-secondary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                          field.value === "mentor"
                            ? "bg-secondary text-secondary-foreground scale-110"
                            : "bg-muted text-muted-foreground group-hover:scale-105"
                        }`}
                      >
                        <Briefcase className="h-7 w-7" />
                      </div>
                      <div>
                        <div
                          className={`font-bold text-lg ${
                            field.value === "mentor"
                              ? "text-secondary"
                              : "text-foreground"
                          }`}
                        >
                          Mentor
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Share your knowledge
                        </div>
                      </div>
                    </div>
                    {field.value === "mentor" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-secondary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              )}
            />
            {errors.role && (
              <p className="text-sm font-medium text-destructive mt-1 ml-1">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
            >
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-12 pr-12 h-14 rounded-2xl bg-muted/50 border-border group-focus-within:border-primary group-focus-within:ring-1 group-focus-within:ring-primary transition-all text-base"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm font-medium text-destructive mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="text-center text-muted-foreground font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-black hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>

      <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-4">
        By clicking create account, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
