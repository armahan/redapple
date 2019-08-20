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
  linkStatus: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id = Number(params.get('id'))
    });
    this.getCourseContent(this.id)
  }

  getCourseContent(game_id:number){
    this.courseSection.getCourse(game_id).subscribe(responseData=>{
      this.courseContent = responseData
      console.log(this.courseContent)
    });
  }

  getSectionContent(section_id:number){
    this.courseSection.getSection(section_id).subscribe(responseData=>{
      this.sectionContent = responseData
      console.log(this.sectionContent)
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

}
