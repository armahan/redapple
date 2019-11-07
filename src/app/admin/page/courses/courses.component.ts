import { Component, OnInit } from '@angular/core';
import { CourseService, Courses, Course } from 'src/app/core';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(
    private course: CourseService,
    notifierService: NotifierService,
    private router: Router
  ) {
    this.notifier = notifierService;
   }

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
      this.course.publishCourse(this.selectedCourse.game_id, this.selectedCourse.game_name, this.selectedCourse.game_description, this.selectedCourse.game_published).subscribe(responseData=>{
        if(responseData){
          this.notifier.notify("info", responseData.game_name + "is changed " + isPublished);
        }
      });
     }
  }
}
