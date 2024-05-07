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


export const SkeletonCardImage = (
   
) => {

    const [showPopover, setShowPopover] = useState(false);

    const toggleMenu = () => {
        setShowPopover(!showPopover);
    };

    return (
        <div className="relative rounded-lg  hover:cursor-pointer h-[467px] w-[320px] max-w-[450px] rounded-lg border-vulcan-500 border-2">
        </div>
    );
}


export default SkeletonCardImage;