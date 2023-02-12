import { HiOutlineX } from "solid-icons/hi";
import { Accessor } from "solid-js";
import FileIcon from "../FileIcon";


interface IFileElt { 
    i: Accessor<number>;
    file: File;
    remFile: (i: number) => void;
}

export default function FileElt( { i, file, remFile }: IFileElt )
{
    return (
        <div class="grid w-100 h-12 items-center" style={{"grid-template-columns": "2.5em auto 30px"}}>
            <FileIcon filename={file.name} size={2} />
            <div class="text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden" style={{color: '#333', "max-width": '13vw'}}>
                {file.name}
            </div>
            <HiOutlineX class="ml-auto cursor-pointer text-gray-500 hover:text-gray-800 hover:text-lg" onClick={() => remFile(i())} />
        </div>
    )
}