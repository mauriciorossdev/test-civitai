'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ButtonIcon from "@/components/buttonIcon/buttonIcon";
import Popover from "@/components/popover/popover";
import CardImage from "@/components/cardImage/cardImage";
import SkeletonCardImage from "@/components/skeleton/skeletonCardImage";

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [nextCursor, setNextCursor] = useState('undefined');


  //get images from civitai api
  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/images', {
        params: {
          cursor: nextCursor
        }
      }
      )
      const newImages = response.data.res.items;
      setImages(prevImages => [...prevImages, ...newImages]);
      await setNextCursor(response.data.res.metadata.nextCursor);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  useEffect(() => {
    fetchImages();
  }, [nextCursor]);

  const renderColumns = (images: ImageData[]) => {
    const columns = [];
    for (let i = 0; i < 4; i++) {
      const startIndex = i * 25;
      const endIndex = Math.min((i + 1) * 25, images.length);
      const columnImages = images.slice(startIndex, endIndex);
      columns.push(
        <div key={i} className="flex flex-col h-[467px] w-[320px] max-w-[450px] gap-4">
          {columnImages.map(image => (
           
            <CardImage image={image} key={image.id} />
          ))}
        </div>
      );
    }
    return columns;
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {nextCursor } */}
      <div className="flex gap-4 justify-center mx-0 my-auto">
        {/* <SkeletonCardImage></SkeletonCardImage> */}
        {renderColumns(images)}

      </div>
    </main>
  );
}
