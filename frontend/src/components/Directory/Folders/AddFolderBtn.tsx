
import { FiPlus } from 'solid-icons/fi';
import { useRouteData } from 'solid-start';
import { ExplorerRouteData } from '~/types';

export default function AddFolderBtn()
{
    const { folderService } = useRouteData<ExplorerRouteData>();

    return (
        <div class='repo-elt repo-elt-folder [&:hover>*]:text-gray-700 active:scale-75' onClick={folderService.create}>
            <FiPlus class='repo-icon text-gray-500 text-3xl' />
        </div>
    )
}