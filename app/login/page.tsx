'use client'

import { Button } from "../../components/ui/Buttons/Button";
import { useState } from "react";
export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const handleSubmit = () => {

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center w-3/4 m-8 p-8">
                Enter your username and password
                <form className="flex-row justify-center items-center w-4/5 py-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="username" className="sr-only">username</label>
                        <input value={username} onChange={e => setUserName(e.target.value)} type="text" name="username" id="username" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md text-black p-1" placeholder="username" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="password" className="sr-only">password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md text-black p-1" placeholder="password" />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button path ="" >Login</Button>
                    </div>
                </form>
                <Button path="/">Back to Home</Button>
            </div>
        </main>
    )
}