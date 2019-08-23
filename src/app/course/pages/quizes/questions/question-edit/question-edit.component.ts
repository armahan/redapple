import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';

import { CourseService, Question } from 'src/app/core';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  questionForm:FormGroup;
  optionsArray:FormArray;

  constructor(private fb: FormBuilder, private course: CourseService) { }

  @Output() sendQuestion = new EventEmitter<Question>();

  ngOnInit() {
    this.questionForm= this.fb.group({
      questionCode: new FormControl('', {validators: Validators.required}),
      question: new FormControl('', {validators: Validators.required}),
      optionsArray: this.fb.array([this.createOption()])
    })
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
}
