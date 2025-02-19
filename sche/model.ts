
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

export class Artist {
    public id: number;
    public name: string;
    public imageUrl: string;

    constructor(id: number, name: string, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}