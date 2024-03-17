import { getUserSession } from '../../lib/session'

export default async function Test() {
  const user = await getUserSession()
  console.log(user)
  return <>
    <h1>HEIIIIIIIII You are entering some secret page yo!</h1>
    <a className="flex items-center justify-center text-blue-500" href='/'>Click this to back to home yo!</a>
    {/* <main className="">{JSON.stringify(user)}</main> */}

  </>
}