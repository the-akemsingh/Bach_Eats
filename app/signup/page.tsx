"use client"
import { useState } from "react"
import { signup } from "../actions/Signup";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phonenumber, setPhonenumber] = useState<string>('');
    const Router = useRouter();

    const SignupHandler = async () => {
        try {
            const res=await signup({ name, email, password, phonenumber });
            alert(res.message);
            if(res.status===201){
                Router.push("/signin")
            }
            
        } catch (e) {
            return {
                message: "Error signing up"
            }
        }
    }

    return (
        <div className="text-black flex flex-col max-w-80">
            <input type="text" placeholder="Name" onChange={
                (e) => {
                    setName(e.target.value)
                }
            } />
            <input type="text" placeholder="Email" onChange={
                (e) => {
                    setEmail(e.target.value)
                }
            } />
            <input type="text" placeholder="Password" onChange={
                (e) => {
                    setPassword(e.target.value)
                }
            } />
            <input type="text" placeholder="Phonenumber" onChange={
                (e) => {
                    setPhonenumber(e.target.value)
                }
            } />

            <button onClick={SignupHandler}>Signup</button>
        </div>
    )
}

export default Signup