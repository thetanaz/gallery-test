"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import FullImage from "./full-image";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useElementBounds from "@/hooks/useElementBounds";

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
  const { height, width } = useWindowDimensions();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const bounds = useElementBounds(carouselRef);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Set the carouselRef
      carouselRef.current = node;
      // Call the emblaRef function
      emblaRef(node);
    },
    [emblaRef]
  );

  useEffect(() => {
    const autoplay: AutoplayOptionsType | undefined =
      emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop: () => void = isMaximized ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi, isMaximized]);

  return (
    <>
      <div className="flex w-full h-full">
        <AnimatePresence>
          {isMaximized && bounds ? (
            <FullImage
              top={bounds.top}
              left={bounds.left}
              bottom={bounds.bottom}
              right={bounds.right}
              width={width}
              height={height}
              key="fullImg"
              imgSrc={imgs[currentImageIndex || 0]}
              onClick={() => {
                setIsMaximized(false);
              }}
            />
          ) : null}
        </AnimatePresence>
        <div
          ref={setRefs}
          className="flex cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden"
        >
          <div className="flex">
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
                    className="z-20 bg-center object-cover w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
