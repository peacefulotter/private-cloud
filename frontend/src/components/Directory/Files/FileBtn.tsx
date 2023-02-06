import { IconTypes } from "solid-icons";

interface IFileBtn {
    className: string;
    iconClassName: string;
    Icon: IconTypes;
    display: boolean;
    onClick?: (e: MouseEvent) => void;
}

export default function FileBtn( { className, iconClassName, Icon, display, onClick }: IFileBtn )
{
    if ( !display ) return null;

    return (
        <div 
            class={`absolute p-1 transition-colors rounded shadow animate-fade-in ${className}`}
            onClick={onClick}
        >
            <Icon class={`text-2xl ${iconClassName}`} />
        </div> 
    )
}