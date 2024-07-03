import { Embla } from "@/components/embla";
import SwipeCarousel from "@/components/swipe-carousel";
import { unstable_noStore } from "next/cache";

export default function Home() {
  unstable_noStore();
  return (
    <main>
      <div className="flex items-center mx-auto justify-center mt-10 w-[1200px] h-[600px] ">
        <Embla />
      </div>
    </main>
  );
}
