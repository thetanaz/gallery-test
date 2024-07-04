import Embla from "@/components/embla";
import SwipeCarousel from "@/components/swipe-carousel";

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center">
      <div className="flex w-[350px] h-[600px] sm:w-[1300px] sm:h-[1000px] items-center mx-auto">
        <Embla />
      </div>
    </main>
  );
}
