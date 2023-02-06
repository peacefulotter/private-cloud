import { createSignal } from "solid-js";


const useHover = () => {
    const [hover, setHover] = createSignal<boolean>(false);
    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false)
    return { hover, onMouseOver, onMouseOut }
}

export default useHover;