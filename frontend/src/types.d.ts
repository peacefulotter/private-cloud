import { Accessor, Setter } from "solid-js";

export interface User {
    id: number;
    username: string;
    password: string;
}

export type UploadState = 'disabled' | 'loaded' | 'uploading' | 'complete'

export type Explorer = FileOrFolder[];

export interface FileOrFolder {
    name: string;
    selected: boolean;
    type: 'file' | 'folder'
}

export interface FileOrFolderWithIndex extends FileOrFolder {
    i: number;
} 

export interface FolderServiceContext {
    downloadOne: (name: string) => void;
    removeOne: (name: string) => void;
    rename: (i: number, newName: string) => void;
    create: () => void;
}

export interface FileServiceContext {
    downloadOne: (name: string) => void;
    removeOne: (name: string) => void;
    rename: (i: number, newName: string) => void;
}

export interface ExplorerRouteData {
    explorer: Accessor<Explorer>;
    setExplorer: Setter<Explorer>;
    isSelecting: Accessor<boolean>;
    setSelecting: Setter<boolean>;
    toggleSelectExplorer: (i: number) => () => void;
    sortExplorer: (cb: (prev: Explorer) => Explorer) => void;
    upload: (files: File[], progress: (e: ProgressEvent) => void, cb: () => void, err: () => void) => void;
    removeSelected: () => void;
    downloadSelected: () => void;
    folderService: FolderServiceContext;
    fileService: FileServiceContext;
    pathname: string;
}
