import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService, Course, Section } from 'src/app/core';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor(private courseSection: CourseService, private route: ActivatedRoute) { }
  
  courseContent: Course;
  sectionContent: Section;
  contentId: number;
  testId:number;
  id : number;
  contentOfStartId = 0;
  linkStatus: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id = Number(params.get('id'))
    });
    this.getCourseContent(this.id);
   
  }

  getCourseContent(game_id:number){
    this.courseSection.getCourse(game_id).subscribe(responseData=>{
      this.courseContent = responseData
      this.getSectionContent(this.courseContent.levels[0].level_id)
    });
  }

  getSectionContent(section_id:number){
    this.courseSection.getSection(section_id).subscribe(responseData=>{
      if(responseData){
        this.sectionContent = responseData
        this.sectionContent.contents.sort(function (obj1, obj2) {
          return obj1.weight - obj2.weight;
        })
        if(this.sectionContent.contents[0].content_id){
          this.goToContent(this.sectionContent.contents[0].content_id)
        }else{
          this.goToTest(this.sectionContent.contents[0].test_id)
        }
        
      }
    });
  }
  gotoSectionDetails(section_id:number){
    this.getSectionContent(section_id)
  }
  goToContent(contentId:number){
    this.contentId = contentId
    this.testId = null
  }
  goToTest(testId:number){
    this.testId = testId
    this.contentId = null
  }
  myProgress(){

  }
}
