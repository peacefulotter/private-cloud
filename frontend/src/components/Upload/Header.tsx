import { FiPlus, FiUploadCloud, FiX } from "solid-icons/fi";
import { Accessor } from "solid-js";
import { UploadState } from "~/types";

import HeaderBtn from "./HeaderBtn";


interface IHeader {
    state: Accessor<UploadState>;
    addFiles: (e: any) => void;
    remFiles: (e: any) => void;
    uploadFiles: (e: any) => void;
}

export default function Header( { state, addFiles, remFiles, uploadFiles }: IHeader )
{
    const disabled = !(state() === 'loaded')

    return (
        <div class="flex items-center justify-between flex-wrap w-full gap-2">
            <input class="inputfile" id="file" type="file" name="files[]" multiple onChange={addFiles} />
            <label for="file" class="btn-upload-green w-[30%]">
                <FiPlus class="select-btn text-3xl"/>
            </label>
            <HeaderBtn icon={FiX} onClick={remFiles} className='btn-upload-red w-[30%]' disabled={disabled}/>
            <HeaderBtn icon={FiUploadCloud} onClick={uploadFiles} className='btn-upload-blue w-[30%]' disabled={disabled}/>
        </div>
    )
}