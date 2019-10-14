import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';

import { CourseService, Question, Subject, Option } from 'src/app/core';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  questionForm:FormGroup;
  options:FormArray;
  subjects: Subject;
  question: Question;
  editMode:Boolean = false;

  constructor(private fb: FormBuilder, private course: CourseService) { }

  @Output() sendQuestion = new EventEmitter<Question>();
  @Input()  questionId : number;
  ngOnInit() {
    this.getSubjects()
    this.createQuestionForm()
    if(this.questionId){
      this.getQuestion(this.questionId)
      this.editMode = !this.editMode
    }else{
      this.createQuestionForm()
    }
  }
  
  onSubmit() {
    this.course.createQuestion(this.questionForm.value.questionCode, this.questionForm.value.subject, this.questionForm.value.question, this.questionForm.value.options).subscribe((responseData)=>{
      console.log(responseData)
      this.question = responseData
      this.sendQuestion.emit(this.question)
    })
    window.location.reload();
  }
  updateQuestion(){
    this.course.updateQuestion(this.questionId, this.questionForm.value.questionCode, this.questionForm.value.subject, this.questionForm.value.question, this.questionForm.value.options).subscribe();
  }
  createQuestionForm(){
    this.questionForm= this.fb.group({
      questionCode: new FormControl('', {validators: Validators.required}),
      subject: new FormControl('', {validators: Validators.required}),
      question: new FormControl('', {validators: Validators.required}),
      options: this.fb.array([])
    })
  }
  setQuestionForm(qcode:string, qsubject:number, qquest:string, optionsArray:Array<Option>){
    this.questionForm.patchValue({
      questionCode: qcode,
      subject:qsubject ,
      question: qquest
    });
    this.loadAnswers(optionsArray)
  }
  createOption(): FormGroup {
    return this.fb.group({
      answer: '',
      is_true: false
    });
  }
  initOption(option:Option): FormGroup {
    return this.fb.group({
      answer: option.answer,
      is_true: option.is_true
    });
  }
  loadAnswers(option:Array<Option>){
    this.options = this.questionForm.get('options') as FormArray;
    option.map(item=>{
      this.options.push(this.initOption(item));
    });
    this.questionForm.setControl('options', this.options)
  }
  addAnswer(): void {
    this.options = this.questionForm.get('options') as FormArray;
    this.options.push(this.createOption());
  }
  removeAnswer(i){
    this.options.removeAt(i)
  }
  getSubjects(){
    this.course.getSubjects().subscribe((responseData)=>{
      this.subjects = responseData
    })
  }
  getQuestion(id:number){
    this.course.getQuestion(id).subscribe((responseData)=>{
      this.question = responseData
      console.log(this.question)
      this.setQuestionForm(this.question.code, this.question.subject_id, this.question.question, this.question.options)      
    })
  }
}
