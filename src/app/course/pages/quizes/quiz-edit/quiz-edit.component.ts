import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Contents } from 'src/app/core';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {

  constructor() { }

  @Output() sendTest = new EventEmitter<Contents>();
  @Input() level_id: number;
  @Input() weight:number;

  ngOnInit() {
  }

}
