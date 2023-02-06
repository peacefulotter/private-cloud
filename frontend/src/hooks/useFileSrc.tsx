import { createEffect, createSignal } from "solid-js";

const useFileSrc = ( file: File ) => {

    const [src, setSrc] = createSignal<string>();
    
    createEffect( () => {
        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result as string;
            if ( !src.startsWith('data:image') ) return;
            setSrc( src );
        }
        reader.readAsDataURL(file);
    }, [file] )

    return src;
}

export default useFileSrc;