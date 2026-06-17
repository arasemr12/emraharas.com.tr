"use client";
import { useTranslations } from 'next-intl';
import { SubmitEventHandler, useEffect, useRef, useState } from 'react';
import { sendContactForm } from '../actions/server';
import { Button } from '@headlessui/react';
import { toast } from 'sonner';
import { FaCheck } from 'react-icons/fa';

export default function ContactInner() {
    const t = useTranslations('*');

    const [email, setEmail] = useState<string>("");
    const [text, setText] = useState<string>("");

    const [token, setToken] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const turnstileRef = useRef(null);

    useEffect(() => {
        const isDev = process.env.NODE_ENV === "development";

        const check = () => {
            if (!window.turnstile || !turnstileRef.current) {
                setTimeout(check, 100);
                return;
            };

            window.turnstile.render(turnstileRef.current, {
                sitekey: isDev ? "1x00000000000000000000AA" : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
                callback: (t) => setToken(t),
            });
        };
        check();
    }, []);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!email || !text || !token || loading) return;

        setLoading(true);

        try {
            let data = await sendContactForm(email, text, token);
            if (!data?.success) throw Error(data?.message);

            setLoading(false);

            toast("Form sent!", {
                style: {
                    color: "",
                    background: "oklch(27.8% 0.033 256.848)",
                    borderColor: "oklch(37.3% 0.034 259.733)",
                },
                position: "top-right",
                duration: 1500,
                icon: <FaCheck />
            });
        } catch (error) {
            setLoading(false);

            let msg = "Unknown error!";

            if (error instanceof Error) {
                msg = error.message;
            };

            toast(msg, {
                style: {
                    color: "",
                    background: "oklch(27.8% 0.033 256.848)",
                    borderColor: "oklch(37.3% 0.034 259.733)",
                },
                position: "top-right",
                duration: 1500,
                icon: <FaCheck />
            });
        }
    };

    return (
        <>
            <div className="h-full w-full flex flex-col items-center overflow-auto">
                {/* Background glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 blur-[30vh] z-10 opacity-50"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right top,#4f46e5,#7c3aed,#9333ea,#c026d3,#db2777,#e11d48)",
                    }}
                />

                <div className="lg:w-2/3 w-full h-auto flex flex-col z-20 pt-32 gap-3">
                    {/* Contact info card */}
                    <div className="w-full bg-gray-300/70 dark:bg-gray-800/70 border-2 py-2 px-4 border-gray-400/70 dark:border-gray-700/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                        <div className="flex flex-col items-start">
                            <span className="text-xl font-semibold mb-2">{t("contact.contactme")}</span>
                            <span>E-Mail: arasemr1234@protonmail.com</span>
                        </div>
                    </div>

                    {/* Contact form card */}
                    <div className="w-full bg-gray-300/70 dark:bg-gray-800/70 border-2 py-2 px-4 border-gray-400/70 dark:border-gray-700/70 backdrop-blur-sm rounded flex flex-row items-center justify-between">
                        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-3">
                            <span className="text-xl font-semibold">{t("contact.contactform")}</span>

                            <div className="flex flex-col items-start gap-1">
                                <label htmlFor="email">E-Mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="E-Mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <label htmlFor="text">{t("contact.text")}</label>
                                <textarea
                                    id="text"
                                    placeholder={t("contact.text")}
                                    className="resize transition-colors"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <div>
                                <div id="turnstile-container" ref={turnstileRef} />
                            </div>

                            <Button
                                type="submit"
                                disabled={!!loading || !(!!email) || !(!!text) || !(!!token)}
                                className={`indigobtn flex flex-row items-center duration-300 transition-all ${loading ? 'gap-3' : 'gap-0'}`}
                            >
                                <span className={`block border-2 border-t-white border-gray-400 rounded-full animate-spin transition-all duration-300 ${loading ? 'size-4' : 'size-0 opacity-0'}`}></span>
                                {t("contact.submit")}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
