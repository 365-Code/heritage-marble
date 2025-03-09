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
import { LockIcon, UserIcon } from "lucide-react";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const nav = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        // Redirect to the protected page after login success
        nav.push("/admin/dashboard");
      } else toast.error(data.message);
    } catch (error) {
      if (error instanceof ApiError) toast.error(error.message);
      else toast.error("Some error occured. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your username"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
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
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter your password"
                  className="pl-10 border-softBeige focus:border-champagneGold focus:ring-champagneGold"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-champagneGold hover:bg-champagneGold/90 text-charcoalBlack"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;