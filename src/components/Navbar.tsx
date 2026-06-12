"use server";
import { cookies } from "next/headers";
import NavbarInner from "./NavbarInner";

export const getTheme = async () => {
    const store = await cookies();
    const theme = store.get("theme")?.value || "light";

    return theme;
};

export const setTheme = async (value: string) => {
    const store = await cookies();
    const theme = store.set("theme", value);

    return true;
};

export default async function Navbar() {
    let currentTheme = await getTheme();

    return (
        <>
            <NavbarInner currentTheme={currentTheme} />
        </>
    )
}
