"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(isLogin ? "Login submitted" : "Sign up submitted");
    router.push(`/admin/organisations`)
    
  };

  return (
    <div className="min-h-screen max-h-screen bg-white overflow-hidden flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl mb-2">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-light text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-base text-gray-600">
            {isLogin
              ? "Sign in to access your account"
              : "Join us to get started with your journey"}
          </p>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            <div className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-11 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 border-gray-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 border-gray-200 focus:border-red-500 focus:ring-red-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-11 border-gray-200 focus:border-red-500 focus:ring-red-500 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-medium mt-6"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Toggle between login and signup */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
