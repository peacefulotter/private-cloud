import { FiDownload, FiPlusSquare, FiTrash2 } from "solid-icons/fi";
import { useRouteData } from "solid-start";
import { ExplorerRouteData } from "~/types";

import MenuCheckbox from "./MenuCheckbox";
import PathBreadcrumb from "./PathBreadcrumb";

export default function Menu()
{
    const { explorer, isSelecting, removeSelected, downloadSelected, setSelecting } = useRouteData<ExplorerRouteData>();

    const someAreSelected = isSelecting() && explorer().some( v => v.selected );

    return (
        <div class="flex justify-between items-center mt-16 mx-32 mb-8">
            <PathBreadcrumb />
            <div class='flex items-center gap-4'>
                { someAreSelected && <MenuCheckbox Icon={FiTrash2} color='red' name='Remove' onClick={removeSelected} behaveAsButton={true} /> }
                { someAreSelected && <MenuCheckbox Icon={FiDownload} color='blue' name='Download' onClick={downloadSelected} behaveAsButton={true} /> }
                <MenuCheckbox Icon={FiPlusSquare} color='purple' name='Select' onClick={() => setSelecting(prev => !prev)} />
            </div>
        </div>
        
    )
}