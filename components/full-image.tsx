import { Minimize } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function FullImage({
  imgSrc,
  onClick,
  x,
  y,
  height,
  width,
}: {
  imgSrc: string;
  onClick: () => void;
  x: number;
  y: number;
  height: number;
  width: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
          y: `calc(-50vh + ${height / 2}px + ${y}px)`,
          x: `calc(-50vw + ${width / 2}px + ${x}px)`,
        }} // Initial scale is 0 (hidden)
        animate={{
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.5 },
        }} // Animate to scale 1 (full size)
        exit={{
          scale: 0,
          y: `calc(-50vh + ${height / 2}px + ${y}px)`,
          x: `calc(-50vw + ${width / 2}px + ${x}px)`,

          transition: { duration: 0.5 },
        }}
        className={cn(
          "fixed flex z-50 w-[100vw] h-[100vh] items-center justify-center"
        )}
      >
        <div className="relative w-[95vw] h-[95vh]">
          <button
            onClick={onClick}
            className="z-20 absolute top-5 hover:top-3.5 transition-transform ease-in-out hover:right-12 right-10 w-[32px] h-[32px]"
          >
            <Minimize
              size={48}
              className="text-white w-[32px] h-[32px] hover:w-[48px] hover:h-[48px] bg-transparent"
            />
          </button>

          {!isLoaded && <div className="bg-transparent" />}
          <Image
            onLoad={() => setIsLoaded(true)}
            priority={true}
            src={imgSrc}
            alt="image"
            fill
            sizes="(max-width:1000px) 100vw, (max-width:1200px) 1300px, 1400px"
            objectFit="cover"
            className="flex items-center margin-auto h-full w-full rounded-xl  md:w-[1920px] md:h-[1080px] pointer-events-none"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
