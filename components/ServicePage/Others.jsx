import Image from 'next/image';
import journal from "../public/journal.png";
import meditation from "../public/meditation8.png";
import selfassessment2 from "../public/selfassessment2.png";
import games3 from "../public/games3.png";
import wakeup2 from "../public/wakeup2.png";

function Others() {
  return (
    <div className="container mx-auto p-20 mt-8">
      {/* First Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="relative col-span-1 h-64 rounded-lg shadow-lg flex items-center justify-center  text-white text-xl font-bold relative  hover:scale-95 transition delay-100">
          <Image
            src={journal}
            alt="Journal"
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
          />
          <div className='text-[34px] absolute left-6 bottom-7  text-gray-800 z-10'>Journal</div>
        </div>
        <div className="relative col-span-1 bg-[#094FFE] h-64 rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold relative  hover:scale-95 transition delay-100">
          <Image
            src={meditation}
            alt="Meditation"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className='text-[30px] absolute left-6 bottom-7  text-gray-800 z-10'>Meditation & Exercises</div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="col-span-2 bg-blue-300 h-64 rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold relative hover:scale-95 transition delay-100">
          <Image
            src={selfassessment2}
            alt="Self-Assessment"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className='text-[30px] absolute left-6 bottom-7  text-white z-10'>Self-Assessment</div>
          
        </div>
        <div className="col-span-1 bg-[#df5c5c] h-64 rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold relative  hover:scale-95 transition delay-100">
          <Image
            src={games3}
            alt="Games"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className='text-[30px] absolute left-6 bottom-7  text-gray-800 z-10'>Games</div>

        </div>
        <div className="col-span-1 bg-purple-500 h-64 rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold relative  hover:scale-95 transition delay-100">
          <Image
            src={wakeup2}
            alt="Wake Up"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 30%"
            className="rounded-lg"
          />
           <div className='text-[30px] absolute left-6 bottom-7  text-gray-800 z-10'>Today</div>

        </div>
      </div>
    </div>
  );
}

export default Others;
