"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-700 to-purple-900 p-12 text-white">

          <div>
            <h2 className="text-3xl font-bold">YourBrand</h2>
            <p className="mt-2 text-indigo-200">
              Welcome to your dashboard
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Manage your work smarter and faster.
            </h1>

            <p className="mt-5 text-indigo-200 leading-7">
              Access your account, manage your activities, and stay
              connected with everything in one place.
            </p>
          </div>

          <p className="text-sm text-indigo-300">
            © 2026 YourBrand. All rights reserved.
          </p>

        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 sm:p-12">

          <div className="max-w-md mx-auto">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>

              <p className="text-gray-500 mt-2">
                Please enter your details to sign in.
              </p>
            </div>

            <form className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-600"
                  />
                  Remember me
                </label>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-sm text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Google Login UI */}
              <button
                type="button"
                className="w-full border border-gray-300 hover:bg-gray-50 py-3 rounded-lg flex items-center justify-center gap-3 text-gray-700 font-medium transition"
              >
                <span className="font-bold text-lg">G</span>
                Continue with Google
              </button>

            </form>

            {/* Register */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

