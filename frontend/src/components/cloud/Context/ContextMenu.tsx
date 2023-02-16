import { FiDownload, FiTrash2 } from "solid-icons/fi";
import ContextElt from "./ContextElt";


interface IContextMenu {
    
}

export default function ContextMenu() 
{
    const downloadEvent = () => {

    }
    
    const removeEvent = () => {

    }

    return (
        <div class='bg-sixth p-4'>
            <ContextElt Icon={FiDownload} name='Download' onClick={downloadEvent} />
            <ContextElt Icon={FiTrash2} name='Remove' onClick={removeEvent} />
        </div>
    )
}