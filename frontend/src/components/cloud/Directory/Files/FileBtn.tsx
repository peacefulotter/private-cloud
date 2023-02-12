import { IconTypes } from "solid-icons";
import { Show } from "solid-js";

interface IFileBtn {
    className: string;
    iconClassName: string;
    Icon: IconTypes;
    display: boolean;
    onClick?: (e: MouseEvent) => void;
}

export default function FileBtn( { className, iconClassName, Icon, display, onClick }: IFileBtn )
{
    return (
        <Show when={display}>
            <div 
                class={`absolute p-1 transition-colors rounded shadow animate-fade-in ${className}`}
                onClick={onClick}
            >
                <Icon class={`text-2xl ${iconClassName}`} />
            </div> 
        </Show>
    )
}