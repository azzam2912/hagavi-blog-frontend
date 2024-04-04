'use client'

import { useRouter } from "next/navigation"

export interface ButtonInterface {
    path?: string,
    type?: "button" | "submit" | "reset" | undefined,
    children?: React.ReactNode,
    className?: string,
    onClick?: any;
}

export function Button(props: ButtonInterface) {
    const router = useRouter();
    const handleClickButton = (path?: string) => {
        if(props.onClick) {
            props.onClick()
            return
        }
        if(!path) return
        router.push(path)
    }
    return (
        <button onClick={() => handleClickButton(props.path)} 
            type={props.type} 
            className={`${props.className} flex p-2 rounded-md border border-white-100 dark:hover:bg-dark-600 hover:bg-gray-200`}>
            {props.children}
        </button>
    )
}