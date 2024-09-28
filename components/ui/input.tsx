import { useState } from "react";


const Input = ({ value, placeholder, onChange, type }: {
    value: string,
    placeholder: string,
    type: string,
    onChange: (e: any) => void
}) => {
    return (
        <div className="w-full max-w-xs bg-gray-100 rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {value}
            </label>
            <input
                onChange={(e) => onChange(e)}
                className="text-sm custom-input w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:outline-blue-300 hover:shadow-lg hover:border-yellow-700 bg-gray-100  "
                placeholder={placeholder}
                type={type}
                min={type === "number" ? "0" : undefined}
            />
        </div>
    );
};

const PasswordInput = ({ value, onChange }: {
    value: string,
    onChange: (e: any) => void
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-xs bg-gray-100 rounded-lg font-mono relative">
            <label className="block  text-gray-700 text-sm font-bold mb-2">
                {value}
            </label>
            <input
                onChange={(e) => onChange(e)}
                className="text-sm custom-input w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform  focus:outline-blue-300 hover:shadow-lg hover:border-yellow-700 bg-gray-100"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                id="unique-input"
            />
            {value === "Password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-12 transform -translate-y-1/2 text-sm text-black transition-transform duration-300 ease-in-out hover:text-blue-300 hover:scale-110 focus:outline-none"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
        </div>

    );
}


function Demoinput({ value, placeholder, onChange }: {
    value: string,
    placeholder: string,
    onChange: (e: any) => void
}
) {
    return <div className="w-full max-w-xs">
        <div className="flex items-center justify-center">
            <div className="relative">
                <input name={placeholder}
                    type="text"
                    className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                />
                <label className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                >{value}</label
                >
            </div>
        </div>
    </div>
}



export { Input, PasswordInput };



