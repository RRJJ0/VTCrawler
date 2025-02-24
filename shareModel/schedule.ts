
export class Content {
    public date: string;
    public contents: ContentRow[];

    constructor(date: string, contents: ContentRow[]) {
        this.date = date;
        this.contents = contents;
    }
}

export class ContentRow {
    public artistId: number; 
    public url: string;
    public imageUrl: string; 
    public time: string;
    
    constructor(artistId: number, url: string, imageUrl: string, time: string) {
        this.artistId = artistId;
        this.url = url;
        this.imageUrl = imageUrl;
        this.time = time;
    }
}