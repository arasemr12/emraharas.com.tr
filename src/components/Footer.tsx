"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Footer() {
    const footer = useRef<HTMLDivElement>(null);

    const t = useTranslations('*');

    /*useEffect(() => {

        const footerCalculate = () => {
            const viewportHeight = window.innerHeight;
            const bodyHeight = document.body.clientHeight;

            if (viewportHeight > bodyHeight && footer.current) {
                footer.current.style = `margin-top: ${viewportHeight - bodyHeight}px;`;
            }else if(footer.current){
                //footer.current.style = ``;
            }

            requestAnimationFrame(footerCalculate);
        };

        footerCalculate();
    }, []);*/

    return (
        <>
            <div ref={footer} className="w-full py-4 px-4 bg-gray-900 text-white flex flex-col gap-2 items-center border-t-2 border-gray-800 z-70">
                <div className="lg:w-2/3 w-full flex flex-row items-center gap-5 text-xl">
                    <Link href="/blog">{t("footer.blog")}</Link>
                    <Link href="/contact">{t("footer.contact")}</Link>
                    <Link href="/privacy-policy">{t("footer.privacypolicy")}</Link>
                </div>
                <div className="lg:w-2/3 w-full flex flex-row items-center justify-center gap-5 text-xl">
                    <span className="text-xs opacity-50 select-none">&copy; Emrah Aras 2026</span>
                </div>
            </div>
        </>
    )
}