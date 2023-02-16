import { createEffect, createSignal, JSX } from "solid-js";
import useHover from "~/hooks/useHover";

interface ICheckbox {
  	onClick: (isChecked: boolean, e: unknown) => void;
    className?: string;
    checkedClass?: string;
    behaveAsButton?: boolean;
    children?: (isChecked: boolean, hover: boolean) => JSX.Element; 
}

export default function Checkbox( { className, checkedClass, behaveAsButton, onClick, children } : ICheckbox ) 
{
    const [isChecked, setChecked] = createSignal<boolean>(false)	
    const [mouseDown, setMouseDown] = createSignal<boolean>(false)	
	const { hover, onMouseOver, onMouseOut } = useHover();

    const onMouseDown = () => {
        if ( behaveAsButton ) setChecked(true)
        setMouseDown(true);
    }
    const onMouseUp = () => {
        if ( behaveAsButton ) setChecked(false)
        setMouseDown(false);
    }

  	return (
        <div 
            class={`${mouseDown() ? 'scale-90' : ''} ${isChecked() ? checkedClass : ''} ${className}`}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={e => { 	
				const update = !isChecked();	
				onClick( update, e ); 
				!behaveAsButton && setChecked( update ); 
			}}
		>
			{ children && children(isChecked(), hover()) }
        </div>
  	);
};