import { Section } from './section';

export class Course{
    game_id: number;
    game_name: string;
    message: string;
    game_description: string;
    game_published: boolean;
    levels: Array<Section>;
    user_id:number;
}