import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleSignInButton = () => {
    const handleSignIn = () => {
        signIn('google', { callbackUrl: "https://localhost:3000/api/auth/callback/google"});
    };
    return <button className="flex p-2 rounded-md border border-white-100" onClick={handleSignIn}>Sign In with &nbsp;<span><Image alt="Google Icon" width={20} height={20} src="/google.svg" /></span></button>
}

export default GoogleSignInButton 