"use client";
import GoogleIcon from "@/icons/goggleIcon";
import SpinIcon from "@/icons/spinIcon";
import { signIn } from "next-auth/react";
import { FC, ReactNode, useState } from "react";

interface googleSignInBtnProps {
  children: ReactNode;
}

export const GoogleSignBTN: FC<googleSignInBtnProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const LoginwithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={LoginwithGoogle}
      className="text-md flex w-full items-center justify-center gap-3 rounded-[12px] bg-gray-500 px-5 py-2 text-violet-100 hover:bg-violet-300 hover:text-violet-700"
    >
      {isLoading && <SpinIcon />}
      <GoogleIcon />
      {children}
    </button>
  );
};
