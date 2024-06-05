"use client";

import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { GoogleSignBTN } from "./google-sign-btn";
import GoogleIcon from "@/icons/goggleIcon";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const t = useTranslations("Login");
  const locale = useLocale();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) return setError(res.error as string);
    if (res?.ok) return router.push(`/dashboard/board`);
  };

  return (
    <section className="flex w-full max-w-sm flex-col items-center justify-items-center gap-10 p-5 md:max-w-3xl md:p-10">
      <article className="flex items-center justify-center">
        <h1 className="mb-6 mt-12 text-3xl font-bold md:mb-16">{t("title")}</h1>
      </article>
      <form
        className="flex w-5/6 flex-col items-center justify-center gap-5 md:w-96"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          placeholder={t("email")}
          type={"email"}
          className="w-full rounded-md bg-white p-2 shadow-md dark:bg-gray-300 dark:text-gray-900"
        />
        <input
          name="password"
          placeholder={t("pass")}
          type={"password"}
          className="w-full rounded-md bg-white p-2 shadow-md dark:bg-gray-300 dark:text-gray-900"
        />

        <button
          className="mt-10 w-full rounded-[12px] bg-violet-500 px-5 py-2 text-xl font-bold text-violet-100 hover:bg-violet-300 hover:text-violet-700"
          type="submit"
        >
          {t("loginBtn")}
        </button>
        <p className="font-bold"> O </p>

        <GoogleSignBTN>{t("googleBtn")}</GoogleSignBTN>

        {error && <div className="text-red-500"> * {error}</div>}
      </form>

      <article className="my-5 flex flex-col justify-items-center gap-4">
        <p className="text-sm">
          {t("notCount")}
          <Link
            href={"/home/register"}
            className="ms-3 text-teal-500 hover:font-bold hover:text-teal-300"
          >
            {t("register")}
          </Link>
        </p>
        <p className="text-sm">
          {t("passForgot")}
          <Link
            href="#"
            className="ms-2 text-teal-500 hover:font-bold hover:text-teal-300 md:ms-3"
          >
            {t("passRecovery")}
          </Link>
        </p>
      </article>
    </section>
  );
}
