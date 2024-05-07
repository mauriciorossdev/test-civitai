import { useState } from "react";
import ButtonIcon from "../buttonIcon/buttonIcon";

interface PopoverProps {
    children: React.ReactNode;
}

const Popover = (
    { children }: PopoverProps
) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative ">

            <ButtonIcon
                buttonClassName="relative flex justify-center"
                imageClassName="max-w-[22px] max-h-[22px] mx-auto my-0"
                icon="/dots.svg"
                width={28}
                height={28}
                alt="dots menu image"
                id={'opt-popover'}
                onClick={togglePopover}

            />
            {isOpen && (
                <>
                    <div className="absolute top-8 left-[50%] w-[200px] translate-x-[-55%] z-10 ">
                        <div className="w-2 h-2 transform rotate-45 absolute border-t-2 border-l-2 border-vulcan-500 left-[50%] top-[-4px] border-b-0 border-r-0 z-[20] bg-black_russian-500"></div>

                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

export default Popover;
