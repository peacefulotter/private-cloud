import { FiCheckSquare, FiDownload, FiTrash2 } from "solid-icons/fi";
import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { ExplorerRouteData } from "~/types";

import MenuCheckbox from "./MenuCheckbox";
import PathBreadcrumb from "./PathBreadcrumb";

export default function Menu()
{
    const { selectedExplorer, isSelecting, removeSelected, downloadSelected, setSelecting } = useRouteData<ExplorerRouteData>();

    return (
        <div class="flex justify-between items-center pt-16 mx-32 mb-8">
            <PathBreadcrumb />
            <div class='flex items-center gap-4'>
                <Show when={isSelecting() && selectedExplorer().length > 0}>
                    <MenuCheckbox Icon={FiTrash2} onClick={removeSelected} behaveAsButton={true} />
                    <MenuCheckbox Icon={FiDownload} onClick={downloadSelected} behaveAsButton={true} /> 
                </Show>
                <MenuCheckbox Icon={FiCheckSquare} onClick={() => setSelecting(prev => !prev)} />
            </div>
        </div>
        
    )
}