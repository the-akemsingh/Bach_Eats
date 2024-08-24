"use client"

import {  useEffect, useState } from "react";
import { VerifyMail } from "@/app/actions/VerifyMail";

const VerifyMail_Page = async () => {

    const [token, setToken] = useState("");

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    })
    
   
   

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>

            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            <button className="text-white bg-black p-2  " onClick={async() => {
                const res=await VerifyMail({ VerificationToken: token });
                alert(res.message);
            }}>get verify</button>


        </div>
    )
}
export default VerifyMail_Page;