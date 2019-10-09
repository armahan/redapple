import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CourseService, Subjects, Subject } from 'src/app/core';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private course: CourseService ) { }
  subjects : Subject;
  subjectForm: FormGroup;
  
  ngOnInit() {
    this.createSubjectForm()
    this.getSubjects()
  }

  getSubjects(){
    this.course.getSubjects().subscribe(responseData=>{
      this.subjects = responseData
    })
  }
  createSubjectForm(){
    this.subjectForm = new FormGroup({
      subjectName: new FormControl('', Validators.required)}
    )
  }
  onSubmit(){
    this.course.createSubject(this.subjectForm.value.subjectName, null).subscribe();
    this.subjectForm.reset()
  }
}
