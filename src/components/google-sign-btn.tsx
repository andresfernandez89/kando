"use client";
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
      className="text-md flex w-full items-center justify-center rounded-[12px] bg-black px-5 py-2 text-rose-100 hover:bg-rose-300 hover:text-rose-700
            dark:bg-gray-500 dark:text-white dark:hover:bg-rose-300 dark:hover:text-rose-700"
    >
      {isLoading && <SpinIcon />}
      {children}
    </button>
  );
};
