import { Component, Input, OnChanges } from '@angular/core';

import { CourseService, Test } from 'src/app/core';

export interface SelectedAnswer{
  [index:number]:string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnChanges {

  constructor(private courseTest: CourseService) { }

  @Input() testId: number;
  test: Test;
  testLenght : number;
  answers:Array<SelectedAnswer>=[];
  trueAnswers:number;
  resultActive : boolean = false;

  ngOnInit() {
    if (this.testId) {
      this.getQuiz(this.testId)
      
    }
  }

  ngOnChanges() {
    if (this.testId) {
      this.getQuiz(this.testId)
    }
  }
  
  selectedAnswer(event:any){
    if(this.answers.indexOf(event.target.name)){
      this.answers[event.target.name] = event.target.value
    }
    else{
      this.answers.push(event.target.name,event.target.value)
    }
  }

  getQuiz(quizId: number) {
    this.courseTest.getQuiz(quizId).subscribe((responseData) => {
      this.test = responseData
      this.testLenght = this.test.questions.length
      this.answers = []
      this.trueAnswers = 0
    });
  }

  testResult(){
    this.resultActive = true;
    for(let answer of this.answers){
      if(answer === "true"){
        this.trueAnswers++
      }
    }
  }

  resetTest(){
    this.resultActive = false;
    this.answers = []
    this.trueAnswers = 0
  }
}
