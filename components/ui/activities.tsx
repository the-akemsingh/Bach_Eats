"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800  font-sans">
               Things you can do here.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            <div
                key={"dummy-content"}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        The first rule of Apple club is that you boast about Apple club.
                    </span>{" "}
                    Keep a journal, quickly jot down a grocery list, and take amazing
                    class notes. Want to convert those notes to text? No problem.
                    Langotiya jeetu ka mara hua yaar is ready to capture every
                    thought.
                </p>
                <Image
                    src="https://assets.aceternity.com/macbook.png"
                    alt="Macbook mockup from Aceternity UI"
                    height="500"
                    width="500"
                    className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                />
            </div>
        </>
    );
};

const data = [
    {
        category: "Don't feel like cooking today ?",
        title: "Find people nearby & join them for a meal.",
        src: "https://images.unsplash.com/photo-1518737003272-dac7c4760d5e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },
    
    {
        category: "Have Extra Supper",
        title: "Extend an Invitation and Build New Connections.",
        src: "https://images.unsplash.com/photo-1705917893196-58c23a99e370?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMyfHxkaW5pbmd8ZW58MHx8MHx8fDA%3D",
        content: <DummyContent />,
    },
    {
        category: "Got some special recipe?",
        title: "Share Your Culinary Creation with Others.",
        src: "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29va2luZ3xlbnwwfHwwfHx8Mg%3D%3D",
        content: <DummyContent />,
    },
    {
        category: "Boost the productivity",
        title: "Find a coding-partner.",
        src: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent />,
    },

    {
        category: "Looking to Give Back?",
        title: "You just made new friends. Invite them next time.",
        src: "https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZHNoYWtlfGVufDB8fDB8fHwy",
        content: <DummyContent />,
    },
];
