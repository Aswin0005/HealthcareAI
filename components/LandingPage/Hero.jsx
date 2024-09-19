"use client";

import Image from "next/image";
import { useState } from "react";
import playbutton from "../../public/playbutton.png";
import star from "../../public/star.png";
import bandage from "../../public/band-aid.png";
import heart from "../../public/love.png";
import smile from "../../public/smiley.png";
import bolt from "../../public/bolt.png";
import exclamation from "../../public/mark.png";

import greenbrain from "../../public/head.png";
import cyanbrain from "../../public/brain1-cyan.png";
import purplebrain from "../../public/brain2-purple.png";
import pinkbrain from "../../public/brain3-pink.png";
import yellowbrain from "../../public/brain4-yellow.png";
import orangebrain from "../../public/brain5-orange.png";

import bekindtomind from "../../public/bekindtomind.png";

function App() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const iconContent = {
    smileyface: {
      title: "Burnout",
      content: "Spot burnout: physical, emotional, mental. Prioritize self-care and boundaries.",
      position: { top: "70px", left: "400px" },
      color: "#f2fedf",
    },
    heart: {
      title: "Grief",
      content: "Grief is an emotional response to loss, needing time and support to heal.",
      position: { top: "160px", left: "325px" },
      color: "#fbfacc",
    },
    bolt: {
      title: "Energy Drain",
      content: "Long-term stress depletes energy. Replenish with sleep, hydration, and calm.",
      position: { top: "50px", left: "770px" },
      color: "#e5ecfa",
    },
    exclamation: {
      title: "Stress",
      content: "When overwhelmed, break tasks into small steps for relief. Seek support if needed.",
      position: { top: "240px", left: "870px" },
      color: "#fde6d9",
    },
    bandage: {
      title: "Recovery",
      content: "Recovery means rebuilding strength and resilience after setbacks.",
      position: { top: "330px", left: "910px" },
      color: "#eadcfd",
    },
  };

  const brainImages = {
    heart: yellowbrain,
    smileyface: greenbrain,
    bolt: cyanbrain,
    exclamation: orangebrain,
    bandage: purplebrain,
  };

  return (
    <>
      <div className="bg-slate-200 h-screen">
        <div className="h-20 w-full flex justify-between border border-gray-400">
          <div className="text-[25px] pl-5 pt-5 font-semibold">Mentalality</div>
          <div className="flex mr-20 gap-10 ">
            <div className="grid place-content-center">About Us</div>
            <div className="grid place-content-center">FAQs</div>
            <div className="grid place-content-center">Find Help</div>
            <div className="grid place-content-center border border-black my-auto p-[6px] px-4 rounded-md bg-black text-gray-200">Login</div>
            <div className="grid place-content-center border border-black my-auto p-[6px] px-4 rounded-md bg-black text-gray-200">Sign Up</div>
          </div>
        </div>

        <div className="relative">
          <div className="text-[43px] absolute top-[40px] left-[370px] text-gray-500  ">
            <span className="text-gray-900 font-semibold">Your trusted mental health companion</span>,
            <br />
            guiding you through every challenge.
          </div>
          <Image
            src={hoveredIcon ? brainImages[hoveredIcon] : pinkbrain}
            alt="brain"
            width={430}
            height={420}
            className="absolute left-[520px] top-[216px]"
          />
          {hoveredIcon && (
            <div
              className={`absolute w-[260px] bg-white border-b-[7px] border-gray-900 rounded-xl p-4 shadow-lg transform transition-transform duration-500 ease-out font-semibold `}
              style={{
                top: iconContent[hoveredIcon].position.top,
                left: iconContent[hoveredIcon].position.left,
                backgroundColor: iconContent[hoveredIcon].color,
                transform: "translateY(0)",
                opacity: 1,
              }}
            >
              <div className="flex">
                <span className="text-[32px] font-semibold mb-2 whitespace-nowrap">{iconContent[hoveredIcon].title}</span>
              </div>
              <div className="text-gray-900">{iconContent[hoveredIcon].content}</div>
            </div>
          )}
        </div>

        <div className="absolute left-[70px] top-[380px]">
          <div className="text-[25px] ">
            You <span className="font-semibold ">don't</span> have <br /> to <span className="font-semibold">struggle</span> in <br /> silence!
          </div>
          <div className="mt-1">Learn more</div>
          <div className="absolute bottom-[-2px]">____________</div>
        </div>

        <div>
          <Image src={playbutton} alt="audio" width={256} height={70} className="absolute top-[590px] left-[60px]" />
        </div>

        <div>
          <Image src={star} alt="hope" width={144} height={144} className="absolute top-[170px] left-[90px]" />
        </div>

        <div>
          <Image src={bekindtomind} alt="bekindtomind" width={256} height={256} className="absolute top-[250px] right-[110px]" />
        </div>

        <div className="h-[60px] w-[270px] p-4 border-4 rounded-full bg-gray-200 border-black absolute right-[250px] bottom-10 flex justify-between items-center">
          <Image
            src={heart}
            alt="heart"
            width={40}
            height={40}
            className="p-1 hover:scale-110 transition duration-200"
            onMouseEnter={() => setHoveredIcon("heart")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
          <Image
            src={smile}
            alt="smileyface"
            width={40}
            height={40}
            className="p-1 hover:scale-110 transition duration-200"
            onMouseEnter={() => setHoveredIcon("smileyface")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
          <Image
            src={bolt}
            alt="bolt"
            width={40}
            height={40}
            className="p-1 hover:scale-110 transition duration-200"
            onMouseEnter={() => setHoveredIcon("bolt")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
          <Image
            src={exclamation}
            alt="exclamation"
            width={40}
            height={40}
            className="p-1 hover:scale-110 transition duration-200"
            onMouseEnter={() => setHoveredIcon("exclamation")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
          <Image
            src={bandage}
            alt="bandage"
            width={40}
            height={40}
            className="p-1 hover:scale-110 transition duration-100"
            onMouseEnter={() => setHoveredIcon("bandage")}
            onMouseLeave={() => setHoveredIcon(null)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
