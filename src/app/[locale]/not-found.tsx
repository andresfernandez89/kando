import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <html>
      <body>
        <section className="mt-36">
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            {t("404")}
          </h1>
          <p className="mb-4">{t("msg")}</p>
          <Link href={"/"}>
            <button
              className="
        m-3 
        border-b  
        border-teal-300 
        text-neutral-600 
        hover:border hover:border-orange-300 hover:p-4 
        dark:text-neutral-400 dark:hover:border dark:hover:border-yellow-300  dark:hover:p-4"
            >
              {t("btnGoBack")}
            </button>
          </Link>
        </section>
      </body>
    </html>
  );
}
