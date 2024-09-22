import { useState, useEffect } from "react";
import { LayoutGrid } from "./LayoutGrid";
import { SupabaseService } from "../services/supabase.service";

export function LayoutGridDemo() {
  const [images, setImages] = useState<string[]>([]);
  const [cards, setCards] = useState<{
    id: number;
    content: JSX.Element;
    className: string;
    thumbnail: string;
}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bucketName: string = 'Wedding Photos';

  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      const imagePaths = await SupabaseService.fetchImagePaths(bucketName);
      const imageUrls = await SupabaseService.generatePublicUrls(bucketName, imagePaths);
      setImages(imageUrls);
      const newCards = imageUrls.map((imageUrl, index) => {
        return {
          id: index,
          content: <SkeletonOne />,
          className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
          thumbnail: imageUrl
        }
      });
      setCards(newCards);
      setIsLoading(false);
    }

    loadImages();
  }, [bucketName]);

  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Postavljeno od Jovane Lepojev
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
       Lepa slika najelpsa slika ikada za sada na svetu
      </p>
    </div>
  );
};
