"use client";
import LocaleSwitchBtn from "@/components/locale-switch-btn";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { ModeToggleTheme } from "./modeToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
  const { data: session } = useSession();
  const t = useTranslations("Nav");
  const locale = useLocale();

  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-background">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a
              href="#"
              className="flex items-center text-xl font-bold lg:ml-2.5"
            >
              {/* Logo */}

              <span className="ml-2 self-center whitespace-nowrap">Kando</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="mr-5 flex justify-end gap-5">
              <button
                className="text-md relative m-1 flex px-2 py-1 align-middle font-bold text-violet-500 hover:text-violet-300 dark:text-violet-400 dark:hover:text-neutral-200"
                onClick={async () => {
                  await signOut({
                    callbackUrl: "/",
                  });
                }}
                type="button"
              >
                {t("logout")}
              </button>
            </div>
            {/* User Avatar */}
            <Avatar>
              <AvatarImage src={session?.user?.image} alt="@shadcn" />
              <AvatarFallback>
                {`${session?.user?.firstName[0].toLocaleUpperCase()}${session?.user?.lastName[0].toLocaleUpperCase()}` ||
                  `${session?.user?.email[0].toLocaleUpperCase()}`}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-4">
              <LocaleSwitchBtn />
              <ModeToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
