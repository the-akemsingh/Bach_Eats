import { calistoga, pacifico } from "@/app/fonts";

const Activities = () => {
    return (
        <div className="grid grid-cols-3 min-h-72 p-4 border rounded-3xl m-6"  >
            <div>
                <div className={`text-4xl rounded-lg min-h-60 pt-24 pl-4 m-2 ${calistoga.className}`}  style={{filter: "drop-shadow(0px 0px 10px black)"}} >
                    Things you can do ..
                </div>
            </div>
            <div className={`col-span-2 grid grid-cols-5 text-2xl font-bold gap-4 p-4 ${pacifico.className}`} >
                <div className="bg-slate-400 rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
                    Show your cooking skills
                </div>
                <div className="bg-neutral-500 rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
                    Sing a song for someone?
                </div>
                <div className="bg-yellow-600 rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
                    or Do you want to listen to someone?
                </div>
                <div className="bg-indigo-500 rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
                    Have a music instrument?
                </div>
                <div className="bg-red-600 rounded-lg p-4 m-2 hover:scale-105 transition-transform transform">
                    Feeling Lonely?
                </div>
            </div>
        </div>
    );
}
export default Activities;