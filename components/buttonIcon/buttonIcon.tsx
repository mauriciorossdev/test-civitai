import Image from "next/image";

interface ButtonIconProps {
    imageClassName?: string;
    buttonClassName?: string;
    icon?: string;
    alt: string | 'icon image';
    width: number | 28;
    height: number | 28;
    children?: React.ReactNode;
    id?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

/**
 * ButtonIcon component
 * @param {string} buttonClassName - button class name
 * @param {string} imageClassName - image class name
 * @param {string} icon - icon image
 * @param {string} alt - alt text
 * @param {number} width - image width
 * @param {number} height - image height
 * @param {React.ReactNode} children - children
 * @param {string} id - id
 * @param {() => void} onClick - on click event
 * @param {() => void} onMouseEnter - on mouse enter event
 * @param {() => void} onMouseLeave - on mouse leave event
 * @returns {React.ReactNode} - ButtonIcon component
 * @example
 * <ButtonIcon
 * buttonClassName="relative flex justify-center text-xs "
 * width={28}
 * height={28}
 * alt="like image"
 * >👍 1000</ButtonIcon
 * >
 * 
 */
export const ButtonIcon = (
    { buttonClassName,imageClassName, icon, alt, width, height, children, id, onClick, onMouseEnter, onMouseLeave }: ButtonIconProps
) => {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={buttonClassName}
            id={id || 'btn_options'}>
            {icon && (
                <Image
                    src={icon}
                    width={width}
                    height={height}
                    alt={alt}
                    className={imageClassName}
                ></Image>
            )}
            {children && children}
        </button>
    );
};

export default ButtonIcon;