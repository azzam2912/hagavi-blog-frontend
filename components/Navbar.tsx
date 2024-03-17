'use client'

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "./ui/GoogleSignInButton";
import Image from "next/image";
import { UserBox } from "./ui/UserBox";

const Navbar = () => {
    const { data: session, status} = useSession();
    const [openUserBox, setOpenUserBox] = useState(false);

    return (
        <div className="sticky top-0 z-50 h-14 backdrop-filter backdrop-blur-md bg-gray-800 bg-opacity-40 flex flex-row p-2 space-x-2 justify-end">
            { status === "authenticated" ?
                <>
                    { (session?.user?.role == "hagavi") && <Button path='/add-post' description='Add Blog Post' /> }
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
                    <Button path='/login' description='Login' />
                </>
            }            
        </div>
    )
}

export default Navbar;
