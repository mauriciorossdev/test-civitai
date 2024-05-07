'use client';
import Image from "next/image";
import ButtonIcon from "../buttonIcon/buttonIcon";
import { useState } from "react";
import Popover from "../popover/popover";
import { StatsType } from "@/types/images-civitai";

interface cardImageProps {
    image: {
        id: number;
        url: string;
        meta: {
            prompt: string;
        };
        width: number;
        height: number;
        stats: StatsType;
    };
    id: string;
    handleRemoveImage?: (id: number) => void;
    handleViewImage?: (id: number) => void;
    handleSaveImage?: (id: number) => void;
    innerRef?: (node?: Element | null | undefined) => void,
    onClick?: (image: any) => void;
}

export const CardImage = (
    { image, id, handleRemoveImage, handleSaveImage, handleViewImage, onClick, innerRef }: cardImageProps
) => {
    const [ExpandRemix, setExpandRemix] = useState(false)

    return (
        <div
            ref={innerRef}
            id={id}
            key={image.id}
            className="relative rounded-lg  hover:cursor-pointer bg-vulcan-500 h-[467px] w-[320px] max-w-[450px] transform transition-transform hover:rotate-1 hover:scale-100" >
            <div className="absolute flex right-2 top-2">
                <div className="flex flex-col items-stretch ml-auto gap-[10px] justify-center">
                    <Popover>
                        <div className="bg-black_russian-500 rounded-[4px] border-2 border-vulcan-500">
                            <ul>
                                {
                                    handleSaveImage && <li className="p-1">
                                        <ButtonIcon
                                            buttonClassName="relative flex justify-start items-center gap-2 hover:bg-vulcan-500 hover:text-white w-full hover:rounded-xs"
                                            imageClassName="max-w-[16px] max-h-[16px] my-0 fill-link_water-500"
                                            icon="/save.svg"
                                            width={28}
                                            height={28}
                                            alt="save menu image"
                                            onClick={() => handleSaveImage(image.id)}

                                        >Save</ButtonIcon>
                                    </li>
                                }
                                {handleViewImage && <li className="p-1">
                                    <ButtonIcon
                                        buttonClassName="relative flex justify-start items-center gap-2 hover:bg-vulcan-500 hover:text-white w-full hover:rounded-xs"
                                        imageClassName="max-w-[16px] max-h-[16px] my-0 fill-link_water-500"
                                        icon="/view.svg"
                                        width={28}
                                        height={28}
                                        alt="view menu image"
                                        onClick={() => handleViewImage(image.id)}

                                    >View Post</ButtonIcon>
                                </li>}
                                {handleRemoveImage && <li className="p-1">
                                    <ButtonIcon
                                        buttonClassName="relative flex justify-start items-center gap-2 hover:bg-vulcan-500 hover:text-white w-full hover:rounded-xs"
                                        imageClassName="max-w-[16px] max-h-[16px] my-0 text-white"
                                        icon="/hide.svg"
                                        width={28}
                                        height={28}
                                        alt="hide menu image"
                                        onClick={() => handleRemoveImage(image.id)}

                                    > Hide this image</ButtonIcon>
                                </li>}
                            </ul>
                        </div>
                    </Popover>
                    <div className="relative">
                        <ButtonIcon
                            buttonClassName={`relative rounded-full bg-white min-w-[30px] h-[30px]`}
                            imageClassName="max-w-[22px] max-h-[22px] mx-auto my-0"

                            width={28}
                            height={28}
                            alt="pincel image"
                            onMouseEnter={() => setExpandRemix(true)}
                            onMouseLeave={() => setExpandRemix(false)}
                        >
                            {
                                ExpandRemix ? (<>
                                    <div className="text-black px-4">
                                        Remix
                                    </div>
                                </>) : (<>
                                    <Image
                                        src="/pincel.svg"
                                        width={28}
                                        height={28}
                                        alt="remix image"
                                        className="max-w-[22px] max-h-[22px] mx-auto my-0"></Image>
                                </>)
                            }

                        </ButtonIcon>
                    </div>
                </div>
            </div >

            <Image
                src={image.url}
                alt={image.meta?.prompt || 'image without prompt'}
                width={image.width}
                height={image.height}
                className="h-[467px] w-[320px] max-w-[450px] rounded-lg border-vulcan-500 border-2 object-cover"
                loading="eager"

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
                            >👍 {image.stats.likeCount}</ButtonIcon>

                        </li>

                        <li>
                            <ButtonIcon
                                buttonClassName="relative flex justify-center text-xs "
                                width={28}
                                height={28}
                                alt="heart image"
                            >❤️ {image.stats.heartCount}</ButtonIcon>

                        </li>

                        <li>
                            <ButtonIcon
                                buttonClassName="relative flex justify-center text-xs "
                                width={28}
                                height={28}
                                alt="laugh image"
                            >😂 {image.stats.laughCount}</ButtonIcon>
                        </li>

                        <li>
                            <ButtonIcon
                                buttonClassName="relative flex justify-center text-xs "
                                width={28}
                                height={28}
                                alt="like image"
                            >😢 {image.stats.cryCount}</ButtonIcon>
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
                                    {image.stats?.tipCount || 0}</p> </ButtonIcon>
                        </li>
                    </ul>
                </div>

                <div>
                </div>
            </div>
        </div >
    );
}


export default CardImage;