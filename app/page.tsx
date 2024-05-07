'use client';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CardImage from "@/components/cardImage/cardImage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer';
import { ImageData } from "@/types/images-civitai";


export default function Home() {
  //state to store images
  const [Images, setImages] = useState<ImageData[]>([])
  //useInView hook to detect when the last image is in view
  const { ref, inView } = useInView();
  //get images from civitai api
  async function fetchImages(pageParam: any) {
    try {
      const response = await axios.get('/api/images', {
        params: {
          cursor: pageParam,
        }
      })
      const newImages = response.data.res.items;
      return response.data.res;
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }

  }

  const {
    data: imagesCivitai,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<
    any,
    Error
  >({
    queryKey: ['images'],
    queryFn: ({ pageParam }) => fetchImages(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.metadata.nextPage,
    initialPageParam: 'undefined',

  });

  /**
   * 
   * @param id 
   * Remove image from the list of images
   */
  const removeImage = (id: number) => {
    const newImages = Images.filter((image: ImageData) => image.id !== id);
    setImages(newImages);
  }

  /**
   * 
   * @param id 
   * Save image to the local machine in png
   */
  const handleSaveImage = async (id: number) => {
    try {
      const selectImage = Images.find((image: ImageData) => image.id === id);
      if (!selectImage) {
        throw new Error('Image not found');
      }
      const response = await axios.get(selectImage.url, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'civitai_' + selectImage.postId + '.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  /**
   * 
   * @param id 
   * Open image in a new tab from original post
   */
  const handleViewImage = (id: number) => {
    const selectImage = Images.find((image: ImageData) => image.id === id);
    if (!selectImage) {
      throw new Error('Image not found');
    }
    window.open(`https://civitai.com/posts/${selectImage.postId}`, '_blank');
  }

  /**
   * @description when imagesCivitai is updated, set the images to the state
   */
  useEffect(() => {
    if (imagesCivitai) {
      setImages(imagesCivitai.pages.flatMap(page => page.items));
    }
  }, [imagesCivitai])

  /**
   * @description when inView is true and hasNextPage is true, fetch the next page, in this case when the last image is in view
   */
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18 pt-24"  >
      {isFetching ? <div>Loading...</div> : null}
      {error ? <div>Error: {error.message}</div> : null}
      <div className="flex justify-center mx-0 my-auto">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 ">
          {
            Images.map((image: ImageData, index: number) => {
              if (index === Images.length - 1) {
                return (
                  <CardImage
                    id={index.toString()}
                    image={image}
                    key={index}
                    handleRemoveImage={removeImage}
                    handleSaveImage={handleSaveImage}
                    handleViewImage={handleViewImage}
                    innerRef={ref} />
                )
              }
              else {
                return (<CardImage
                  id={index.toString()}
                  image={image}
                  key={index}
                  handleRemoveImage={removeImage}
                  handleSaveImage={handleSaveImage}
                  handleViewImage={handleViewImage}
                />)
              }
            })
          }
        </div>

      </div>
      {isFetchingNextPage && <div className="h-16 w-full bg-slate-900 mt-4 text-center">Loading...</div>}
    </main>
  );
}
