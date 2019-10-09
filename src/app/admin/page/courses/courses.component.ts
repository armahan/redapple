import { Component, OnInit } from '@angular/core';
import { CourseService, Courses } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

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
