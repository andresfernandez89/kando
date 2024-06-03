"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitchBtn from "@/components/locale-switch-btn";

export function Navbar() {
  const { data: session } = useSession();
  const t = useTranslations("Nav");
  const locale = useLocale();

  return (
    <aside className="fixed w-full max-w-3xl bg-white pb-10 pt-8 dark:bg-black">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row justify-between px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            <Link
              href={"/" + locale}
              className="text-ml relative mr-10 flex py-1 align-middle font-bold text-rose-500 hover:border-b-2 hover:border-teal-400 hover:text-rose-300 dark:text-rose-400 dark:hover:text-neutral-200 md:text-xl"
            >
              {t("home")}
            </Link>
            <Link
              href={"/blog"}
              className="text-ml relative mr-10 flex py-1 align-middle font-bold text-rose-500 hover:border-b-2 hover:border-teal-400 hover:text-rose-300 dark:text-rose-400 dark:hover:text-neutral-200 md:text-xl"
            >
              {t("blog")}
            </Link>
            <Link
              href={"/about"}
              className="text-ml relative mr-10 flex py-1 align-middle font-bold text-rose-500 hover:border-b-2 hover:border-teal-400 hover:text-rose-300 dark:text-rose-400 dark:hover:text-neutral-200 md:text-xl"
            >
              {t("about")}
            </Link>
          </div>
          <div className="mr-5 flex gap-5">
            {session?.user ? (
              <>
                <button
                  className="text-md relative m-1 flex px-2 py-1 align-middle font-bold text-rose-500 hover:border-b-2 hover:border-teal-400 hover:text-rose-300 dark:text-rose-400 dark:hover:text-neutral-200"
                  onClick={async () => {
                    await signOut({
                      callbackUrl: "/",
                    });
                  }}
                  type="button"
                >
                  {t("logout")}
                </button>
                {/* <Link href={locale + '/profile'}>
                      
                    </Link> */}
              </>
            ) : (
              <>
                <Link href={locale + "/login"}>
                  <button className="text-md relative m-1 flex px-2 py-1 align-middle font-bold text-rose-500 hover:border-b-2 hover:border-teal-400 hover:text-rose-300 dark:text-rose-400 dark:hover:text-neutral-200">
                    {t("login")}
                  </button>
                </Link>

                <Link href={locale + `/register`}>
                  <button
                    className="text-md relative m-1 flex px-2 py-1 align-middle font-bold text-rose-500 hover:border-b-2 hover:border-teal-400 hover:text-rose-300 dark:text-rose-400 dark:hover:text-neutral-200"
                    type="button"
                  >
                    {t("register")}
                  </button>
                </Link>
                {/* <Avatars session={session} /> */}
              </>
            )}
            <div className="flex items-center">
              <LocaleSwitchBtn />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
