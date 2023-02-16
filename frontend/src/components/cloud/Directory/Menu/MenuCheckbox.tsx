import Checkbox from "./Checkbox";
import { IconTypes } from 'solid-icons';
import { Show } from "solid-js";

interface IMenuCheckbox {
    Icon: IconTypes;
    onClick: (isChecked: boolean) => void;
    behaveAsButton?: boolean;
}

export default function MenuCheckbox( { Icon, onClick, behaveAsButton }: IMenuCheckbox ) 
{    
    return (
        <Checkbox 
            className='btn group relative transition-colors' 
            checkedClass='bg-second text-sixth'
            onClick={onClick}
            behaveAsButton={behaveAsButton}
        >
            { (isChecked, hover) => <>
                <Icon class='text-sixth text-xl' />
            </>}
            
        </Checkbox>
    )
}