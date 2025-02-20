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