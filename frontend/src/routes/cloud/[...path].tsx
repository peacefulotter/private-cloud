
import { createEffect, createMemo, createSignal, For, on } from 'solid-js';
import { RouteDataFunc, useRouteData } from 'solid-start';

import RFile from '~/components/cloud/Directory/Files/RFile';
import UploadBtn from '~/components/cloud/Directory/Files/UploadBtn';
import AddFolderBtn from '~/components/cloud/Directory/Folders/AddFolderBtn';
import RFolder from '~/components/cloud/Directory/Folders/RFolder';
import Menu from '~/components/cloud/Directory/Menu/Menu';
import FileService from '~/requests/cloud/FileService';
import FolderService from '~/requests/cloud/FolderService';

import { Explorer, ExplorerRouteData, FileOrFolder, FileOrFolderWithIndex, FileServiceContext, FolderServiceContext } from '~/types';

import '~/components/cloud/Directory/index.css'

function partition<T, U>(array: T[], isLeft: (t: T) => boolean, map: (t: T, i: number) => U) 
{
    return array.reduce( ([left, right], elem, i) => {
        return isLeft(elem) 
            ? [[...left, map(elem, i)], right] as [U[], U[]] 
            : [left, [...right, map(elem, i)]] as [U[], U[]];
    }, [[], []] as [U[], U[]]);
  }

export const routeData: RouteDataFunc<ExplorerRouteData> = ({location}) => {

    const [explorer, setExplorer] = createSignal<Explorer>([]);
    const [isSelecting, setSelecting] = createSignal<boolean>(false);
    const [pathname, setPathname] = createSignal<string>(location.pathname);

    createEffect( on( 
        () => location.pathname,
        () => setPathname(location.pathname)
    ) )

    createEffect( () => {
        FolderService.read(pathname(), (exp: Explorer) => {
            setExplorer(exp);
            console.log(pathname());
            console.log(exp);
        } )
    } )

    const toggleSelectExplorer = (i: number) => () => {
        const temp = [...explorer()];
        temp[i].selected = !temp[i].selected;
        setExplorer(temp);
    }
    
    const sortExplorer = ( cb: (prev: Explorer) => Explorer ) => 
        setExplorer( prev => (cb ? cb(prev) : prev).sort( (a, b) => a.name.localeCompare(b.name) ) )

    const upload = (files: File[], progress: (e: ProgressEvent) => void, cb: () => void, err: () => void) => {
        const data = new FormData();
        files.forEach( file => data.append('files[]', file, file.name) )
    
        FileService.upload( data, 
            progress, 
            () => { 
                const filesExplorer = files.map( ({name}) => ({name, selected: false, type: 'file'} as FileOrFolder))
                sortExplorer( prev => [...prev, ...filesExplorer] )
                cb()
            },
            err
        )
    }

    const resolveName = (baseName: string, type: 'file' | 'folder') => {
        let name = baseName;
        let i = 1
        while ( explorer().some( v => v.name === name && v.type === type) ) {
            name = baseName + ` (${i++})`
        }
        return name;
    }

    const removeOne = (type: 'file' | 'folder') => (name: string) => 
        setExplorer( prev => prev.filter( v => v.name !== name || v.type !== type ) )

    const folderService: FolderServiceContext = {
        downloadOne: FolderService.downloadOne(location.pathname),
        removeOne: FolderService.removeOne(location.pathname, removeOne('folder') ),
        rename: FolderService.rename(explorer(), sortExplorer, location.pathname),
        create: () => {
            const name = resolveName('New folder', 'folder');
            FolderService.create( location.pathname, name, () => {
                sortExplorer( prev => [...prev, { name, selected: false, type: 'folder' }] )
            } )
        },
    }

    const fileService: FileServiceContext = {
        downloadOne: FileService.downloadOne(location.pathname),
        removeOne: FileService.removeOne(location.pathname, removeOne('file') ),
        rename: FileService.rename(explorer(), sortExplorer, location.pathname),
    }

    const removeSelected = FileService.removeSelected( location.pathname, explorer(), () => 
        setExplorer( prev => prev.filter( v => !v.selected ) )
    )

    const downloadSelected = FileService.downloadMany(location.pathname, explorer().filter( v => v.selected ))

	return { 
		explorer, isSelecting, pathname,
        setExplorer, setSelecting, 
		toggleSelectExplorer, sortExplorer, upload, 
		removeSelected, downloadSelected,
		folderService, fileService
	};
}


function ExplorerComponent() 
{
    const { explorer } = useRouteData<ExplorerRouteData>();

    const [folders, setFolders] = createSignal<FileOrFolderWithIndex[]>([])
    const [files, setFiles] = createSignal<FileOrFolderWithIndex[]>([])
    
    createEffect( () => {
        const [_folders, _files] = partition<FileOrFolder, FileOrFolderWithIndex>(
            explorer(), (f) => f.type === 'folder', (f, i) => ({ ...f, i }) 
        )
        setFolders(_folders);
        setFiles(_files);
        console.log('here');
    })

    return (
        <div class="flex flex-col gap-10 w-full p-10 bg-primary">
            <div class="flex gap-3">
                <AddFolderBtn />
                <For each={folders()}>
                    { (folder) => <RFolder folders={folders()} folder={folder} /> }
                </For>
            </div>
            
            <div class='w-full h-px m-auto rounded bg-first' />

            <div class="flex gap-3">
                <UploadBtn />
                <For each={files()}>
                    { (file) => <RFile file={file} /> }
                </For>
            </div>
        </div>
    )
}


export default function Home() {
	return (
        <div class='h-full w-full bg-sixth'>
            <Menu />
            <ExplorerComponent/>
        </div>
	);
}

