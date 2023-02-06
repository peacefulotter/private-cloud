import { IconProps, IconTypes } from "solid-icons";
import { FaRegularFileAudio, FaRegularFileLines, FaRegularFileZipper, FaRegularFilePowerpoint, FaRegularFile, FaRegularFileImage, FaRegularFileVideo, FaRegularFileWord, FaRegularFilePdf, FaRegularFileCode } from "solid-icons/fa";

const EXTENSIONS_ICON = new Proxy<{ [key: string]: IconTypes }>( {
    'py|js|ts|tsx|java|c|cpp': FaRegularFileCode,
    'png|jpg|jpeg|bmp': FaRegularFileImage,
    'zip|jar|rar': FaRegularFileZipper,
    'doc|docx': FaRegularFileWord,
    'md|txt': FaRegularFileLines,
    'pptx': FaRegularFilePowerpoint,
    'pdf': FaRegularFilePdf,
    'mp3': FaRegularFileAudio,
    'mp4': FaRegularFileVideo,
}, {
    get: (target, property) => {
        for ( let k in target )
            if ( new RegExp(k).test(property as string) )
                return target[k]
        return FaRegularFile
    }
} )

interface IFileIcon extends IconProps {
    filename: string;
    size: number;
}

export default function FileIcon( { filename, size, ...props }: IFileIcon )
{
    const names = filename.split('.')
    const extension = names[names.length - 1]
    const Icon = EXTENSIONS_ICON[extension]
    return <Icon size={`${size}em`} {...props} />
}