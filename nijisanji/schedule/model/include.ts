
export interface IncludeRow {
    id: string;
    type: string; // youtube_channel or liver
    attributes: IncludeAttr;
    relationships: any; // 我還不知道要怎麼使用他
}

export interface IncludeAttr {
    external_id?: string;
    name?: string;
    thumbnail_url?: string;
    main?: boolean;
}

