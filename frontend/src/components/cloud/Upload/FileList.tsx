import { Accessor, For, Show } from "solid-js";
import FileElt from "./FileElt";

interface IFileList {
    files: Accessor<File[]>;
    remFile: (i: number) => void;
}

export default function FileList( { files, remFile }: IFileList )
{
    return (
        <Show 
            when={files().length > 0}
            fallback={
                <div class='text-normal text-base text-gray-600 mt-8'>No file selected</div>
            }
        >
            <div class="w-100 h-[90vh] pb-24 overflow-y-scroll">
                <For each={files()}>
                    { (file, i) => <FileElt i={i} file={file} remFile={remFile} /> }
                </For>
            </div>
        </Show>
        
    ) 
}