"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import {Input, PasswordInput} from "@/components/Input";
import BirdPotAnimation from "@/components/Bird-pot-animation";
import { signup } from "../actions/Signup";
import { signIn } from "next-auth/react";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const Router = useRouter();

    return (
        <div style={{
            backgroundImage: "url('/images/ManCracker.svg')",
            backgroundSize: "30%",
            backgroundPosition: "left bottom",
            paddingLeft: "",
            paddingRight: "",
            backgroundPositionX: "-10%",
            paddingBottom: "",
            backgroundRepeat: "no-repeat",
        }} className="grid grid-cols-2 gap-4">
            <div  className="flex flex-col justify-center items-center  pt-3 text-black ">
                <div className="pt-4 pb-4 pl-8 pr-8 border rounded-lg shadow-lg">

                    <div className="text-center w-72">
                        <div className="text-5xl font-bold">Signup</div>
                        <span> Already have an account? <button className=" text-xl  underline " onClick={() => Router.push('/signin')} >Signin</button>  </span>
                        {/* <div className="text-lg mt-2">WELCOME BACK!</div> */}
                    </div>
                    <div className="flex flex-col w-72 items-center gap-3 mt-8">
                        <Input value="Name" onChange={(e) => setName(e.target.value)} />
                        <Input value="Email" onChange={(e) => setEmail(e.target.value)} />
                        <Input value="PhoneNumber" onChange={(e) => setPhonenumber(e.target.value)} />
                        <PasswordInput value="Password" onChange={(e) => setPassword(e.target.value)}></PasswordInput>


                        <button
                            className="w-full bg-slate-400 p-2 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
                            onClick={async () => {
                                const user = await signup({name,email,password,phonenumber});
                                if(user.status != 201){
                                    alert(user.message);
                                }
                                else{
                                    Router.push("/");
                                }                                
                            }}
                        >
                            Signup
                        </button>

                        <button
                            className="w-full flex items-center justify-center gap-2 p-2 bg-black text-white rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
                            onClick={() => signIn("google")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 32 32"
                                id="google"
                                className="h-6 w-6"
                            >
                                <path fill="#00ac47" d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"></path>
                                <path fill="#4285f4" d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"></path>
                                <path fill="#ffba00" d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"></path>
                                <path fill="#ea4435" d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"></path>
                                <path fill="#4285f4" d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"></path>
                            </svg>
                            <span>Sign up with Google</span>
                        </button>

                    </div>
                </div>
            </div>
            <div className="flex items-center   justify-center">
                <BirdPotAnimation />
            </div>
        </div>
    );
};

export default Signin;
