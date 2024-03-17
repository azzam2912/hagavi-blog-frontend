import { User, getServerSession } from 'next-auth'

export const session = ({session, token}: any) => {
    session.user = token
    return session
}

export const getUserSession = async () : Promise<User> => {
    const authUserSession = await getServerSession({
        callbacks: {
            session,
        },
    })
    return authUserSession?.user
}