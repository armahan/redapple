import { Component, Input, OnChanges } from '@angular/core';

import { CourseService, Content } from 'src/app/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnChanges {

  constructor(private courseContent: CourseService) { }

  @Input() contentId : number;
  content:Content;

  ngOnChanges(){
    if (this.contentId){
      this.getContent(this.contentId)
      console.log(this.contentId)
    }
  }
  getContent(contentId:number){
    this.courseContent.getContent(contentId).subscribe((responseData)=>{
      this.content = responseData
      console.log(responseData)
    });
  }
}
