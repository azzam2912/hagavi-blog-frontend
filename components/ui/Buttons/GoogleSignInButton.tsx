import { signIn } from "next-auth/react";
import Image from "next/image";
import { ButtonPrimary } from "./Button";

const GoogleSignInButton = () => {
    const handleSignIn = () => {
        signIn('google');
    };
    return (
    <ButtonPrimary onClick={handleSignIn}>
        Sign In with &nbsp;
        <span>
            <Image alt="Google Icon" width={20} height={20} src="/google.svg" />
        </span>
    </ButtonPrimary>
    )
}

export default GoogleSignInButton 