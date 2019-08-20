import { Question} from './question';

export class Test{
    test_id:number;
    test_name:string;
    questions: Array<Question>;
    weight:number;
}