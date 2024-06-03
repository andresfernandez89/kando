/* 'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useTransition } from 'react'
import {Link, usePathname} from '../navigation';


export const LocaleSwitchBtn = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const localActive = useLocale()
    const pathname = usePathname()

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value

        startTransition(() => {
            router.replace(nextLocale)
        })
    }

    return (
        <label className='mr-10'>
            <p className='sr-only'>Language</p>
            <select 
            defaultValue={localActive} 
            className='bg-transparent border-transparent py-2' 
            onChange={onSelectChange}
            disabled={isPending}
            >
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
            </select>
        </label>
    )
} */

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";

export default function LocaleSwitchBtn() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "es" : "en";
  const pathname = usePathname();

  return (
    <Link href={pathname} locale={otherLocale}>
      {t("switchLocale", { locale: otherLocale })}
    </Link>
  );
}
