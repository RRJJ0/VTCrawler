

export interface DataRow {
    id: string;
    type: string; 
    attributes: DataAttr;
    relationships: YTChannelData; 
}

export interface DataAttr {
    title: string;
    description: string;
    url: string;
    thumbnail_url: string;
    start_at: string;
    end_at: string;
    status: string;
}

export interface YTChannelData { 
    youtube_channel: YTChannel;
    youtube_events_livers: YTLivers; 
}

export interface YTChannel {
    data: YTData;
}

export interface YTLivers {
    data: Array<YTData>;
}

export interface YTData {
    id: string;
    type: string;
}