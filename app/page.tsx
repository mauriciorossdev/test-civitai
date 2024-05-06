'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ButtonIcon from "@/components/buttonIcon/buttonIcon";

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [nextCursor, setNextCursor] = useState('undefined');
  const [count, setcount] = useState(0)

  const fetchImages = async () => {
    setcount(count + 1)
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
  }, []);

  const renderColumns = (images: ImageData[]) => {
    const columns = [];
    for (let i = 0; i < 4; i++) {
      const startIndex = i * 25;
      const endIndex = Math.min((i + 1) * 25, images.length);
      const columnImages = images.slice(startIndex, endIndex);
      columns.push(
        <div key={i} className="flex flex-col h-[467px] w-[320px] max-w-[450px] gap-4">
          {columnImages.map(image => (
            <div key={image.id} className="relative  rounded-lg  hover:cursor-pointer">
              <div className="absolute flex right-2 top-2">
                <div className="flex flex-col items-stretch ml-auto gap-[10px] justify-start">
                  <ButtonIcon
                    buttonClassName="relative flex justify-center"
                    imageClassName="max-w-[22px] max-h-[22px] mx-auto my-0"
                    icon="/dots.svg"
                    width={28}
                    height={28}
                    alt="dots menu image"
                    id={image.id.toString()}
                    
                  />
                  <ButtonIcon
                    buttonClassName="relative rounded-full bg-white w-[30px] h-[30px]"
                    imageClassName="max-w-[22px] max-h-[22px] mx-auto my-0"
                    icon="/pincel.svg"
                    width={28}
                    height={28}
                    alt="pincel image"
                  />
                </div>
              </div>
              <Image
                src={image.url}
                alt={image.meta?.prompt || 'image prompt'}
                width={image.width}
                height={image.height}
                className="h-[467px] w-[320px] max-w-[450px] rounded-lg border-vulcan-500 border-2"
                objectFit="cover"

              />
              <div className="absolute w-full p-1 bottom-0 left-0 flex justify-between items-center">
                <div className="bg-[#25262b99] shadow-[0_2px_6px_1px_rgba(0,0,0,0.16)] p-1">
                  <ul className="flex items-center mx-auto my-auto gap-1 ">
                    <li>
                      <ButtonIcon
                        buttonClassName="relative flex justify-center text-xs "
                        width={28}
                        height={28}
                        alt="like image"
                      >👍 1000</ButtonIcon>
                    
                    </li>
                    <li>
                    <ButtonIcon
                        buttonClassName="relative flex justify-center text-xs "
                        width={28}
                        height={28}
                        alt="like image"
                      >❤️ 1000</ButtonIcon>
                    
                    </li>
                    <li>
                    <ButtonIcon
                        buttonClassName="relative flex justify-center text-xs "
                        width={28}
                        height={28}
                        alt="like image"
                      >😂 1000</ButtonIcon>
                    </li>
                    <li>
                    <ButtonIcon
                        buttonClassName="relative flex justify-center text-xs "
                        width={28}
                        height={28}
                        alt="like image"
                      >😢 1000</ButtonIcon>
                    </li>
                    <li className="flex">
                      <ButtonIcon
                        buttonClassName="relative flex justify-center text-xs bg-[#f08c0033] py-[3px] px-[3px]"
                        imageClassName="max-w-[16px] max-h-[16px] mx-auto my-0"
                        icon="/bolt.svg"
                        width={28}
                        height={28}
                        alt="comment image"
                      > <p className="text-[#f59f00] ">
                        40</p> </ButtonIcon> </li>
                     
                  </ul>
                </div>
                <div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return columns;
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-4 justify-center mx-0 my-auto">
        {renderColumns(images)}

      </div>
    </main>
  );
}
