import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col items-center text-amber-950 gap-4 h-[41vh] px-5 md:px-0 text-xs md:text-base">
      <div className="font-bold flex gap-0.5 md:gap-2 justify-center items-center text-3xl md:text-5xl">Treat The Artist <span><img src="/cap.gif" width={72} alt="" /></span></div>
      <p className="text-center md:text-left">
        Join BrewMe and show your love for the creators who brings joy and beauty into your life - treat them a token of appreciation.
      </p>
      <div>
        <Link href={"/about"}>
        <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10">
    </div>

    <div className="text-amber-950 container m-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Treats from fans</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-pink-200 rounded-full p-3 text-black" width={88}  src="/comp.png" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are willing to contribute financially</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-pink-200 rounded-full p-2 text-black" width={88}  src="/star.gif" alt="" />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-pink-200 rounded-full p-3 text-black" width={88}  src="/com.gif" alt="" />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">Your fans are ready to collaborate with you</p>
          </div>
        </div>
     </div>
    </>
  );
}
