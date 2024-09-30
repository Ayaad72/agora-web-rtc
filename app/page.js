// Home.js
'use client';
import ConnectForm from "@/components/ConnectForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  useEffect(() => {
    // Set a timer to disable animation after 3 seconds
    const animationTimer = setTimeout(() => {
      setIsAnimationEnabled(false);
    }, 3000);
    return () => clearTimeout(animationTimer);
  }, []);

  const handleNavigateToVideoCall = (channelName) => {
    if (channelName) {
      router.push(`/video-call/${channelName}`);
    }
  };

  return (
    <main className="w-full h-screen grid place-content-center">
      {isAnimationEnabled ? (
        <h1 className="text-[6vw]">AGORA</h1>
      ) : (
        <ConnectForm connectToVideo={handleNavigateToVideoCall} />
      )}
    </main>
  );
}