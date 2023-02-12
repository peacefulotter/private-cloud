
import { createEffect, createSignal, For, on, Show } from 'solid-js';
import { RouteDataFunc, useLocation, useNavigate, useParams, useRouteData } from 'solid-start';

import RFile from '~/components/cloud/Directory/Files/RFile';
import AddFolderBtn from '~/components/cloud/Directory/Folders/AddFolderBtn';
import RFolder from '~/components/cloud/Directory/Folders/RFolder';
import Menu from '~/components/cloud/Directory/Menu/Menu';
import FileService from '~/requests/cloud/FileService';
import FolderService from '~/requests/cloud/FolderService';
import Upload from '~/components/cloud/Upload/Upload';

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
    const { pathname } = location

    const [explorer, setExplorer] = createSignal<Explorer>([])
    const [isSelecting, setSelecting] = createSignal<boolean>(false);

    createEffect( on(
        () => location.pathname, 
        () => {
            FolderService.read(pathname, setExplorer)
        }
    ))

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
        downloadOne: FolderService.downloadOne(pathname),
        removeOne: FolderService.removeOne(pathname, removeOne('folder') ),
        rename: FolderService.rename(explorer(), sortExplorer, pathname),
        create: () => {
            const name = resolveName('New folder', 'folder');
            FolderService.create( pathname, name, () => {
                sortExplorer( prev => [...prev, { name, selected: false, type: 'folder' }] )
            } )
        },
    }

    const fileService: FileServiceContext = {
        downloadOne: FileService.downloadOne(pathname),
        removeOne: FileService.removeOne(pathname, removeOne('file') ),
        rename: FileService.rename(explorer(), sortExplorer, pathname),
    }

    const removeSelected = FileService.removeSelected( pathname, explorer(), () => 
        setExplorer( prev => prev.filter( v => !v.selected ) )
    )

    const downloadSelected = FileService.downloadMany(pathname, explorer().filter( v => v.selected ))

	return { 
		explorer, setExplorer, isSelecting, setSelecting, 
		toggleSelectExplorer, sortExplorer, upload, 
		removeSelected, downloadSelected,
		folderService, fileService, pathname 
	};
}


function ExplorerComponent() 
{
    const { explorer } = useRouteData<ExplorerRouteData>();

    const [folders, files] = partition<FileOrFolder, FileOrFolderWithIndex>(
        explorer(), (f) => f.type === 'folder', (f, i) => ({ ...f, i }) 
    );

    console.log(folders, files);
    

    return (
        <div class="directories">
            <For each={folders}>
                { (folder) => <RFolder folders={folders} folder={folder} /> }
            </For>

            <AddFolderBtn />

            <div class='w-full' />
            
            {/* <Show 
                when={files.length > 0} 
                fallback={
                    <p class="m-auto mt-32 text-xl text-gray-500">
                        this folder contains no files
                    </p>
                }
            > */}
            <For each={files}>
                { (file) => <RFile file={file} /> }
            </For>
            {/* </Show> */}
        </div>
    )
}


export default function Home() {

	return (
		<main class="w-full h-full">
			<nav>
			</nav>
            <div class='flex h-full w-full'>
				<Upload />
				<div class="w-full">
					<Menu />
					<ExplorerComponent/>
				</div>
			</div>
		</main>
	);
}

