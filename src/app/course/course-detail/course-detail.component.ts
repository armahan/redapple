import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotifierService } from "angular-notifier";

import { CourseService, Course, AuthService } from '../../core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(
    private route: ActivatedRoute, 
    private course: CourseService,
    private authService: AuthService,
    private router: Router,
    notifierService: NotifierService
    ) { 
      this.notifier = notifierService;
    }
  gameId : number;
  sectionContent:Course;
  
  ngOnInit() {
    if(this.authService.getToken()){
      this.route.paramMap.subscribe((params:ParamMap)=>{
        this.gameId = Number(params.get('id'))
      });
      this.getSections(this.gameId)
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
      if(responseData){
        this.notifier.notify("success", responseData.message);
      }
    });
  }
}
