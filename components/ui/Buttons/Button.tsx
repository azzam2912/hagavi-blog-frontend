'use client'

import { useRouter } from "next/navigation"
import { ButtonInterface } from "@/types/button";

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
            className={`${props.className}`}>
            {props.children}
        </button>
    )
}

export function ButtonPrimary(props: ButtonInterface) {
    return <Button {...props} className={`${props.className} flex p-2 rounded-md border border-gray-400 dark:border-white-600 dark:hover:bg-gray-600 hover:bg-gray-200`}>{props.children}</Button>
}

export function ButtonSecondary(props: ButtonInterface) {
    return <Button {...props} className={`${props.className} hover:cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-200 focus:bg-slate-400`}>{props.children}</Button>
}