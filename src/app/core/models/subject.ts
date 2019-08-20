import {Content} from './content';

export class Subject {
    subject_id: number;
    parent_id: number;
    subject_name: string;
    contents: Array<Content>;  
}
