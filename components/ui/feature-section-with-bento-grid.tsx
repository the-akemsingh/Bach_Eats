import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full ">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              {/* <Badge className="text-lg text-yellow-500" >Discover meaningful connections. ✨</Badge> */}
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl text-wrap tracking-tighter max-w-xl font-regular text-left"
                style={{ letterSpacing: "0.01rem" }}>
                How We Bring People Together
              </h2>
              <p className="text-lg max-w-xl lg:max-w-3xl leading-relaxed tracking-tight text-muted-foreground text-gray-600 text-left">
                Whether you're new in town or just craving good food with good company, BachEats makes it easy to find and join dining experiences nearby. Meet new people, share stories, and make memories — one meal at a time.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6  flex justify-between flex-col">
              <span className="w-8 h-8 mb-5 stroke-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="invitation-card">
                  <path fill="#c12058" d="M10.66 3.559h42.062v56.907H10.66z"></path>
                  <path fill="#fed3fd" d="M47.773 11.972v40.082a3.464 3.464 0 0 0-3.464 3.464H19.072a3.464 3.464 0 0 0-3.464-3.464V11.972a3.464 3.464 0 0 0 3.464-3.464h25.237a3.464 3.464 0 0 0 3.464 3.464z"></path>
                  <path fill="#ec6385" d="M37.308 15.673c.653.653.98 1.509.98 2.365s-.327 1.712-.98 2.365l-4.502 4.263a1.579 1.579 0 0 1-2.232 0l-4.502-4.263a3.346 3.346 0 0 1 4.73-4.731l.887.887.887-.887a3.348 3.348 0 0 1 4.732.001z"></path>
                  <path fill="#b5b6d9" d="M26.742 32.631h-6.186a.619.619 0 1 1 0-1.238h6.186a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#ac0e43" d="M42.825 32.631H31.691a.619.619 0 1 1 0-1.238h11.134a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#b5b6d9" d="M26.742 37.58h-6.186a.619.619 0 1 1 0-1.238h6.186a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#ac0e43" d="M42.825 37.58H31.691a.619.619 0 1 1 0-1.238h11.134a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#b5b6d9" d="M26.742 42.528h-6.186a.619.619 0 1 1 0-1.238h6.186a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#ac0e43" d="M42.825 42.528H31.691a.619.619 0 1 1 0-1.238h11.134a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#b5b6d9" d="M26.742 47.477h-6.186a.619.619 0 1 1 0-1.238h6.186a.619.619 0 1 1 0 1.238z"></path>
                  <path fill="#ac0e43" d="M42.825 47.477H31.691a.619.619 0 1 1 0-1.238h11.134a.619.619 0 1 1 0 1.238z"></path>
                </svg>
              </span>
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Create an Invite</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Craft a unique dining experience by posting an invite. Share your culinary vision, preferred cuisine, and ideal setting.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md  p-6 flex justify-between flex-col">
              <span className="w-8 h-8  mb-5 stroke-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="enjoy">
                  <path fill="#fa507f" d="M61,20a14.992,14.992,0,0,0-29-5.35A14.992,14.992,0,0,0,3,20C3,37,23.716,59,32,59S61,37,61,20Z"></path>
                  <path fill="#603913" d="M25,26a1,1,0,0,1-1-1,3,3,0,0,0-6,0,1,1,0,0,1-2,0,5,5,0,0,1,10,0A1,1,0,0,1,25,26Z"></path>
                  <path fill="#a21d1f" d="M32,40c-3.364,0-6-1.757-6-4a1,1,0,0,1,2,0c0,.944,1.711,2,4,2s4-1.056,4-2a1,1,0,0,1,2,0C38,38.243,35.364,40,32,40Z"></path>
                  <path fill="#a21d1f" d="M24 42a1 1 0 01-.6-1.8c.025-.018 2.6-1.98 2.6-4.2 0-2.2-2.572-4.179-2.6-4.2a1 1 0 011.2-1.6c.139.1 3.4 2.575 3.4 5.8s-3.263 5.7-3.4 5.8A.993.993 0 0124 42zM40 42a.993.993 0 01-.6-.2c-.139-.1-3.4-2.575-3.4-5.8s3.263-5.7 3.4-5.8a1 1 0 011.2 1.6h0c-.027.019-2.6 1.981-2.6 4.2 0 2.2 2.572 4.179 2.6 4.2A1 1 0 0140 42z"></path>
                  <path fill="#603913" d="M47,26a1,1,0,0,1-1-1,3,3,0,0,0-6,0,1,1,0,0,1-2,0,5,5,0,0,1,10,0A1,1,0,0,1,47,26Z"></path>
                </svg>
              </span>
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Discover Experiences</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Explore a world of culinary adventures. Browse through invites and find the perfect dining experience that speaks to you.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-md  p-6 flex justify-between flex-col">
              <span className="w-8 h-8 mb-5 stroke-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="smiley">
                  <path fill="#ffcc4d" d="M64 32c0 17.67-14.33 32-32 32-8.05 0-15.4-2.97-21.02-7.88C4.25 50.26 0 41.63 0 32 0 14.33 14.32 0 32 0c9.63 0 18.26 4.25 24.12 10.98A31.83 31.83 0 0 1 64 32z"></path>
                  <circle cx="50.82" cy="31.31" r="5.62" fill="#2e435a"></circle>
                  <path fill="#2e435a" d="M18.8 31.31c0 3.11-2.52 5.62-5.62 5.62-3.11 0-5.62-2.52-5.62-5.62s2.52-5.62 5.62-5.62 5.62 2.51 5.62 5.62zM32.24 52.52H32c-5.81.09-10.54-3.68-12.03-9.67a2.162 2.162 0 1 1 4.2-1.04c1.2 4.81 4.79 6.46 7.78 6.38h.1c2.97.06 6.59-1.58 7.78-6.38a2.162 2.162 0 1 1 4.2 1.04c-1.47 5.9-6.08 9.67-11.79 9.67z"></path>
                </svg>
              </span>
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Connect with Guests</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  As a host, review and approve guest requests. As a guest, send requests to join meals that pique your interest.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6  flex justify-between flex-col">
              <span className="w-8 h-8 mb-5 stroke-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="equalizer">
                  <path d="M13.18 64c-1.28 0-2.32-1.04-2.32-2.32V23.82c0-1.28 1.04-2.32 2.32-2.32s2.32 1.04 2.32 2.32v37.87A2.32 2.32 0 0 1 13.18 64zm0-50.22c-1.28 0-2.32-1.04-2.32-2.32V2.32C10.86 1.04 11.9 0 13.18 0s2.32 1.04 2.32 2.32v9.14c0 1.28-1.04 2.32-2.32 2.32z"></path>
                  <path d="M13.18 26.13c-4.68 0-8.5-3.81-8.5-8.5s3.81-8.5 8.5-8.5c4.69 0 8.5 3.81 8.5 8.5s-3.81 8.5-8.5 8.5zm0-12.35c-2.13 0-3.86 1.73-3.86 3.86s1.73 3.86 3.86 3.86 3.86-1.73 3.86-3.86-1.73-3.86-3.86-3.86zM32 64c-1.28 0-2.32-1.04-2.32-2.32V49.96c0-1.28 1.04-2.32 2.32-2.32s2.32 1.04 2.32 2.32v11.72c0 1.28-1.04 2.32-2.32 2.32zm0-24.07c-1.28 0-2.32-1.04-2.32-2.32V2.32C29.68 1.04 30.72 0 32 0s2.32 1.04 2.32 2.32v35.29c0 1.28-1.04 2.32-2.32 2.32z"></path>
                  <path d="M32 52.28c-4.68 0-8.5-3.81-8.5-8.5s3.81-8.5 8.5-8.5 8.5 3.81 8.5 8.5-3.82 8.5-8.5 8.5zm0-12.36c-2.13 0-3.86 1.73-3.86 3.86s1.73 3.86 3.86 3.86 3.86-1.73 3.86-3.86-1.73-3.86-3.86-3.86zM50.82 64c-1.28 0-2.32-1.04-2.32-2.32V25.51c0-1.28 1.04-2.32 2.32-2.32s2.32 1.04 2.32 2.32v36.17A2.328 2.328 0 0 1 50.82 64zm0-48.54c-1.28 0-2.32-1.04-2.32-2.32V2.32C48.5 1.04 49.53 0 50.82 0s2.32 1.04 2.32 2.32v10.82a2.328 2.328 0 0 1-2.32 2.32z"></path>
                  <path d="M50.82 27.82c-4.68 0-8.5-3.81-8.5-8.5s3.81-8.5 8.5-8.5c4.69 0 8.5 3.81 8.5 8.5s-3.82 8.5-8.5 8.5zm0-12.35c-2.13 0-3.86 1.73-3.86 3.86s1.73 3.86 3.86 3.86 3.86-1.73 3.86-3.86-1.73-3.86-3.86-3.86z"></path>
                </svg>
              </span>
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Manage Your Journey</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Keep track of your culinary social network. View your profile, manage your invites, and relive your shared dining memories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
