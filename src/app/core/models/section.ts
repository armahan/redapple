
export class Section{
    level_id: number;
    level_name:string;
    level_description:string;
    contents: Array<Contents>;
    weight:number;
}

export interface  Contents{
    level_id:number;
    content_id: number;
    content_name: string;
    content: string;
    test_id:number;
    test_name:string;
    weight: number;
}