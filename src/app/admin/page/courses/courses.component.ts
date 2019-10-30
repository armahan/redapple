import { Component, OnInit } from '@angular/core';
import { CourseService, Courses, Course } from 'src/app/core';
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
  selectedCourse: Course;
  gameId: number;

  ngOnInit() {
    this.getCourses()
  }

  getCourses() {
    this.course.getCourses().subscribe((responseData) => {
      if (responseData) {
        this.courseContent = responseData
      }
    });
  }

  public gotoProductDetails(url, id) {
    this.router.navigate([url, id]).then((e) => { });
  }
  coursePublish(sCourse: Course, isPublished) {
    this.selectedCourse = sCourse
    switch(isPublished){
      case "true":
        isPublished = true
        break
      case "false":
        isPublished = false
        break
    }
    if (this.selectedCourse) {
      this.selectedCourse.game_published = isPublished
      this.course.publishCourse(this.selectedCourse.game_id, this.selectedCourse.game_name, this.selectedCourse.game_description, this.selectedCourse.game_published).subscribe();
     }
  }
}
