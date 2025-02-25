
export class Content {
    public date: string;
    public contents: ContentRow[];

    constructor(date: string, contents: ContentRow[]) {
        this.date = date;
        this.contents = contents;
    }
}

export class ContentRow {
    public title: string;
    public artists: Array<number | string>; 
    public url: string;
    public imageUrl: string; 
    public time: string;
    
    constructor(title: string, artists: Array<number | string>, url: string, imageUrl: string, time: string) {
        this.title = title;
        this.artists = artists;
        this.url = url;
        this.imageUrl = imageUrl;
        this.time = time;
    }
}