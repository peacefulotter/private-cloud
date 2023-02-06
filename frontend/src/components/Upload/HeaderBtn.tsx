import { IconTypes } from "solid-icons";

interface IHeaderBtn {
    icon: IconTypes;
    className: string;
    disabled: boolean;
    onClick?: (e: any) => void;
}

export default function HeaderBtn( { icon, className, disabled, onClick }: IHeaderBtn )
{
    const Icon = icon;

    return (
        <button 
            class={className}
            disabled={disabled}
            onClick={onClick}
        >
            <Icon class="select-btn text-3xl"/>
        </button>
    )
}