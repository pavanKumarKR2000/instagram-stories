"use client";
import StoriesList from "@/components/StoriesList";
import { stories } from "@/data/stories";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState(1);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (modalIsOpen) {
      id = setInterval(() => {
        if (currentStoryId === stories.length - 1) {
          return;
        }

        setCurrentStoryId(currentStoryId + 1);
      }, 5000);
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
        isOpen={modalIsOpen}
        className="flex items-center justify-between h-[50vh] w-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
        onRequestClose={closeModal}
      >
        <button
          className="absolute left-0  top-1/2  -translate-y-1/2 p-4 bg-white"
          onClick={() => setCurrentStoryId(currentStoryId - 1)}
          disabled={currentStoryId === 1}
        >
          <ChevronLeft className="h-10 w-10" />
        </button>
        <img
          src={stories[currentStoryId - 1].img}
          className=" object-cover"
          alt="story"
        />
        <button
          className="absolute right-0 top-1/2  -translate-y-1/2 p-4 bg-white"
          onClick={() => setCurrentStoryId(currentStoryId + 1)}
          disabled={currentStoryId === stories.length}
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      </Modal>
    </main>
  );
}
