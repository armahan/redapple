import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';

import { CourseService, Question, Subject } from 'src/app/core';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  questionForm:FormGroup;
  optionsArray:FormArray;
  subjects: Subject;

  constructor(private fb: FormBuilder, private course: CourseService) { }

  @Output() sendQuestion = new EventEmitter<Question>();

  ngOnInit() {
    this.getSubjects()
    this.questionForm= this.fb.group({
      questionCode: new FormControl('', {validators: Validators.required}),
      subject: new FormControl('', {validators: Validators.required}),
      question: new FormControl('', {validators: Validators.required}),
      optionsArray: this.fb.array([this.createOption()])
    })
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.questionForm.value);
  }
  createOption(): FormGroup {
    return this.fb.group({
      answer: '',
      isTrue: false
    });
  }
  addAnswer(): void {
    this.optionsArray = this.questionForm.get('optionsArray') as FormArray;
    this.optionsArray.push(this.createOption());
  }
  removeAnswer(i){
    this.optionsArray.removeAt(i)
  }
  getSubjects(){
    this.course.getSubjects().subscribe((responseData)=>{
      this.subjects = responseData
    })
  }
}
