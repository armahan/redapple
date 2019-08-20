import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CourseService, Courses, Course, User } from './../../core';


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  constructor(private course:CourseService, private router: Router) { }

  createNew : Boolean;
  getLoadCourse: Courses;
  course_name:Course;
  createCourseForm: FormGroup;
  ngOnInit() {
    this.createNew = false;
    this.getCoursesByUser()
    
  }

  getCoursesByUser(){
    this.course.getCourseByUserId().subscribe((responseData)=>{
      if(responseData){
        this.getLoadCourse = responseData
      }
    })
  }

  deleteCourse(courseId:number){
    this.course.deleteCourse(courseId).subscribe((responseData)=>{
      console.log(responseData)
    })
    this.ngOnInit();
  }

  createForm(){
    this.createNew = !this.createNew
    this.createCourseForm = new FormGroup({
      courseName: new FormControl('', Validators.required),
      courseDescription: new FormControl('', Validators.required)}
    )

  }

  createCourse(name, description){
    this.course.createCourse(name, description).subscribe((responseData)=>{
      if(responseData){this.goCourseEdit(responseData.game_id)}
    });
  }

  onSubmit(){
    this.createCourse(this.createCourseForm.value.courseName, this.createCourseForm.value.courseDescription)
  }

  goCourseEdit(id) {
    this.router.navigate(['/course-edit', id]).then( (e) => {
    });
  }
}
