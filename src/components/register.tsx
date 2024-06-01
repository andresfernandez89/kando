"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function Register() {
  const [error, setError] = useState();
  const router = useRouter();
  const t = useTranslations("Register");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        rePassword: formData.get("rePassword"),
      });
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });
      if (res?.ok) return router.push("/");
      console.log(signupResponse);
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.msg);
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
          className="w-full rounded-[12px] bg-rose-500 px-5 py-2 text-xl font-bold text-rose-100 hover:bg-rose-300 hover:text-rose-700"
          type="submit"
        >
          {t("registerBtn")}
        </button>
        {error && <div className="text-red-500"> * {error}</div>}
      </form>

      <article className="mt-5 flex items-center justify-center gap-5">
        <p>
          {t("loginMsg")}
          <Link href="/login" className="ms-5 font-semibold text-teal-500">
            {t("login")}
          </Link>
        </p>
      </article>
    </section>
  );
}
