"use client";
import { setLocale } from "@/app/actions/server";
import { locales } from "@/app/lib/locales";
import { Button, CloseButton, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useLocale } from "next-intl";
import { FaAngleDown } from "react-icons/fa";

type LocaleKey = keyof typeof locales;

export default function LanguageSelector({mobile}:{mobile?:boolean}) {
    const locale = useLocale();

    const setLang = async (lang: string) => {
        await setLocale(lang);
    };

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <PopoverButton className={'flex flex-row items-center gap-1 cursor-pointer'}>
                        <img className="w-[32px] h-[32px]" src={locales[locale as LocaleKey].img} alt="" />
                        <FaAngleDown className={`duration-300 transition-all ${open ? `rotate-180` : 'rotate-0'}`} />
                    </PopoverButton>
                    <PopoverPanel anchor="bottom" transition className={`flex flex-col items-start z-200 dark:bg-gray-800/70 border-2 dark:border-gray-700/70 ${mobile ? 'bg-gray-800/70 border-gray-700/70 ml-2 text-white' : 'bg-gray-200/70 border-gray-300/70'} shadow py-2 px-4 rounded backdrop-blur-sm transition duration-200 ease-out data-closed:-translate-y-12 data-closed:scale-95 data-closed:opacity-0 gap-3`}>
                        {(Object.keys(locales) as Array<LocaleKey>).map((loc) => (
                            <CloseButton as={Button} onClick={() => setLang(loc)} className="flex flex-row items-center gap-3 cursor-pointer" key={loc}>
                                <img className="w-[32px] h-[32px]" src={locales[loc].img} alt="" />
                                <span>{locales[loc].name}</span>
                            </CloseButton>
                        ))}
                    </PopoverPanel>
                </>
            )}
        </Popover>
    )
}