import FbIcon from "@/icons/fbIcon";
import GitHubIcon from "@/icons/gitHubIcon";
import InstabramIcon from "@/icons/instagramIcon";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <>
      <footer className="mx-4 my-6 rounded-lg bg-white p-4 shadow md:flex md:items-center md:justify-between md:p-6 xl:p-8">
        <ul className="mb-6 flex flex-wrap items-center md:mb-0">
          <li>
            <Link
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              {t("terms")}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              {t("privacy")}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              {t("licensing")}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              {t("cookie")}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-sm font-normal text-gray-500 hover:underline"
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
        <div className="flex space-x-6 sm:justify-center">
          <Link
            href="https://facebook.com"
            className="text-gray-500 hover:text-gray-900"
          >
            <FbIcon />
          </Link>
          <Link
            href="https://instagram.com"
            className="text-gray-500 hover:text-gray-900"
          >
            <InstabramIcon />
          </Link>
          <Link
            href="https://github.com"
            className="text-gray-500 hover:text-gray-900"
          >
            <GitHubIcon />
          </Link>
        </div>
      </footer>
      <p className="my-10 text-center text-sm text-gray-500">
        &copy; 2024 -{" "}
        <Link href="#" className="hover:underline" target="_blank">
          Andres Fernandez - Sebastián Illa
        </Link>
        . {t("reserved")}.
      </p>
    </>
  );
}