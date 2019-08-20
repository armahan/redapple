import { Option } from './option';

export class Question{
    question_id:number;
    subject_id:number;
    code: string;
    question: string;
    options: Array<Option>;
}