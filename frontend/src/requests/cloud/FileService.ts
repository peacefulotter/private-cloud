
import useRequestsService from "./RequestsService";

import { Explorer } from "~/types";
import { Accessor } from "solid-js";


const service = useRequestsService('/file/');

const FileService = {
    upload: (data: FormData, onUploadProgress: (e: ProgressEvent) => void, cb?: () => void, err?: () => void) => {
        service.post( 'upload', data, { onUploadProgress }, 
            // () => UploadingToast.complete().then( cb ),
            // () => UploadingToast.error().then( err ) 
        )
    },
    
    downloadOne: (pathname: string) => (name: string) => {
        fetch(pathname + name)
            .then( res => res.blob() )
            .then( service.downloadBlob )
    },
    
    removeOne: (pathname: string, cb: (name: string) => void) => (name: string) => {
        service.get( 'remove/one', { pathname, name }, 
            () => cb(name),
            // () => alertError('Failed to remove ' + name) 
        )
    },

    rename: service.rename,
    
    downloadMany: (pathname: string, explorer: Explorer) => () => { 
        service.get( 'download/many', { pathname, explorer }, service.downloadBlob, 
            () => null, /* alertError('Failed to prepare files to download') */
            { responseType: 'blob' }
        )
    },
    
    removeSelected: (pathname: string, explorer: Explorer, cb?: () => void) => () => {
        service.get( 'remove/selected', { pathname, explorer }, 
            cb, 
            // () => alertError('Failed to remove files') 
        )
    },
}

export default FileService