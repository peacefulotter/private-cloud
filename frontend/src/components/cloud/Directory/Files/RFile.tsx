import { FiCheck } from 'solid-icons/fi';
import { createSignal, Show } from 'solid-js';
import { useRouteData } from 'solid-start';

import { ExplorerRouteData, FileOrFolderWithIndex } from '~/types';
import FileIcon from '~/components/cloud/FileIcon';

interface IFile {
    file: FileOrFolderWithIndex;
}

export default function RFile( { file }: IFile )
{
    const { name, i } = file;
    const { fileService, toggleSelectExplorer, isSelecting, pathname } = useRouteData<ExplorerRouteData>();
    
    const [fallback, setFallback] = createSignal<boolean>(true)
    const [loaded, setLoaded] = createSignal<boolean>(false)
    const [selected, setSelected] = createSignal<boolean>(false)
    const [hover, setHover] = createSignal<boolean>(false);
    const [menu, setMenu] = createSignal<boolean>(false);

    const to = pathname() + '/' + name;
    const src = `http://localhost:3001${to}`;

    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false);
    const onError = () => { setFallback(false); setLoaded(true); }
    const onLoad = () => setLoaded(true);

    const onClick = () => {
        if ( !isSelecting() ) return;
        toggleSelectExplorer(i)
        setSelected(prev => !prev);
    }

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

    const onContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setMenu(true);
    }

    return (
        <div 
            class="text-second flex flex-col justify-center items-center gap-1 w-28 h-28 repo-elt-file truncate relative transition-opacity duration-500" 
            style={ { opacity: loaded() ? 1 : 0 } }
            onClick={onClick} 
            onMouseOver={onMouseOver} 
            onMouseOut={onMouseOut}
            onContextMenu={onContextMenu}
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
            <Show when={isSelecting() && selected()}>
                <div class='w-min h-min absolute inset-1 transition-colors shadow rounded animate-fade-in text-sixth bg-third'>
                    <FiCheck class='text-2xl' />
                </div> 
            </Show>
        </div>
    )
}