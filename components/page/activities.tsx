"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function ActivitiesCard() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full px-6 sm:px-10 py-5">
            <h2 className=" container cal-sans mx-auto text-3xl md:text-5xl font-bold  font-sans" style={{ letterSpacing: "0.01rem" }} >
                Things you can do here.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const Pitch1 = () => {
    return (
        <>
            <div
                key={"dummy-content"}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        Not in the mood to cook? No worries!
                    </span>{" "}
                    Find people nearby who are also looking to share a homemade meal. Whether you join someone for dinner or invite others to your place, it&#39;s a simple way to skip the hassle of cooking alone and enjoy a cozy, shared experience. Connect with like-minded individuals, taste different homemade dishes, and make new friends along the way. Just pick an invite, show up, and enjoy a good meal with great company— no pots and pans required!
                </p>
            </div>
        </>
    );
};
const Pitch2 = () => {
    return (
        <>
            <div
                key={"dummy-content"}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        Have some extra supper? Don&#39;t let it go to waste!
                    </span>{" "}
                    Extend an invitation and turn it into an opportunity to meet new people! Whether it&#39;s leftovers or a dish you made too much of, inviting others to share a meal is a simple way to connect. You&#39;ll not only clear some space in the fridge but also build new friendships in the process. It&#39;s about more than just food; it&#39;s a way to bring people together, share stories, and enjoy a relaxed, homey atmosphere. So, why eat alone when you can create lasting connections over supper?
                </p>
            </div>
        </>
    );
};
const Pitch3 = () => {
    return (
        <>
            <div
                key={"dummy-content"}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        Got a special recipe you&#39;re proud of?
                    </span>{" "}
                    Why not share it with others and make it a memorable experience? Invite people over to taste your culinary creation and enjoy the satisfaction of bringing your dish to life for an appreciative crowd. Whether it&#39;s a family secret or something you&#39;ve perfected over time, sharing food is a great way to connect with others. You&#39;ll not only get to showcase your cooking skills but also bond over the joy of a good meal. Who knows? You might even inspire someone to try something new in their own kitchen!
                </p>
            </div>
        </>
    );
};
const Pitch4 = () => {
    return (
        <>
            <div
                key={"dummy-content"}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        Feeling stuck or want to boost your productivity?
                    </span>{" "}
                    Find a coding partner and take your development game to the next level! Working alongside someone else can help you stay motivated, exchange ideas, and solve problems faster. Whether you&#39;re tackling bugs, brainstorming solutions, or just need accountability, teaming up with a fellow coder creates a productive and fun environment. It&#39;s also a great way to share knowledge, learn new techniques, and improve your skills. Don&#39;t code alone—find a partner and elevate your workflow through collaboration!
                </p>
            </div>
        </>
    );
};
const Pitch5 = () => {
    return (
        <>
            <div
                key={"dummy-content"}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        Looking to give back after a great experience?
                    </span>{" "}
                    You&#39;ve just made new friends, so why not keep the connection going? Invite them over next time and return the favor. Sharing a meal is more than just food—it&#39;s about creating lasting bonds and showing appreciation for the company. Whether it&#39;s hosting them for dinner or joining in on another activity, inviting them back builds stronger connections. It&#39;s an easy way to turn a simple meal into a meaningful friendship, making both your day and theirs a little brighter.
                </p>
            </div>
        </>
    );
};

const data = [
    {
        category: "Don't feel like cooking today ?",
        title: "Find people nearby & join them for a meal.",
        src: "https://images.unsplash.com/photo-1518737003272-dac7c4760d5e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <Pitch1 />,
    },

    {
        category: "Have Extra Supper",
        title: "Extend an Invitation and Build New Connections.",
        src: "https://images.unsplash.com/photo-1705917893196-58c23a99e370?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMyfHxkaW5pbmd8ZW58MHx8MHx8fDA%3D",
        content: <Pitch2 />,
    },
    {
        category: "Got some special recipe?",
        title: "Share Your Culinary Creation with Others.",
        src: "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29va2luZ3xlbnwwfHwwfHx8Mg%3D%3D",
        content: <Pitch3 />,
    },
    {
        category: "Boost the productivity",
        title: "Find a coding-partner.",
        src: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <Pitch4 />,
    },

    {
        category: "Looking to Give Back?",
        title: "You just made new friends. Invite them next time.",
        src: "https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZHNoYWtlfGVufDB8fDB8fHwy",
        content: <Pitch5 />,
    },
];
