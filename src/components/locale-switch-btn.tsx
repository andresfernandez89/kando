"use client";

import SpainFlagIcon from "@/icons/spainFlagIcon";
import UsaFlagIcon from "@/icons/usaFlagIcon";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

function getLocaleFlag(locale: string) {
  switch (locale) {
    case "es":
      return <SpainFlagIcon />;
    case "en":
      return <UsaFlagIcon />;
    default:
      return null;
  }
}
export default function LocaleSwitchBtn() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "es" : "en";
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="flex w-full items-center justify-end gap-x-2 pr-2 pt-1"
    >
      <span className="text-lg">{getLocaleFlag(otherLocale)}</span>
      <p className="hidden text-sm">{t("switch")}</p>
    </Link>
  );
}
