import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService, Courses } from '../core';



@Component({
  selector: 'app-course',
  templateUrl: './course-component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(
    private course: CourseService, 
    private router: Router
    ) { }

  courseContent: Courses;
  gameId :number;

  ngOnInit() {
    this.getCourses()
  }
  
  getCourses(){
    this.course.getCourses().subscribe((responseData) => {
      if (responseData) {
        this.courseContent = responseData
      }
    });
  }

  public gotoProductDetails(url, id) {
    this.router.navigate([url, id]).then( (e) => {});
}
}