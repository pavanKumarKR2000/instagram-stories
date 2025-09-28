import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { STORY_DURATION } from "@/app/constants";

interface ProgressBarProps {
  currentStoryId: number;
}

const ProgressBar = ({ currentStoryId }: ProgressBarProps) => {
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(progressFillRef.current, {
      width: "100%",
      duration: STORY_DURATION / 1000,
      ease: "none",
    });

    return () => {
      tl.kill();
      gsap.set(progressFillRef.current, {
        width: "0%",
      });
    };
  }, [currentStoryId]);

  return (
    <div className="w-full my-2 mx-auto flex items-center gap-2">
      <div className="w-full h-1 bg-[#e0e0e0] rounded-md overflow-hidden">
        <div ref={progressFillRef} className="h-full w-0 bg-black rounded-md" />
      </div>
    </div>
  );
};

export default ProgressBar;
