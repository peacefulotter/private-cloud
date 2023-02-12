import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Explorer } from "~/types";

const HOST = 'localhost'
const PORT = 3001

// TODO: wrong proxy
const proxy = {
    host: HOST,
    port: PORT
}

const formHeader = { "Content-Type": "multipart/form-data" }

export default (prefix: string) => { 

    const buildURL = (prefix: string, path: string) => `http://${HOST}:${PORT}` + prefix + path

    const responseHandler = <T>( url: string, cb?: (res: T) => void ) => ( { status, data }: AxiosResponse<T>) => {
        console.log(status, url);
        if ( cb ) cb(data) 
    }

    const get = <T>( path: string, params: any, cb?: (res: T) => void, err?: (res: T) => void, config?: AxiosRequestConfig<T> ) =>
    {
        const url = buildURL( prefix, path );
        return axios
            .get<T>( url, { ...config, params, proxy } )
            .then( responseHandler(url, cb) )
            .catch( responseHandler(url, err) )
    }

    const post = <T>( path: string, data: FormData, config: AxiosRequestConfig<any>, cb?: (res: T) => void, err?: (res: T) => void ) =>
    {
        const url = buildURL( prefix, path );
        axios
            .post<T>( url, data, { ...config, headers: formHeader, proxy } )
            .then( responseHandler(url, cb) )
            .catch( responseHandler(url, err) )
    }

    const downloadBlob = (blob: any) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const id =  'download-link'
        link.setAttribute('id', id)
        link.setAttribute("download", 'files.zip');
        document.body.appendChild(link);
        link.click();
    }

    const rename = (explorer: Explorer, sortExplorer: (cb: (prev: Explorer) => Explorer) => void, pathname: string) => (i: number, newName: string) => {
        const oldName = explorer[i].name;
        get<string>( 'rename', { pathname, oldName, newName }, () => {
            const temp = [...explorer];
            temp[i].name = newName;
            sortExplorer( _ => temp )
        } )
    }

    return { get, post, rename, downloadBlob }
}