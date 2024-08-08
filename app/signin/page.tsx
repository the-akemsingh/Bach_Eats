"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Router = useRouter();
    return (
        <div className="flex flex-col max-w-72 ">
            <div className="text-5xl">Signin</div>
            
            <input type="text" placeholder="email" onChange={
                (e) => setEmail(e.target.value)
            } />

            <input type="text" placeholder="password" onChange={
                (e) => setPassword(e.target.value)
            } />
            
            <button onClick={
                async () => {
                    await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                    });
                    Router.push("/")
                }
            }>Signin</button>
        </div >
    );
};
export default Signin;