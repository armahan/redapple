import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService, Section } from 'src/app/core';



@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})
export class SectionEditComponent implements OnInit {
  public levelForm = new FormGroup({
    levelName: new FormControl('', { validators: Validators.required }),
    levelDescription: new FormControl('', { validators: Validators.required })
  });

  constructor(private course: CourseService, private route: ActivatedRoute) { }
  id: number;
  section: Section;
  activeContent: boolean = false;
  activeTest: boolean = false;
  updateSection: boolean = false;
  editLevel: boolean = false;
  level_id: number;
  content_id: number;
  test_id:number;
  weight: number;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'))
    });
    if (this.id) {
      this.course.getSection(this.id).subscribe((data) => {
        this.section = data
        this.level_id = data.level_id
        this.weight = this.section.contents.length
        this.section.contents.sort(function (obj1, obj2) {
          return obj1.weight - obj2.weight;
        })
      })
    }
  }
  getNewContent($event) {
    this.section.contents.push($event)
    this.updateSection = true
    this.activeContent = !this.activeContent
    this.course.updateSection(this.id, this.section.level_name, this.section.level_description, this.section.contents).subscribe((responseData) => {
      console.log(responseData)
    })
  }
  getNewTest($event) {
    this.section.contents.push($event)
    this.updateSection = true
    this.activeTest = !this.activeTest
    this.course.updateSection(this.id, this.section.level_name, this.section.level_description, this.section.contents).subscribe((responseData) => {
      console.log(responseData)
    })
  }
  updateLevel() {
    this.course.updateSection(this.id, this.levelForm.value.levelName, this.levelForm.value.levelDescription, this.section.contents).subscribe((responseData) => {
      console.log(responseData)
    })
  }
  editEnable() {
    this.editLevel = !this.editLevel
    this.updateSection = !this.updateSection
    this.setForm(this.section.level_name, this.section.level_description)
  }
  createContent() {
    this.activeContent = !this.activeContent
  }
  createTest() {
    this.activeTest = !this.activeTest
  }

  editContent(id: number) {
    this.content_id = id
    this.createContent()
  }
  editTest(id: number) {
    this.test_id = id
    this.createTest()
  }
  setForm(level_name: string, level_description: string) {
    this.levelForm.patchValue({
      levelName: level_name,
      levelDescription: level_description
    });
  }

  weightSwap(valUp: number, valDown: number) {
    let tmp = valUp
    if (valUp => 1 && valUp < this.section.contents.length) {
      this.section.contents[valUp].weight = valDown
      this.section.contents[valDown].weight = tmp
      this.section.contents.sort(function (obj1, obj2) {
        return obj1.weight - obj2.weight;
      })
      this.course.updateSection(this.id, this.section.level_name, this.section.level_description, this.section.contents).subscribe((responseData) => {
        console.log(responseData)
      })
    }
  }
  removeContent(val:number){
   let tmp = val
   for(let content of this.section.contents){
     if(content.weight === tmp){
       content.weight = content.weight - 1
       tmp += 1
     }
   }
   this.section.contents.splice(val,1)
   this.course.updateSection(this.id, this.section.level_name, this.section.level_description, this.section.contents).subscribe((responseData) => {
    console.log(responseData)
  })
  }

}
