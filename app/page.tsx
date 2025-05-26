"use client";
import StoriesList from "@/components/StoriesList";
import { stories } from "@/data/stories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { STORY_DURATION } from "./constants";
import ProgressBar from "@/components/Progressbar";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState(1);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (modalIsOpen) {
      id = setInterval(() => {
        if (currentStoryId === stories.length) {
          setModalIsOpen(false);
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
    <main className="h-screen flex items-center justify-center">
      <StoriesList
        stories={stories}
        openModal={openModal}
        onSetCurrentStoryId={onSetCurrentStoryId}
      />
      <Modal
        ariaHideApp={false}
        id="story_modal"
        isOpen={modalIsOpen}
        className=" h-[50vh] md:h-[600px] w-[400px] md:w-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-none outline-none"
        onRequestClose={closeModal}
      >
        <ProgressBar currentStoryId={currentStoryId} />
        <div className="relative flex items-center w-full">
          {currentStoryId !== 1 && (
            <button
              className="absolute left-0  top-1/2  -translate-y-1/2 p-4 bg-white"
              onClick={() => setCurrentStoryId(currentStoryId - 1)}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}
          <img
            src={stories[currentStoryId - 1].img}
            className="md:h-[600px] md:w-[600px] object-cover"
            alt="story"
          />
          {currentStoryId !== stories.length && (
            <button
              className="absolute right-0 top-1/2  -translate-y-1/2 p-4 bg-white"
              onClick={() => setCurrentStoryId(currentStoryId + 1)}
              disabled={currentStoryId === stories.length}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          )}
        </div>
      </Modal>
    </main>
  );
}
