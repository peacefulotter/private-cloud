import { createEffect, createSignal, JSX } from "solid-js";
import useHover from "~/hooks/useHover";

interface ICheckbox {
  	onClick: (isChecked: boolean, e: unknown) => void;
    className?: string;
    checkedClass?: string;
	forceState?: boolean;
    behaveAsButton?: boolean;
    children?: (isChecked: boolean, hover: boolean) => JSX.Element; 
}

export default function Checkbox( { forceState, className, checkedClass, behaveAsButton, onClick, children } : ICheckbox ) 
{
    const [isChecked, setChecked] = createSignal<boolean>(forceState || false)	
	const { hover, onMouseOver, onMouseOut } = useHover();

    createEffect( () => {
        if ( forceState === undefined ) return;
        setChecked( forceState )
    }, [forceState] )

  	return (
        <div 
            class={`${className} ${isChecked() ? checkedClass : ''}`}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseDown={() => behaveAsButton && setChecked(true)}
            onMouseUp={() => behaveAsButton && setChecked(false)}
            onClick={e => { 	
				const update = forceState !== undefined ? forceState : !isChecked;	
				onClick( update, e ); 
				!behaveAsButton && setChecked( update ); 
			}}
		>
			{ children && children(isChecked(), hover()) }
        </div>
  	);
};