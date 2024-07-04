"use client";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  Minimize,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function FullImage({
  imgSrc,
  onClick,
  top,
  left,
  bottom,
  right,
  width,
  height,
  showPrevImage,
  showNextImage,
}: {
  imgSrc: string;
  onClick: () => void;
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
  showPrevImage: () => void;
  showNextImage: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate the center of the Embla component
  const emblaCenter = {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2,
  };

  // Set up swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: showNextImage,
    onSwipedRight: showPrevImage,
    //@ts-ignore
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
        x: emblaCenter.x - width / 2,
        y: emblaCenter.y - height / 2,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5 },
      }}
      exit={{
        scale: 0,
        opacity: 0,
        x: emblaCenter.x - width / 2,
        y: emblaCenter.y - height / 2,
        transition: { duration: 0.5 },
      }}
      className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-25"
    >
      <div
        className="relative w-[97vw] h-[97vh]"
        onClick={onClick}
        {...swipeHandlers}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="z-20 absolute top-5 right-5 w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300"
        >
          <Minimize
            size={30}
            className="text-black w-[24px] bg-transparent hover:w-[30px]"
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            showNextImage();
          }}
          className="z-20 absolute top-[50%] right-5 w-10 h-10 bg-white/70 hover:bg-white rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300"
        >
          <ArrowRightCircleIcon
            size={30}
            className="text-black w-[24px] bg-transparent hover:w-[30px] z-30"
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            showPrevImage();
          }}
          className="z-20 absolute top-[50%] left-5 w-10 h-10 bg-white/70 hover:bg-white rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300"
        >
          <ArrowLeftCircleIcon
            size={30}
            className="text-black w-[24px] bg-transparent hover:w-[30px]"
          />
        </button>
        <div className="relative w-full h-full">
          <Image
            src={imgSrc}
            alt="Fullscreen image"
            layout="fill"
            objectFit="contain"
            onLoad={() => setIsLoaded(true)}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
