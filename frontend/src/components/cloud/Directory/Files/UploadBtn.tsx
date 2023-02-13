import { useRouteData } from "solid-start";
import { createSignal, Show } from "solid-js";
import { FiUploadCloud } from "solid-icons/fi";

import { ExplorerRouteData } from "~/types";

export default function UploadBtn() 
{
    const [files, setFiles] = createSignal<File[]>([]);
	const [uploading, setUploading] = createSignal<boolean>(false)
	const [progress, setProgress] = createSignal<number>(0)

	const { upload } = useRouteData<ExplorerRouteData>();

	const uploadFiles = (e: any) => {
		e.preventDefault();

		setUploading(true)

		const onProgress = ( { loaded, total }: ProgressEvent ) => 
			setProgress( (loaded / total) * 100 )

		const onDone = () => {
			setFiles([]);
			setUploading(false);
			setProgress(0);
		}

		upload( files(), onProgress, onDone, onDone )
	}

	return (
        <div 
			class='flex flex-col justify-center w-28 h-28 items-center rounded cursor-pointer no-underline overflow-hidden repo-elt-folder [&:hover>*]:text-gray-700 active:scale-75 text-gray-700'
			style={{background: 'rgba(0, 0, 0, 0.1)'}}
		>
            <input class="w-px h-px opacity-0 overflow-hidden  .absolute z-[-1]" id="file" type="file" name="files[]" multiple onChange={uploadFiles} />
            <label for="file">
                <FiUploadCloud class="text-5xl cursor-pointer"/>
            </label>
			<Show when={uploading()}>
				<p>{progress()}%</p>
			</Show>
        </div>
    )
}