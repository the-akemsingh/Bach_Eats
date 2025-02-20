import { DMSerifFont, MarkaziFont } from "@/app/fonts"
import ValidInvites from "@/components/page/valid-invites"

export default function AllInvites() {
  return (
    <div className={`min-h-screen pt-24 flex flex-col items-center bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0]`}>
      <div className="container mx-auto px-4">
        <ValidInvites />
      </div>
    </div>
  )
}
