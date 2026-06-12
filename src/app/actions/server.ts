"use server";

import { cookies, headers } from "next/headers";
import { supabaseAdmin } from "../lib/supabase-server";

export const sendContactForm = async (email: string, text: string, turnstile: string) => {
    if(!email || !text || !turnstile) return {success:false,message:"Missing parts!"};
    
    const h = await headers();

    const isDev = process.env.NODE_ENV === "development";

    const ip =
        h.get("x-forwarded-for")?.split(",")[0].trim() ||
        h.get("x-real-ip") ||
        "unknown";

    try {
        let res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: JSON.stringify({
                secret: isDev ? "1x0000000000000000000000000000000AA" : process.env.TURNSTILE_SECRET_KEY,
                response: turnstile,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let json = await res.json();
        if (!json.success) return { success: false, message: "Error validating turnstile!" };

        let data = await supabaseAdmin.from("contact_form").insert({
            email,
            text,
            ip,
        });

        await fetch(process.env.WEBHOOK!, {
            method: "POST",
            body: JSON.stringify({
                content: `New contact form! Check database...`,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        return { success: true, message: "Successful!" };
    } catch (error) {
        let message = "Unknown error!";

        if (error instanceof Error) {
            message = error.message;
        };

        return { success: false, message: message };
    }
};

export const setLocale = async (locale: string) => {
    const store = await cookies();

    store.set("locale", locale);
};
