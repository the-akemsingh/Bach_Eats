"use client"

export default function Footer() {
    return <div className="flex flex-col sm:flex-row p-4 justify-center gap-4 bg-[#0A0A0A] text-white">
        <div>
            Designed using <a target="_blank" href="https://ui.aceternity.com/" className="text-red-300 hover:underline">Aceternity UI</a>
        </div>
        <div>
            Icons by <a target="_blank" href="https://icons8.com" className="text-red-300 hover:underline">Icons8 </a>
            and <a href="https://iconscout.com" className="text-red-300 hover:underline">IconScout</a>
        </div>
    </div>
}