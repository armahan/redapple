import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Contents, CourseService, Questions, Test, Question } from 'src/app/core';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
  public testForm = new FormGroup({
    testName: new FormControl('', { validators: Validators.required })
  });

  constructor(private course: CourseService) { }

  @Output() sendTest = new EventEmitter<Contents>();
  @Input() level_id: number;
  @Input() test_id: number;
  @Input() weight: number;
  createTest: Test;
  createdTest: Contents;
  createdTestId: number;
  editTest: boolean = false;
  activeNewQuestion: boolean = false;
  myQuestions: Questions;
  questionId:number;

  ngOnInit() {
    if (this.test_id) {
      this.editTest = true
      this.getTest(this.test_id)
    }
    this.course.getUserQuestions().subscribe((responseData) => {
      this.myQuestions = responseData
      console.log(this.myQuestions)
    })
  }
  createTestName() {
    this.createQuiz(this.testForm.value.testName)
    this.editTest = true
  }
  updateTest() {
    console.log(this.createdTest)
    if(this.testForm.valid){
      this.updateQuiz(this.createdTest.test_id, this.testForm.value.testName, this.createdTest.questions)
    }else{
      this.updateQuiz(this.createdTest.test_id, this.createdTest.test_name, this.createdTest.questions)
    }
    
  }
  createQuiz(testName: string) {
    this.course.createQuiz(testName).subscribe((responseData) => {
      this.createdTest = responseData
      this.createdTest.level_id = this.level_id
      this.createdTest.weight = this.weight
      this.sendTest.emit(this.createdTest)
    })
  }
  updateQuiz(testId: number, testName: string, questions: Array<Question>) {
    this.course.updateQuiz(testId, testName, questions).subscribe();
  }
  editEnable() {
    this.editTest = false
  }
  setTestForm(testName: string) {
    this.testForm.patchValue({
      testName: testName
    })
  }
  getTest(val: number) {
    this.course.getQuiz(val).subscribe((responseData) => {
      this.createdTest = responseData
      this.createdTest.level_id = this.level_id
      this.createdTest.weight = this.weight
      this.setTestForm(this.createdTest.test_name)
    })
  }
  addQuestion(question: any) {
    let index = this.myQuestions.questions.indexOf(question)
    this.createdTest.questions.push(question)
    this.myQuestions.questions.splice(index, 1)
  }
  removeQuestion(question: any) {
    let index = this.createdTest.questions.indexOf(question)
    this.createdTest.questions.splice(index, 1)
  }
  editQuestion(val:number){
    this.questionId = val
    this.activeNewQuestion = !this.activeNewQuestion
  }
  createQuestion() {
    this.activeNewQuestion = !this.activeNewQuestion
  }

  getNewQuestion($event) {
    this.createdTest.questions.push($event)
    this.updateQuiz(this.createdTest.test_id, this.createdTest.test_name, this.createdTest.questions)
  }
}
