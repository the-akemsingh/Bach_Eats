"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, PasswordInput } from "@/components/Input";
import { signup } from "../actions/Signup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { jersey_10 } from "../fonts";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [gender, setGender] = useState("");
    const Router = useRouter();

    return (
        <div className="grid grid-cols-2 h-screen">
            <div
                style={{
                    backgroundImage: "url('/images/red flower centre.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
                className="col-span-1"
            >
                <Link href={'/'} className={`absolute  left-32 ml-2 top-4 text-6xl text-white ${jersey_10.className}`} style={{ zIndex: 10 }}>
                    BE
                </Link>
            </div>

            <div className="flex justify-center items-center bg-gray-100 col-span-1">
                <div className="pt-4 pb-4 pl-8 pr-8  ">
                    <div className="flex flex-col gap-2 min-w-80 ">
                        <div className="text-5xl font-bold">Signup</div>

                    </div>
                    <div className="flex flex-col items-center gap-3 mt-8">
                        <Input value="Name" placeholder="Bachelors" onChange={(e) => setName(e.target.value)} />
                        <Input value="Email" placeholder="Bachelors@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                        <Input value="PhoneNumber" placeholder="9876543210" onChange={(e) => setPhonenumber(e.target.value)} />
                        <select
                            className="w-full rounded-lg font-mono p-2 text-gray-700 hover:border-yellow-700 bg-gray-100 border shadow-sm"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="" disabled>
                                Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <PasswordInput
                            value="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></PasswordInput>

                        <button
                            className="w-full mt-2 bg-white p-2 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
                            onClick={async () => {
                                const user = await signup({
                                    name,
                                    email,
                                    password,
                                    phonenumber,
                                    gender,
                                });
                                if (user.status != 201) {
                                    alert(user.message);
                                } else {
                                    Router.push("/signin");
                                }
                            }}
                        >
                            Signup
                        </button>

                        <button
                            className="w-full flex items-center justify-center gap-2 p-2 bg-red-950 text-white rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
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
                                <path
                                    fill="#00ac47"
                                    d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
                                ></path>
                                <path
                                    fill="#4285f4"
                                    d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
                                ></path>
                                <path
                                    fill="#ffba00"
                                    d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
                                ></path>
                                <path
                                    fill="#ea4435"
                                    d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
                                ></path>
                                <path
                                    fill="#4285f4"
                                    d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
                                ></path>
                            </svg>
                            <span>Sign up with Google</span>
                        </button>
                        <hr className="border-black w-full mt-2 mb-2" />
                        <span>
                            Already have an account?{" "}
                            <button
                                className=" text-blue-500"
                                onClick={() => Router.push("/signin")}
                            >
                                Signin
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
