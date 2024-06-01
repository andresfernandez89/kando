"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-[8%]">
      <h1 className="text-primary-100 mb-20 text-[40px] font-bold">Error</h1>
      <div>
        <button
          onClick={() => reset()}
          className=" bg-accent-100 text-text-100 mr-16 text-xl font-bold hover:text-gray-400"
        >
          Retry
        </button>
        <Link href="/">
          <button className=" bg-accent-100 text-text-100 text-xl font-bold hover:text-gray-400">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
