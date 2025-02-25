

export interface Liver {
    id: string
    slug: string
    name: string
    enName: string
    profile: Profile
    images: Images
    subscriberCount: number
    orderByRuby: number 
    orderByEnName: number
}

export interface Profile {
    affiliation: Array<string>
    debutAt: string
}

export interface Images {
    head: Image
}

export interface Image {
    url: string
    width: number
    height: number
}