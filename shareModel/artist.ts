

export class Artist {
    public id: number | string;
    public avatar: string;
    public jpName: string;
    public enName: string;
    public slogan: string;
    public introduction: string;
    public style: Array<string>;
    public video: string;
    public audio: string;
    public relatedLinks: Array<RelatedLink>;
    
    
    constructor(id: number | string, avatar: string, jpName: string, enName: string, slogan: string, introduction: string, style: Array<string>, video: string, audio: string, relatedLinks: Array<RelatedLink>) {
        this.id = id;
        this.avatar = avatar;
        this.jpName = jpName;
        this.enName = enName;
        this.slogan = slogan;
        this.introduction = introduction;
        this.style = style;
        this.video = video;
        this.audio = audio;
        this.relatedLinks = relatedLinks;
    }
}

export class RelatedLink {
    public name: string;
    public url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}