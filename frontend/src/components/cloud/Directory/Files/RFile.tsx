import { FiCheckSquare, FiDownload, FiTrash2 } from 'solid-icons/fi';
import { createEffect, createSignal, on, Show } from 'solid-js';
import { useRouteData } from 'solid-start';

import { ExplorerRouteData, FileOrFolderWithIndex } from '~/types';
import FileIcon from '~/components/cloud/FileIcon';
import FileBtn from './FileBtn';

interface IFile {
    file: FileOrFolderWithIndex;
}

export default function RFile( { file }: IFile )
{
    const { name, selected } = file;
    const { fileService, toggleSelectExplorer, isSelecting, pathname } = useRouteData<ExplorerRouteData>();
    
    const [fallback, setFallback] = createSignal<boolean>(true)
    const [loaded, setLoaded] = createSignal<boolean>(false)
    const [hover, setHover] = createSignal<boolean>(false);

    const to = pathname() + '/' + name;
    const src = `http://localhost:3001${to}`;

    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false);
    const onError = () => { setFallback(false); setLoaded(true); }
    const onLoad = () => setLoaded(true);

    const onClick = () => isSelecting() 
        ? toggleSelectExplorer(file.i)()
        : null // TODO: show image big

    const onDownloadClick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        fileService.downloadOne(name)
    }

    const onDeleteClick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        fileService.removeOne(name)
    }

    return (
        <div 
            class="text-third flex flex-col justify-center items-center gap-1 w-28 h-28 repo-elt-file truncate relative transition-opacity duration-500" 
            style={ { opacity: loaded() ? 1 : 0 } }
            onClick={onClick} 
            onMouseOver={onMouseOver} 
            onMouseOut={onMouseOut}
        >
            <Show 
                when={fallback()} 
                fallback={
                    <>
                        <FileIcon filename={pathname()} size={4} />
                        <p class="w-24 text-second text-xs text-center truncate">{name}</p>
                    </>
                }
            >
                <img src={src} onError={onError} onLoad={onLoad}></img>
            </Show>
            <FileBtn
                className='inset-1 w-min h-min bg-green-50'
                iconClassName='text-green-500' 
                Icon={FiCheckSquare}  
                display={isSelecting() && selected} />
            <FileBtn 
                className='bottom-1 right-1 bg-blue-100 [&:hover>*]:text-blue-600' 
                Icon={FiDownload} 
                iconClassName='text-blue-500 scale-90' 
                display={!isSelecting && hover} 
                onClick={onDownloadClick} />
            <FileBtn 
                className='top-1 right-1 bg-red-100 [&:hover>*]:text-red-600' 
                Icon={FiTrash2} 
                iconClassName='text-red-500' 
                display={!isSelecting && hover} 
                onClick={onDeleteClick} />
        </div>
    )
}