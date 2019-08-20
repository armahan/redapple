import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Contents } from 'src/app/core';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
  public testForm = new FormGroup({
    testName: new FormControl('', { validators: Validators.required }),
    testDescription: new FormControl('', { validators: Validators.required })
  });

  constructor() { }

  @Output() sendTest = new EventEmitter<Contents>();
  @Input() level_id: number;
  @Input() weight:number;

  ngOnInit() {
  }

}
