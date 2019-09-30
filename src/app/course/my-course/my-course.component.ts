import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService, Courses } from 'src/app/core';


@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  constructor(
    private course: CourseService, 
    private router: Router
  ) { }
  
  myCourseContent: Courses;
  
  ngOnInit() {
    this.getMyCourses()
  }

  getMyCourses(){
    this.course.getSubscribedCourse().subscribe(responseData=>{
      this.myCourseContent = responseData
    })
  }

  public gotoCourseDetails(url, id) {
    this.router.navigate([url, id]).then( (e) => {});
}
}
