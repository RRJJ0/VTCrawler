import { Props } from "./props";

export interface NUJIJson {
    props: PageInfo
    buildId: string
}

export interface PageInfo {
    pageProps: Props
}
