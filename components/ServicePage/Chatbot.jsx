"use client";

import { useState } from "react";
import Image from "next/image";
import anxiety from "../public/anxiety.png";
import stress from "../public/stress.png";
import grief from "../public/grief.png";
import sleep from "../public/sleep.png";
import family from "../public/family.png";
import friend from "../public/friend.png";
import lonely from "../public/lonely.png";
import trauma from "../public/trauma.png";
import depression from "../public/depression.png";
import chatbot from "../public/chatbot.png"
import ShineBorder from "../magicui/shine-border";
import Link from "next/link";
const cardData = [
  {
    image: anxiety,
    backgroundColor: "#E8E5F3",
    title: "Anxiety",
    description: "Feeling anxious, can't switch off or your thoughts are racing?",
    buttonLabel: "Chat",
    height: "180px",
    width: "180px",
    top: "16px",
    left: "85px",
  },
  {
    image: sleep,
    backgroundColor: "#F6EED9",
    title: "Sleep Issues",
    description: "Having trouble sleeping or feeling restless?",
    buttonLabel: "Chat",
    height: "110px",
    width: "170px",
    top: "56px",
    left: "90px",
  },
  {
    image: stress,
    backgroundColor: "#E5ECF3",
    title: "Relationship",
    description: "Feeling overwhelmed or struggling to cope?",
    buttonLabel: "Chat",
    height: "130px",
    width: "160px",
    top: "45px",
    left: "96px",
  },
  {
    image: grief,
    backgroundColor: "#FBE9E6",
    title: "Grief",
    description: "Struggling with the loss of a loved one?",
    buttonLabel: "Chat",
    height: "160px",
    width: "280px",
    top: "13px",
    left: "40px",
  },
  {
    image: family,
    backgroundColor: "#FBEBAD",
    title: "Family Issues",
    description: "Experiencing conflicts or difficulties with family members?",
    buttonLabel: "Chat",
    height: "130px",
    width: "180px",
    top: "35px",
    left: "90px",
  },
  {
    image: depression,
    backgroundColor: "#EBF3C6",
    title: "Depression", // Updated title
    description: "Feeling persistently sad, hopeless, or uninterested in activities?", 
    buttonLabel: "Chat",
    height: "170px",
    width: "190px",
    top: "20px",
    left: "100px",
  },
  {
    image: trauma,
    backgroundColor: "#FFDDC1", // Updated color for Trauma
    title: "Trauma",
    description: "Dealing with the impact of past traumatic experiences?",
    buttonLabel: "Chat",
    height: "150px",
    width: "160px",
    top: "25px",
    left: "110px",
  },
  {
    image: lonely,
    backgroundColor: "#D0F2F1", // Updated color for Loneliness
    title: "Loneliness",
    description: "Feeling isolated or struggling with feelings of loneliness?",
    buttonLabel: "Chat",
    height: "150px",
    width: "250px",
    top: "30px",
    left: "65px",
  },
];


function Card({ image, backgroundColor, title, description, buttonLabel, height, width, top, left }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
    href={`/categories/${title.toLowerCase()}`}
      className="h-[270px] w-[270px] m-2 rounded-2xl relative hover:scale-95 transition duration-300" 
      style={{ backgroundColor }} // Always applying the background color
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <ShineBorder
          className="absolute top-6 left-6 border-1 py-[3px] px-4 bg-gray-100 text-[#021526] rounded-full font-thin md:shadow-sm"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <span className="">{buttonLabel}</span>
        </ShineBorder>
      ) : (
        <div className="absolute top-6 left-6 border-1 py-[3px] px-4 bg-gray-50 text-[#021526] rounded-full font-thin">
          <button>{buttonLabel}</button>
        </div>
      )}

      <Image
        src={image}
        alt={title}
        className="absolute"
        style={{ height, width, top, left }}
      />
      <div className="absolute text-2xl top-44 left-6 font-bold text-[#021526]">
        {title}
      </div>
      <div className="absolute left-6 top-[212px] text-[12px] w-2/3">
        {description}
      </div>
    </Link>
  );
}

function Chatbot() {
  return (
    <div className="flex justify-center mt-12">
      <div className="w-[60%] px-6 rounded-lg pl-10">
  <div className="ml-10 bg-slate-100 p-6 rounded-lg">
    <h1 className="text-4xl font-bold text-center mt-4 text-blue-800">Talk with AI Chatbot</h1>

    <p className="mt-6 text-lg text-gray-700 text-center leading-relaxed">
      Our AI chatbot provides a <span className="font-semibold">safe and private space</span> for you to share your feelings without fear of judgment.<br /> <span className="text-xs leading-tight">If you're uncomfortable talking to family, friends, or a partner, you can always turn to the chatbot for <span className="font-semibold">support and guidance.</span></span>
    </p>

    <div className="flex text-md gap-3">
    <p className="mt-4 text-gray-800 ml-6">
      Key Features:
    </p>

    <ul className="mt-4 text-gray-600 list-disc list-inside">
    <li>Personalized Health Advice</li>
    <li>Multi-Language Support</li>
    <li>Instant AI Responses</li>
    <li>Seamless Web Scraping</li>
    <li>Ensured User Privacy</li>

    </ul>
    </div>

    <div className="flex justify-center mt-8">
      <button className="text-blue-800 border border-blue-800 hover:bg-blue-800 hover:text-white text-xl font-semibold py-3 px-8 rounded-full shadow-md">
        Chat with AI
      </button>
    </div>

    <div className="flex justify-center mt-6">
      <Image src={chatbot} alt="Chatbot Illustration" height={225} width={225} className="rounded-md" />
    </div>
  </div>
</div>


      <div className="flex flex-wrap w-full grid grid-cols-4 gap-12 pl-10 justify-center overflow-x-hidden">
        {cardData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            backgroundColor={card.backgroundColor}
            title={card.title}
            description={card.description}
            buttonLabel={card.buttonLabel}
            height={card.height}
            width={card.width}
            top={card.top}
            left={card.left}
          />
        ))}
      </div>
    </div>
  );
}

export default Chatbot;
