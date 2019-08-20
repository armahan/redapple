import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CourseService, Subject, Contents } from 'src/app/core';




@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.css']
})
export class ContentEditComponent implements OnInit {
  public contentForm = new FormGroup({
    contentName: new FormControl('', {validators: Validators.required}),
    content: new FormControl('', {validators: Validators.required}),
    subjectSearch : new FormControl('', {validators: Validators.required})
  });
  equation:string;
  subjects: Subject;
  createdContent : Contents;
  @Output() sendContent = new EventEmitter<Contents>();
  @Input() level_id: number;
  @Input() weight:number;
  @Input() content_id:number;
  constructor(private course: CourseService) { }

  ngOnInit() {
    this.getSubjects()
    if(this.content_id){
      this.course.getContent(this.content_id).subscribe((responseData)=>{
        this.setContentForm(responseData.content_name, responseData.content, responseData.subject_id)
      })
    }
  }
  getSubjects(){
    this.course.getSubjects().subscribe((responseData)=>{
      this.subjects = responseData
    })
  }
  setContentForm(content_name:string, content:string, subject:number){
    this.contentForm.patchValue({
      contentName:content_name,
      content:content,
      subjectSearch:subject
    });
  }
  createContent(subject:number, content_name:string, content:string){
    this.course.createContent(subject, content_name, content).subscribe((responseData)=>{
      this.createdContent = responseData
      this.createdContent.level_id = this.level_id
      this.createdContent.weight = this.weight
      this.sendContent.emit(this.createdContent)
      })
      this.contentForm.reset()
  }
  updateContent(id:number, subject:number, content_name:string, content:string){
    this.course.updateContent(id, subject, content_name, content).subscribe((responseData)=>{
      console.log(responseData)
    })
    this.contentForm.reset()
  }
  onSubmit(){
    if(this.content_id){
      this.updateContent(this.content_id, this.contentForm.value.subjectSearch, this.contentForm.value.contentName, this.contentForm.value.content)
    }else{
      this.createContent(this.contentForm.value.subjectSearch, this.contentForm.value.contentName, this.contentForm.value.content)
    }
  }
}
