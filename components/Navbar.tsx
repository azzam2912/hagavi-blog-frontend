'use client'

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "./ui/GoogleSignInButton";
import Image from "next/image";
import { UserBox } from "./ui/UserBox";
import Favicon from '/public/favicon.ico';
import { useRouter } from "next/navigation";
import LightDarkModeButton from "./ui/LightDarkModeButton";

const Navbar = () => {
    const { data: session, status} = useSession();
    const [openUserBox, setOpenUserBox] = useState(false);
    const router = useRouter()

    return (
        <nav className="sticky top-0 z-50 w-full dark:bg-black bg-white flex items-center justify-center ">
            <div className="flex-none cursor-pointer px-2" onClick={() => router.push('/')}>
                <Image src={Favicon.src} alt="logo" width={60} height={60}/>
            </div>
            <div className="flex-auto sticky top-0 h-14 flex flex-row p-2 space-x-2 justify-end">
                { status === "authenticated" ?
                    <>
                        { (session?.user?.role == "hagavi") && 
                            <>
                                <div className="hidden sm:block cursor-pointer">
                                    <Button path="/add-post">Add Post!</Button>
                                </div>
                                <div className="sm:hidden cursor-pointer">
                                    <Button path='/add-post'><Image alt="add post" className="dark:invert" width={20} height={20} src="/add_FILL0_wght400_GRAD0_opsz24.svg" /></Button>
                                </div>
                            </>
                        }
                        <div onClick={() => setOpenUserBox(!openUserBox)} className="flex p-2 rounded-md border border-dashed border-white-100 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-200">
                            <Image className="dark:invert" alt="account" width={20} height={20} src="/person_FILL0_wght400_GRAD0_opsz24.svg" />
                        </div>
                        <div>
                            <UserBox open={openUserBox} session={session}/>
                        </div>
                    </>
                    :
                    <>
                        <GoogleSignInButton />
                        <div className="sm:display-block">
                            <Button path='/login'>Login</Button>
                        </div>
                    </>
                }            
            </div>
        </nav>
    )
}

export default Navbar;
