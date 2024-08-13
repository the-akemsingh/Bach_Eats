const Input = ({ value, onChange }: {
    value: string,
    onChange: (e: any) => void
}) => {
    return (
        <div className="w-full max-w-xs  bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2"
            >{value}</label>
            <input
                onChange={(e) => onChange(e)}
                className="text-sm custom-input w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter text here"
                type="text"
                id="unique-input"
            />
        </div>
    );
}


import { useState } from "react";

const PasswordInput = ({ value, onChange }: {
    value: string,
    onChange: (e: any) => void
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-xs bg-white rounded-lg font-mono relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {value}
            </label>
            <input
                onChange={(e) => onChange(e)}
                className="text-sm custom-input w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                id="unique-input"
            />
            {value === "Password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-12 transform -translate-y-1/2 text-sm text-black underline focus:outline-none"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
        </div>
    );
}

export { Input, PasswordInput };
