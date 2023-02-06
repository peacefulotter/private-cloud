
export interface SaveResponse {
    name: string;
    saveAs: string;
}

export interface FileOrFolder {
    name: string;
    selected: boolean;
    type: 'file' | 'folder';
}

export type Explorer = FileOrFolder[];