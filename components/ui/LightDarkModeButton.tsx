'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LightDarkModeButton() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const storedTheme = localStorage.getItem('color-theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = storedTheme || systemTheme;
        setTheme(initialTheme);
        document.documentElement.classList.add(initialTheme === 'dark' ? 'dark' : 'light');
    }, []);
    function handleClick() {
        const changeTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(changeTheme);
        localStorage.setItem('color-theme', changeTheme);
    }
    return (
        <button className="flex items-center justify-center h-full w-auto px-1" onClick={handleClick}>
            <Image alt="switch to light/dark mode" className="dark:invert" width={30} height={30} src="/light_mode_FILL0_wght400_GRAD0_opsz24.svg" />
        </button>
    )
}