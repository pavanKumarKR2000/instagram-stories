"use client";
import Image from "next/image";
import StoriesModal from "./StoriesModal";
import { useState } from "react";

interface StoriesListProps {
  stories: { id: number; img: string }[];
}

export default function StoriesList({ stories }: StoriesListProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState(1);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSetCurrentStoryId = (id: number) => {
    setCurrentStoryId(id);
  };
  return (
    <div className="w-full ">
      <ul className=" flex items-center p-4  gap-4 w-screen overflow-x-auto">
        {stories.map((story) => (
          <li
            key={story.id}
            className="bg-gradient-to-r
          from-blue-500
          via-purple-500
          to-pink-500 p-1 rounded-full aspect-square size-[80px] cursor-pointer"
            onClick={() => {
              onSetCurrentStoryId(story.id);
              openModal();
            }}
          >
            <Image
              src={story.img}
              alt="story"
              width={80}
              height={80}
              // objectFit="cover"
              priority
              className="aspect-square h-full w-full object-cover rounded-full border-2 border-white"
            />
          </li>
        ))}
      </ul>
      <StoriesModal
        closeModal={closeModal}
        openModal={openModal}
        currentStoryId={currentStoryId}
        modalIsOpen={modalIsOpen}
        setCurrentStoryId={setCurrentStoryId}
        stories={stories}
      />
    </div>
  );
}

export function StoriesListSkeleton() {
  return (
    <div className="flex items-center p-4 gap-4 w-screen overflow-x-auto">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="size-[80px] shrink-0 bg-gray-300 rounded-full animate-pulse"
          ></div>
        ))}
    </div>
  );
}
