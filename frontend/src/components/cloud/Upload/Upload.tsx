import { useRouteData } from "solid-start";
import { createSignal } from "solid-js";
import { FiChevronRight } from "solid-icons/fi";

import FileList from "./FileList";
import Header from "./Header";

import { ExplorerRouteData, UploadState } from "~/types";

const Upload = () => {
	const [opened, setOpened] = createSignal<boolean>(false)
    const [files, setFiles] = createSignal<File[]>([]);
	const [state, setState] = createSignal<UploadState>('disabled')
	const [progress, setProgress] = createSignal<number>(0)

	const { upload } = useRouteData<ExplorerRouteData>();

	const uploadFiles = (e: MouseEvent) => {
		e.preventDefault();

		setState('uploading')
		// UploadingToast.uploading();

		upload(
			files(), 
			( { loaded, total }: ProgressEvent ) => setProgress( (loaded / total) * 100 ),
			() => { 
				setFiles([]);
				setState('complete');
				setProgress(0);
			},
			() => {
				setState('loaded');
				setProgress(0);
			}
		)
	}

	const addFiles = (e: any) => {
		setFiles(prev => [...prev, ...e.target.files]);
		setState('loaded')
	}

	const remFile = (i: number) => {
		if ( files() === undefined ) return
		const temp = [...files()]
		temp.splice(i, 1)
		setFiles( temp );
		if ( temp.length === 0 )
			setState('disabled')
	}

	const remFiles = (e: MouseEvent) => {
		e.preventDefault()
		setFiles([])
		setState('disabled')
	}

	const toggleOpen = () => setOpened(prev => !prev )

    return (
		<>
		<form class="h-100 w-96 relative flex flex-col items-center gap-3 p-10 bg-gray-100 transition-transform" style={{transform: opened() ? '' : 'translateX(-100%)'}}>
			<div class="absolute p-3 ml-auto top-0 right-0 translate-x-full bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
				<FiChevronRight class="text-3xl text-gray-400 transition-transform" style={{transform: opened() ? 'rotate(180deg)' : ''}} onClick={toggleOpen} />
			</div>
			<Header state={state} addFiles={addFiles} remFiles={remFiles} uploadFiles={uploadFiles} />
			<FileList files={files} remFile={remFile}/>
		</form>

		<div class="fixed right-5 bottom-5 shadow-md" style={{height: state() === 'uploading' ? '110px' : '0px'}}>
			<div class="relative flex w-64 h-full flex-col-reverse justify-between rounded-lg bg-white overflow-hidden transition-all" id="progress">
				<div style={{width: `${progress}%`, background: "linear-gradient(to right, #E4F5DA, #A4DC86)"}} class="w-0 h-1/6"></div>
			</div>
		</div>
		</>
    )
}

export default Upload;