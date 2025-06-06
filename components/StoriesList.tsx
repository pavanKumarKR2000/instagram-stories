import Image from "next/image";

interface StoriesListProps {
  stories: { id: number; img: string }[];
  openModal: () => void;
  onSetCurrentStoryId: (id: number) => void;
}

export default function StoriesList({
  stories,
  openModal,
  onSetCurrentStoryId,
}: StoriesListProps) {
  return (
    <div className="w-screen overflow-x-auto ">
      <ul className=" flex items-center justify-center gap-4 ">
        {stories.map((story) => (
          <li
            key={story.id}
            className="bg-gradient-to-r
          from-blue-500
          via-purple-500
          to-pink-500 p-1 rounded-full aspect-square h-[200px] w-[200px] cursor-pointer"
            onClick={() => {
              onSetCurrentStoryId(story.id);
              openModal();
            }}
          >
            <Image
              src={story.img}
              alt="story"
              width={200}
              height={200}
              // objectFit="cover"
              className="aspect-square h-full w-full object-cover rounded-full border-2 border-white"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
