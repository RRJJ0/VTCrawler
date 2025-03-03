import { Event } from "./event";
import { Steam } from "./steam";

export interface VSPOJson {
    props: PageInfo
    buildId: string
}

export interface PageInfo {
    pageProps: PageProps
}

export interface PageProps {
    events: Event[];
    livestreams: Steam[];
}