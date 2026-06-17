"use client";
import Link from "next/link";
import { FaBars, FaMoon } from "react-icons/fa";
import { getTheme, setTheme } from "./Navbar";
import { MouseEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

export default function NavbarInner({ currentTheme }: { currentTheme: string }) {
    const changeTheme = async () => {
        let theme = await getTheme();

        let newTheme = theme == "light" ? "dark" : "light";

        document.body.classList.remove("light");
        document.body.classList.remove("dark");
        document.body.classList.add(newTheme);
        await setTheme(newTheme);
    };

    useEffect(() => {
        document.querySelector("html")?.classList.remove("no-transition-on-load");

        document.addEventListener("click", (e: MouseEvent<HTMLButtonElement> | { target: HTMLDivElement }) => {
            if (!e.target || e.target.closest(`.mobilenav`) || e.target.parentElement.classList.contains("mobilebtn") || e.target.closest(`.mobilebtn`)) return;

            setNav(false);
        });
    }, []);

    const t = useTranslations("*");

    const [nav, setNav] = useState<boolean>(false);

    return (
        <>
            <div className="fixed top-4 left-0 w-full hidden lg:flex items-center justify-center z-40">
                <div className="w-3/4 py-2 px-4 bg-gray-300/70 dark:bg-gray-800/70 rounded-full border-2 border-gray-400/70 dark:border-gray-700/70 backdrop-blur-sm flex flex-row items-center justify-between">
                    <Link href="/" className="router-link-active router-link-exact-active font-semibold">Emrah Aras</Link>
                    <div className="flex flex-row items-center gap-3">
                        <Link href="/" className="router-link-active router-link-exact-active navbtn">{t("navbar.home")}</Link>
                        <Link href="/contact">{t("navbar.contactme")}</Link>
                        <Link href="/projects">{t("navbar.projects")}</Link>
                        <Link href="/blog">{t("navbar.blog")}</Link>
                        <div onClick={changeTheme} className="w-4 h-4 flex items-center justify-center cursor-pointer"><FaMoon className="w-full h-auto" /></div>
                        <LanguageSelector/>
                    </div>
                </div>
            </div>
            <FaBars size={32} className={`z-130 fixed top-2 left-2 block lg:hidden mobilebtn cursor-pointer ${nav ? 'fill-white' : 'fill-black dark:fill-white'}`} onClick={() => setNav((e) => !e)} />
            <div
                className={`fixed top-0 w-1/2 h-full transition-all duration-300 ${nav ? "left-0" : "-left-full"
                    } bg-gray-900/80 backdrop-blur-sm text-white z-120 flex flex-col items-start pt-20 overflow-auto mobilenav`}
            >
                <span className="text-xl font-semibold mb-4 w-full text-center">
                    Emrah Aras
                </span>

                <Link href="/">Home</Link>
                <Link href="/contact">Contact Me</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/blog">Blog</Link>
                <div onClick={changeTheme} className="mt-4 ml-4 w-4 h-4 flex items-center justify-center cursor-pointer"><FaMoon className="w-full h-auto" /></div>
                <div className="ml-4 mt-4">
                    <LanguageSelector mobile/>
                </div>
            </div>
        </>
    )
}
