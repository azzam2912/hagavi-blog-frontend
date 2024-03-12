'use client'

import { useRouter } from "next/navigation"

export interface ButtonInterface {
    path: string,
    description: string,
}

export function Button(props: ButtonInterface) {
    const router = useRouter();
    const handleClickButton = (path: string) => {
        if(path === "") return
        router.push(path)
    }
    return (
        <button className="p-2 rounded-md border border-white-100" onClick={() => handleClickButton(props.path)}>
            {props.description}
        </button>
    )
}