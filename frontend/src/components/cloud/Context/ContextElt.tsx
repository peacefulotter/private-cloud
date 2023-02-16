import { IconTypes } from "solid-icons";



interface IContextElt {
    Icon: IconTypes;
    name: string;
    onClick: () => void;
}

export default function ContextElt( { Icon, name, onClick }: IContextElt )
{
    const onClickHandler = (e: MouseEvent) => {
        e.preventDefault();
        onClick();
    }

    return (
        <div class='flex justify-between items-center' onClick={onClickHandler}>
            <p>{name}</p>
            <Icon />
        </div>
    )
}