'use client'

import React from "react";
import { Button } from "./ui/Button";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "./ui/GoogleSignInButton";


const Navbar = () => {
    const { data: session, status} = useSession();
    return (
        <div className="sticky top-0 z-50 h-14 backdrop-filter backdrop-blur-md bg-gray-800 bg-opacity-40 flex flex-row p-2 space-x-2 justify-end">
            { status == "authenticated" ?
                <>
                    <Button path='/add-post' description='Add Blog Post' />
                    <h3>Signed in as: {session?.user?.name}</h3>
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