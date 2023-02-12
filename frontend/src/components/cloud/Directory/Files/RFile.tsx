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
    const { fileService, toggleSelectExplorer, isSelecting, pathname } = useRouteData<ExplorerRouteData>()

    const [fallback, setFallback] = createSignal<boolean>(false)
    const [loaded, setLoaded] = createSignal<boolean>(false)
    const [hover, setHover] = createSignal<boolean>(false);
    const [src, setSrc] = createSignal<string>('')

    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false)
    
    // TODO: improve -> use a react image library
    // TODO: then -> make animate-fade-in work
    createEffect( on(
        () => file.name,
        () => {
            setFallback(false)
            // FIXME: dynamic url
            const to = pathname + name;
            const src = `http://localhost:3001${to}`
            setSrc(src)
            setLoaded(false)
        }
    ) )

    const onError = () => {
        setFallback(true);
        setLoaded(true);
    }
    const onLoad = () => setLoaded(true)

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
            class="repo-elt repo-elt-file truncate relative transition-opacity duration-500" 
            style={ { opacity: loaded() ? 1 : 0 } }
            onClick={onClick} 
            onMouseOver={onMouseOver} 
            onMouseOut={onMouseOut}
        >
            <FileIcon filename={pathname} size={4} />
            {/* <Show 
                when={fallback()} 
                // fallback={
                //     <>
                //         <FileIcon filename={pathname} size={4} />
                //         <p class="w-24 text-xs text-center truncate">{name}</p>
                //     </>
                // }
            >
                <img loading='lazy' src={src()} onError={onError} onLoad={onLoad} />
            </Show> */}
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