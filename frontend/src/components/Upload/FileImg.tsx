import { FiImage } from "solid-icons/fi";
import useFileSrc from "../../hooks/useFileSrc";

const FileImg = ( { file }: { file: File } ) => {

    const src = useFileSrc(file)

    return src === undefined
        ? <FiImage class="toast-img" style={{"font-size": '3em'}}/>
        : <img class="toast-img" src={src()}></img>;
}

export default FileImg;