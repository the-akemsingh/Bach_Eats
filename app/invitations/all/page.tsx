import { DMSerifFont, MarkaziFont } from "@/app/fonts"
import ValidInvites from "@/components/page/valid-invites"

export default function AllInvites() {
  return (
    <div className={`min-h-screen pt-24 flex flex-col items-center bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0]`}>
      <div className="container mx-auto px-4">
        <h1 className={`${DMSerifFont.className} text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center`}>
          All 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
            {" "}Invites
          </span>
        </h1>
        <ValidInvites />
      </div>
    </div>
  )
}
