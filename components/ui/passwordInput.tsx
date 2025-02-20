import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = ({ onChange, type, value, placeholder, className }: {
    onChange: (e: any) => void
    type: string,
    value: string,
    placeholder: string,
    className?: string,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <label className="text-gray-600 text-sm mb-1 block">Password</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e)=>{onChange(e.target.value)}}
                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder={placeholder}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                {type==="password" &&  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button> }
                
            </div>
        </div>
    );
};

export default PasswordInput;
