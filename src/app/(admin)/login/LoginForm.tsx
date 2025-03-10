"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";
import { LockIcon, UserIcon } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";



const LoginForm = () => {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="flex-1 min-h-[80vh] flex flex-col justify-center items-center">
      <Card className="w-full max-w-md border-champagneGold/20 dark:bg-charcoalBlack bg-marbleWhite shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight dark:text-marbleWhite text-charcoalBlack">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slateGray">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="dark:text-marbleWhite text-charcoalBlack"
              >
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slateGray" />
                </div>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="pl-10 border-softBeige focus:border-champagneGold focus:ring-champagneGold"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="dark:text-marbleWhite text-charcoalBlack"
              >
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-slateGray" />
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="pl-10 border-softBeige focus:border-champagneGold focus:ring-champagneGold"
                  required
                />
              </div>
            </div>
            {state?.errors?.message && (
              <p className="text-red-500 text-sm">{state.errors.message}</p>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-champagneGold hover:bg-champagneGold/90 text-charcoalBlack"
      disabled={pending}
    >
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
};
