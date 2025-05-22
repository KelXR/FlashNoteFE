'use client'

import AuthApi from "@/api/authApi";
import { LoginForm } from "@/components/login-form";

export default function Home() {

  const handleGoogleLoginApi = async () => {
    window.location.href = 'http://localhost:8080/api/auth/google/login'
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onGoogleLogin={handleGoogleLoginApi} />
      </div>
    </div>
  );
}
