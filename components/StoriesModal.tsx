"use client";
import { STORY_DURATION } from "@/app/constants";
import React, { useEffect } from "react";
import Modal from "react-modal";
import ProgressBar from "./Progressbar";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface StoriesModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  currentStoryId: number;
  setCurrentStoryId: (storyId: number) => void;
  stories: { id: number; img: string }[];
}

function StoriesModal({
  closeModal,
  currentStoryId,
  modalIsOpen,
  openModal,
  setCurrentStoryId,
  stories,
}: StoriesModalProps) {
  useEffect(() => {
    let id: NodeJS.Timeout;

    if (modalIsOpen) {
      id = setInterval(() => {
        if (currentStoryId === stories.length) {
          closeModal();
          clearInterval(id);
          return;
        }

        setCurrentStoryId(currentStoryId + 1);
      }, STORY_DURATION);
    }

    return () => {
      console.log("return");
      clearInterval(id);
    };
  }, [modalIsOpen, currentStoryId]);

  const onNext = () => {
    if (currentStoryId !== stories.length) {
      setCurrentStoryId(currentStoryId + 1);
    } else {
      closeModal();
    }
  };
  const onPrev = () => {
    if (currentStoryId !== 1) {
      setCurrentStoryId(currentStoryId - 1);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      id="story_modal"
      isOpen={modalIsOpen}
      className="inset-0 absolute flex flex-col items-center  border-none outline-none backdrop-blur-lg"
      onRequestClose={closeModal}
    >
      <ProgressBar currentStoryId={currentStoryId} />

      <div className="relative flex items-center w-full flex-1 ">
        <div
          className="absolute left-0 top-0 bottom-0 h-full w-[50vw]  z-[100]"
          onClick={onPrev}
        />
        <Image
          src={stories[currentStoryId - 1].img}
          height={400}
          width={400}
          className="object-cover w-full"
          alt="story"
          priority
        />
        <div
          className="absolute right-0 top-0 bottom-0 h-full w-[50vw] z-[100]"
          onClick={onNext}
        />
      </div>
      <button className="rounded-full bg-gray-300 p-3  flex items-center justify-center mb-4">
        <X className="size-5" onClick={() => closeModal()} />
      </button>
    </Modal>
  );
}

export default StoriesModal;
