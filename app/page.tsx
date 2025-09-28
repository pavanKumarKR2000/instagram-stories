import StoriesList, { StoriesListSkeleton } from "@/components/StoriesList";
import { stories } from "@/data/stories";
import { Suspense } from "react";

async function fetchStories(): Promise<{ id: number; img: string }[]> {
  return new Promise((res, _) => {
    setTimeout(() => {
      res(stories);
    }, 3000);
  });
}

async function StoriesListWrapper() {
  const storiesList = await fetchStories();
  return <StoriesList stories={storiesList} />;
}

export default async function Home() {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<StoriesListSkeleton />}>
        <StoriesListWrapper />
      </Suspense>
    </main>
  );
}
