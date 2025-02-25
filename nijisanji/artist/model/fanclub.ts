
export interface Fanclub { 
    slug: string;
    name: string;
    description: string; 
    iconUrl: string;
    coverImageUrl: string;
    portraitImageUrl: string;
    status: string;
    position: number;
    liverName: string;
    liverNameRuby: string;
    microCmsTalentSlug: string;
    licenses: Array<License>;
}

export interface License {
    slug: string;
    name: string;
    plan: string;
    planValue: number;
    description: string;
    status: string;
    visible: boolean;
}