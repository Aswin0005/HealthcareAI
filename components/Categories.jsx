import Image from "next/image";
import anxiety from "../public/anxiety.png";
import stress from "../public/stress.png";
import grief from "../public/grief.png";
import sleep from "../public/sleep.png";
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
      left: "85px" 
    },
    {
      image: sleep,
      backgroundColor: "#E5ECF3",
      title: "Sleep Issues",
      description: "Having trouble sleeping or feeling restless?",
      buttonLabel: "Chat",
      height: "110px",
      width: "170px",
      top: "56px",
      left: "90px"
    },
    {
      image: stress,
      backgroundColor: "#F6EED9",
      title: "Stress",
      description: "Feeling overwhelmed or struggling to cope?",
      buttonLabel: "Chat",
      height: "130px",
      width: "160px",
      top: "45px",
      left: "96px"
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
      left: "53px"
    }
  ];
  
  function Card({ image, backgroundColor, title, description, buttonLabel, height, width, top, left }) {
    return (
      <Link
      href={`/categories/${title.toLowerCase()}`}
        className="h-[270px] w-[270px] m-2 rounded-2xl relative"
        style={{ backgroundColor }}
      >
        <div className="absolute top-6 left-6 border-1 py-[3px] px-4 bg-gray-100 text-[#021526] rounded-full font-thin">
          <button>{buttonLabel}</button>
        </div>
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
  
  function Categories() {
    return (
      <>
        <div className="flex justify-center mt-16 ">
          <div className="flex flex-wrap w-[800px] gap-4 justify-center">
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
      </>
    );
  }
  
export default Categories;