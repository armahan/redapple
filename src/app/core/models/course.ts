import { Section } from './section';

export class Course{
    game_id: number;
    game_name: string;
    game_description: string;
    levels: Array<Section>;
    user_id:number;
}