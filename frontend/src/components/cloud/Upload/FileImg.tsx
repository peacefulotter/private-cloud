import { FiImage } from "solid-icons/fi";
import useFileSrc from "~/hooks/useFileSrc";

const FileImg = ( { file }: { file: File } ) => {

    const src = useFileSrc(file)

    return src === undefined
        ? <FiImage class="object-cover w-10 h-10 rounded-md text-5xl" />
        : <img class="object-cover w-10 h-10 rounded-md text-5xl" src={src()}></img>;
}

export default FileImg;