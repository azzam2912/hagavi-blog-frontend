import Image from "next/image"
import { signOut } from "next-auth/react"

export const UserBox = ({session, open} : {session: any, open: boolean}) => {
    return (
        <div className={"absolute rounded-md dark:bg-gray-800 bg-white bg-opacity-100 border border-white-100 top-16 right-4 transition-max-height duration-500 " + (open ? 'opacity-100 visible': 'opacity-0 invisible')}>
            <div className="flex p-2">
                <h3>Signed in as: {session?.user?.name}</h3>
            </div>
            <div className="flex p-2 dark:hover:bg-gray-600 hover:bg-gray-100 cursor-pointer" onClick={() => {signOut()}} >
                <Image alt="signout" className="dark:invert" width={20} height={20} src={"/logout_FILL0_wght400_GRAD0_opsz24.svg"} />
                <h3>Sign Out</h3>
            </div>
        </div>
    )
}