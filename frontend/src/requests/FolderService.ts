
import useRequestsService from "./RequestsService"

import { FileOrFolder } from "../types"


const service = useRequestsService('/folder/')

const FolderService = {
    read: (pathname: string, cb: (data: FileOrFolder[]) => void) => {
        service.get( 'read', { pathname }, cb )
    },

    create: (pathname: string, name: string, cb: () => void ) => {
        service.get( 'create', { pathname, name }, cb )
    },

    rename: service.rename,

    removeOne: (pathname: string, cb: (name: string) => void) => (name: string) => {
        service.get('remove', { pathname, name }, () => cb(name) /*, () => alertError('remove folder failed') */ )
    },

    // same as many files
    // TODO: recursive search in folders -> zip
    downloadOne: (pathname: string) => (name: string) => {
        throw new Error('TODO')
        service.get('download', { pathname, name }, undefined, /* () => alertError('download folder failed') */ )
    }
}

export default FolderService;