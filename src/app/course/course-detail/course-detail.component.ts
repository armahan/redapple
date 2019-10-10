import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CourseService, Course, AuthService } from '../../core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private course: CourseService,
    private authService: AuthService,
    private router: Router
    ) { }
  gameId : number;
  sectionContent:Course;
  
  ngOnInit() {
    if(this.authService.getToken()){
      this.route.paramMap.subscribe((params:ParamMap)=>{
        this.gameId = Number(params.get('id'))
      });
      this.getSections(this.gameId)
      console.log(this.gameId)
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  getSections(game_id:number){
    this.course.getCourse(game_id).subscribe(responseData=>{
      this.sectionContent = responseData
    });
  }

  courseSubscribe(gameId:number){
    this.course.subscribeCourse(gameId).subscribe(responseData=>{
      console.log(responseData)
    });
  }
}
