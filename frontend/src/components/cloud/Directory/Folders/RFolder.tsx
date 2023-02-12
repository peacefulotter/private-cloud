
import { FiFolder } from 'solid-icons/fi'
import { createEffect, createSignal } from 'solid-js';
import { A, useRouteData } from 'solid-start';

import { ExplorerRouteData, FileOrFolderWithIndex } from '~/types';

interface IFolder {
    folders: FileOrFolderWithIndex[];
    folder: FileOrFolderWithIndex;
}

const catchEnter = ( e: KeyboardEvent ) => {
    if ( e.key !== 'Enter') return false;
    e.preventDefault();
    e.stopPropagation();
    return true;
}

export default function RFolder( { folders, folder }: IFolder )
{
    const { toggleSelectExplorer, folderService, isSelecting, pathname } = useRouteData<ExplorerRouteData>();
    const { name } = folder;

    const [editing, setEditing] = createSignal<boolean>(false);
    const [editName, setEditName] = createSignal<string>(name);

    createEffect( () => {
        setEditName(name)
    }, [name] )

    const onFocus = () => setEditing(true)
    const onBlur = () => {
        setEditing(false)
        const eName = editName();
        if ( eName === name ) return;
        else if ( editName.length === 0 ) return setEditName(name)
        else if ( folders.some( f => eName === f.name ) )
        {
            // TODO: alertWarning( 'Folder name already used' )
            return setEditName(name)
        }

        folderService.rename(folder.i, editName()) // , () => setEditName(name) 
    }

    const onChange = (e: any) =>
    {
        if ( e.currentTarget === null ) return;
        setEditName(e.currentTarget.value)
    }

    const onKeyDown = catchEnter;
    const onKeyUp = (e: KeyboardEvent) => { 
        if ( !catchEnter(e) ) return;
        (e.target as any).blur()
        console.log('enter key');
    }

    const padding = 1.3
    const width = (editName.length > 0 ? editName.length : name.length) + padding

    return (
        <A
            href={isSelecting() ? '' : pathname + name + '/'} 
            class="flex flex-col justify-center w-28 h-28 items-center cursor-pointer no-underline overflow-hidden repo-elt-folder animate-fade-in"
            style={{"pointer-events": editing() ? 'none' : 'auto'}}
            onClick={() => isSelecting() && toggleSelectExplorer(folder.i)}
        >
            <FiFolder class='text-5xl'/>
            <input 
                type='text'
                class="bg-transparent p-1 font-mono font-bold text-xs rounded-sm focus:ring-gray-500 border-transparent" 
                style={{width: width + "ch", "max-width": '105%'}}
                placeholder={name} 
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange} 
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                value={editName()} />
        </A>
    )
}