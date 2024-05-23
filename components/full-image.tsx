import { Minimize } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
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
  return (
    <>
      <Head>
        <Link rel="preload" as="image" href="/imgs/1.jpg"></Link>
        <Link rel="preload" as="image" href="/imgs/2.jpg"></Link>
        <Link rel="preload" as="image" href="/imgs/3.jpg"></Link>
        <Link rel="preload" as="image" href="/imgs/4.jpg"></Link>
        <Link rel="preload" as="image" href="/imgs/5.jpg"></Link>
      </Head>
      <motion.div
        initial={{
          scale: 0,
          y: `calc(-47.5vh + ${height / 2}px + ${y}px)`,
          x: `calc(-47.5vw + ${width / 2}px + ${x}px)`,
        }} // Initial scale is 0 (hidden)
        animate={{ scale: 1, x: 0, y: 0, transition: { duration: 0.34 } }} // Animate to scale 1 (full size)
        exit={{
          scale: 0,
          y: `calc(-47.5vh + ${height / 2}px + ${y}px)`,
          x: `calc(-47.5vw + ${width / 2}px + ${x}px)`,

          transition: { duration: 0.5 },
        }}
        className="fixed bg-white/5 shadow-lg ring-1 ring-black/5 backdrop-filter backdrop-blur-md z-50 w-[100vw] h-[100vh] flex items-center justify-center"
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

          <Image
            priority={true}
            src={imgSrc}
            alt="image"
            fill
            sizes="(max-width:200px) 5vw,(max-width:300px) 100vw,(max-width:500px) 100vw,(max-width:1200px)100vw,100vw"
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
