'use client';
import Image from "next/image";
import ButtonIcon from "../buttonIcon/buttonIcon";
import { useState } from "react";
import Popover from "../popover/popover";

interface cardImageProps {
    image: {
        id: number;
        url: string;
        meta: {
            prompt: string;
        };
        width: number;
        height: number;
    };
}


export const CardImage = (
    { image }: cardImageProps
) => {

    const [showPopover, setShowPopover] = useState(false);

    const toggleMenu = () => {
        setShowPopover(!showPopover);
    };

    return (
        <div key={image.id} className="relative rounded-lg  hover:cursor-pointer bg-vulcan-500">
            <div className="absolute flex right-2 top-2">
                <div className="flex flex-col items-stretch ml-auto gap-[10px] justify-start">
                    <Popover>
                        <div className="bg-black_russian-500 rounded-[4px] border-2 border-vulcan-500">
                            <ul>
                                <li className="p-2">
                                    <ButtonIcon
                                        buttonClassName="relative flex justify-center items-center gap-2"
                                        imageClassName="max-w-[16px] max-h-[16px] mx-auto my-0 fill-link_water-500"
                                        icon="/save.svg"
                                        width={28}
                                        height={28}
                                        alt="save menu image"

                                    >Save</ButtonIcon>
                                </li>
                                <li className="p-2">
                                    <ButtonIcon
                                        buttonClassName="relative flex justify-center items-center gap-2"
                                        imageClassName="max-w-[16px] max-h-[16px] mx-auto my-0 fill-link_water-500"
                                        icon="/view.svg"
                                        width={28}
                                        height={28}
                                        alt="view menu image"

                                    >View</ButtonIcon>
                                </li>
                                <li className="p-2">
                                    <ButtonIcon
                                        buttonClassName="relative flex justify-center items-center gap-2"
                                        imageClassName="max-w-[16px] max-h-[16px] mx-auto my-0 text-white"
                                        icon="/hide.svg"
                                        width={28}
                                        height={28}
                                        alt="hide menu image"

                                    >Hide this image</ButtonIcon>
                                </li>
                            </ul>
                        </div>
                    </Popover>
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
    );
}


export default CardImage;