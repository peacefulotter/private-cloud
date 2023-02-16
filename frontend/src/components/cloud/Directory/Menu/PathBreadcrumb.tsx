
import { FiHome } from 'solid-icons/fi';
import { children, createEffect, createSignal, For, Show } from 'solid-js';
import { A, useRouteData } from 'solid-start';
import { ExplorerRouteData } from '~/types';

const Breadcrumb = (props: any) => {
    const resolved = children(() => props.children)
    return (
        <nav>
            <ol class="flex items-center space-x-2">{resolved()}</ol> 
        </nav>
    );
};

const BreadcrumbSeparator = () => (
    <svg class="text-first h-5 w-5" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
)

interface IBreadcrumbItem {
    href: string; 
    path: string;
    home?: boolean;
}
  
const BreadcrumbItem = ( { home, path, href }: IBreadcrumbItem) => {
    console.log(path, href);
    
    return (
        <>
        <li class='group'>
            <A rel="link" href={href} class="btn transition-colors hover:bg-second hover:text-sixth">
                <Show when={home}><FiHome class="text-second text-xl"/></Show>
                <p class="text-sm font-medium">{ decodeURI( path ) }</p>
            </A>
        </li>
        <BreadcrumbSeparator />
        </>
    );
};

const PathBreadcrumb = () => {
    const { pathname } = useRouteData<ExplorerRouteData>()

    const [unveil, setUnveil] = createSignal<string[]>([]);
    const [navigations, setNavigations] = createSignal<string[]>([]);

    createEffect( () => {
        const unveil = pathname().split('/').slice(2).filter((e) => e !== '')
        const navigations = unveil.reduce( 
            (prev: string[], cur: string) =>
                [...prev, (prev.length > 0 ? prev[prev.length - 1] : '')  + cur + '/']
            , 
            [] as string[]
        )
        setUnveil(unveil);
        setNavigations(navigations);
        
        console.log(unveil, navigations);

    } )

    

    return (
        <Breadcrumb aria-label="breadcrumb">
            <BreadcrumbItem href="/cloud/" home={true} path={"Home"} />
            <For each={unveil()}>
                {(path, i) => 
                    <BreadcrumbItem href={navigations()[i()]} path={path} />
                }
            </For>
        </Breadcrumb>
    )
}

export default PathBreadcrumb;