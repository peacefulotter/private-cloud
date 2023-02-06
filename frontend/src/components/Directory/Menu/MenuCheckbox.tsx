import Checkbox from "./Checkbox";
import { IconTypes } from 'solid-icons';

interface IMenuCheckbox {
    Icon: IconTypes;
    name: string;
    color: string;
    onClick: (isChecked: boolean) => void;
    behaveAsButton?: boolean;
}

export default function MenuCheckbox( { Icon, name, color, onClick, behaveAsButton }: IMenuCheckbox ) 
{    

    const iconCheckedStyle = (isChecked: boolean) => isChecked ? `stroke-${color}-200 text-${color}-200` : ''

    return (
        <Checkbox 
            className={`btn group relative text-${color}-200 hover:bg-${color}-200`} 
            checkedClass={`bg-${color}-500 hover:bg-${color}-400`}
            onClick={onClick}
            behaveAsButton={behaveAsButton}
        >
            { (isChecked, hover) => <>
                <Icon class={`btn-icon group-hover:stroke-${color}-700 ${iconCheckedStyle(isChecked)}` } />
                { false && hover && <p class={`btn-text group-hover:text-${color}-700`}>{name}</p> }
            </>}
            
        </Checkbox>
    )
}