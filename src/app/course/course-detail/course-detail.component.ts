import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService, Course } from '../../core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private course: CourseService) { }
  id : number;
  sectionContent:Course;
  
  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id = Number(params.get('id'))
    });
    this.getSections(this.id)
  }

  getSections(game_id:number){
    this.course.getCourse(game_id).subscribe(responseData=>{
      this.sectionContent = responseData
    });
  }
}
