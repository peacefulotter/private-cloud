
import { FiPlus } from 'solid-icons/fi';
import { useRouteData } from 'solid-start';
import { ExplorerRouteData } from '~/types';

export default function AddFolderBtn()
{
    const { folderService } = useRouteData<ExplorerRouteData>();

    return (
        <div class='flex flex-col justify-center w-28 h-28 items-center cursor-pointer no-underline overflow-hidden repo-elt-folder [&:hover>*]:text-gray-700 active:scale-75 text-gray-700' onClick={folderService.create}>
            <FiPlus class='text-5xl' />
        </div>
    )
}