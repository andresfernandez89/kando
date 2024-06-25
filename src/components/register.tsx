"use client";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function Register() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("Register");
  const locale = useLocale();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
          rePassword: formData.get("rePassword"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg);
      }

      const signupResponse = await response.json();

      const res = await signIn("credentials", {
        email: signupResponse.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) {
        return router.push("/");
      }

      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="flex w-full max-w-sm flex-col items-center justify-items-center gap-10 p-5 md:max-w-3xl md:p-10">
      <article className="mt-24 flex items-center justify-center">
        <h1 className="text-2xl font-bold ">{t("title")}</h1>
      </article>
      <form
        className="flex w-5/6 flex-col items-center justify-center gap-5 md:w-96"
        onSubmit={handleSubmit}
      >
        <input
          name="firstName"
          placeholder={t("firstName")}
          type={"text"}
          className="w-full rounded-md bg-white p-2 shadow-md dark:bg-gray-300 dark:text-gray-900"
        />
        <input
          name="lastName"
          placeholder={t("lastName")}
          type={"text"}
          className="w-full rounded-md bg-white p-2 shadow-md dark:bg-gray-300 dark:text-gray-900"
        />
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
        <input
          name="rePassword"
          placeholder={t("repass")}
          type={"password"}
          className="w-full rounded-md bg-white p-2 shadow-md dark:bg-gray-300 dark:text-gray-900"
        />

        <button
          className="w-full rounded-[12px] bg-violet-500 px-5 py-2 text-xl font-bold text-violet-100 hover:bg-violet-300 hover:text-violet-700"
          type="submit"
        >
          {t("registerBtn")}
        </button>
        {error && <div className="text-red-500"> * {error}</div>}
      </form>

      <article className="mt-5 flex items-center justify-center gap-5">
        <p>
          {t("loginMsg")}
          <Link
            href={locale + `/home/login`}
            className="ms-5 font-semibold text-teal-500"
          >
            {t("login")}
          </Link>
        </p>
      </article>
    </section>
  );
}
