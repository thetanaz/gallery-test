"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";

import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FullImage from "./full-image";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

type PropType = {
  options?: EmblaOptionsType;
};

export const Embla: React.FC<PropType> = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 1500 }),
  ]);

  const imgs = [
    "/imgs/1.jpg",
    "/imgs/2.jpg",
    "/imgs/3.jpg",
    "/imgs/4.jpg",
    "/imgs/5.jpg",
  ];

  const [isMaximized, setIsMaximized] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const [currentCoordinates, setCurrentCoordinates] = useState({ x: 0, y: 0 });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const autoplay: AutoplayOptionsType | undefined =
      emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop: () => void = isMaximized ? autoplay.stop : autoplay.play;

    playOrStop();
  }, [emblaApi, isMaximized]);

  useEffect(() => {
    function updateDimensions() {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }

    // Initial dimensions measurement
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();

        setCurrentCoordinates({
          x: rect.left,
          y: rect.top,
        });
        // You can use these values to update state or perform actions
      }
    };

    updatePosition();

    // Add an event listener for resize events (optional)
    window.addEventListener("resize", updatePosition);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <AnimatePresence>
          {isMaximized ? (
            <FullImage
              key="fullImg"
              imgSrc={imgs[currentImageIndex || 0]}
              onClick={() => {
                setIsMaximized(false);
              }}
              x={currentCoordinates.x}
              y={currentCoordinates.y}
              width={dimensions.width}
              height={dimensions.height}
            />
          ) : null}

          <div
            ref={(ref) => {
              emblaRef(ref);
            }}
            className="flex cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden w-[300px] h-[600px] md:w-[600px] md:h-[350px]"
          >
            <div className="flex" ref={divRef}>
              {imgs.map((img, idx) => {
                return (
                  <div key={idx} style={{ flex: "0 0 100%" }}>
                    <Image
                      priority={true}
                      width={900}
                      height={650}
                      alt="image"
                      src={img}
                      onClick={() => {
                        setIsMaximized(true);
                        setCurrentImageIndex(idx);
                      }}
                      className=" z-20 bg-center object-cover w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};
