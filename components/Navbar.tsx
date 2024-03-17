'use client'

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "./ui/GoogleSignInButton";
import Image from "next/image";
import { UserBox } from "./ui/UserBox";
import Favicon from '/public/favicon.ico';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session, status} = useSession();
    const [openUserBox, setOpenUserBox] = useState(false);
    const router = useRouter()

    return (
        <div className="flex items-center justify-center">
            <div className="flex-none cursor-pointer" onClick={() => router.push('/')}>
                <Image src={Favicon.src} alt="logo" width={60} height={60}/>
            </div>
            <div className="flex-auto sticky top-0 z-50 h-14 backdrop-filter backdrop-blur-md bg-gray-800 bg-opacity-40 flex flex-row p-2 space-x-2 justify-end">
                { status === "authenticated" ?
                    <>
                        { (session?.user?.role == "hagavi") && 
                            <>
                                <div className="hidden sm:block">
                                    <Button path="/add-post">Add Post!</Button>
                                </div>
                                <div className="sm:hidden">
                                    <Button path='/add-post'><Image alt="add post" width={20} height={20} src="/add_box_white_24dp.svg" /></Button>
                                </div>
                            </>
                        }
                        <div onClick={() => setOpenUserBox(!openUserBox)} className="flex p-2 rounded-md border border-dashed border-white-100 cursor-pointer">
                            <Image alt="account" width={20} height={20} src="/account_box_white_24dp.svg" />
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
        </div>
    )
}

export default Navbar;
