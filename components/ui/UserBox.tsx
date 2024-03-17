import Image from "next/image"
import { signOut } from "next-auth/react"

export const UserBox = ({session, open} : {session: any, open: boolean}) => {
    return (
        <div className={"absolute rounded-md bg-gray-800 bg-opacity-80 border border-white-100 top-16 right-4 transition-max-height duration-500 " + (open ? 'opacity-100 visible': 'opacity-0 invisible')}>
            <div className="flex p-2">
                <h3>Signed in as: {session?.user?.name}</h3>
            </div>
            <div className="flex p-2 cursor-pointer hover:bg-gray-800" onClick={() => {signOut()}} >
                <Image alt="signout" width={20} height={20} src="/logout_white_24dp.svg" />
                <h3>Sign Out</h3>
            </div>
        </div>
    )
}