"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { merriweather } from "./fonts";

export default function Home() {
  const session = useSession();
  const Router = useRouter();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-5xl text-center">
        Don't feel like cooking today? <br />
        Grocery is over? <br />
        or wanna meet new people?
      </div>
      <div className="text-3xl flex flex-col text-center">
        <span>
          Join people nearby over a meal and
        </span>
        <span>
          return with new experiences and Fellas
        </span>
      </div>
      <div className={`${merriweather.className} font-semibold flex flex-col items-center text-center`}>
        <span>Here you can find people in your locality that have extra supper or</span>
        <span>THEY ARE AS LONELY AS YOU 👀</span>
      </div>
      <div>
        {!session.data?.user && <div>
          <button onClick={
            () => {
              Router.push('/signup')
            }
          } >
            Signup
          </button>
        </div>}
        {!session.data?.user && <div>
          <button onClick={
            () => {
              signIn()
            }
          } >
            SignIn
          </button>
        </div>}
        {session.data?.user && <div>
          <button onClick={
            () => {
              Router.push('/invitations/all')
            }
          } >
            Find Invitations
          </button>
        </div>}
        {session.data?.user && <div>
          <button onClick={
            () => {
              Router.push('/invitations/new')
            }
          } >
            CreateInvite
          </button>
        </div>}
        {session.data?.user && <div>
          <button onClick={
            () => {
              signOut();
            }
          } >
            SignOut
          </button>
        </div>}
      </div>
    </div>
  );
}
