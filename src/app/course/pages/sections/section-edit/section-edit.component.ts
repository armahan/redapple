import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService, Section } from 'src/app/core';
import { NotifierService } from 'angular-notifier';



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

  private readonly notifier: NotifierService;

  constructor(
    private course: CourseService,
    private route: ActivatedRoute,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService
  }
  id: number;
  section: Section;
  activeContent: boolean = false;
  activeTest: boolean = false;
  updateSection: boolean = false;
  editLevel: boolean = false;
  level_id: number;
  content_id: number;
  test_id: number;
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
      if (responseData) {
        this.notifier.notify("info", responseData.level_name + " is updated!");
      }
    })
  }
  getNewTest($event) {
    this.section.contents.push($event)
    this.updateSection = true
    this.activeTest = !this.activeTest
    this.course.updateSection(this.id, this.section.level_name, this.section.level_description, this.section.contents).subscribe((responseData) => {
      console.log(responseData)
      if (responseData) {
        this.notifier.notify("info", responseData.level_name + " is updated!");
      }
    })
  }
  updateLevel() {
    this.course.updateSection(this.id, this.levelForm.value.levelName, this.levelForm.value.levelDescription, this.section.contents).subscribe((responseData) => {
      console.log(responseData)
      if (responseData) {
        this.notifier.notify("info", responseData.level_name + " is updated!");
      }
    })
    this.editLevel = !this.editLevel
  }
  editEnable() {
    this.editLevel = !this.editLevel
    this.updateSection = !this.updateSection
    this.activeTest = false
    this.activeContent = false
    this.setForm(this.section.level_name, this.section.level_description)
  }
  createContent() {
    this.activeContent = !this.activeContent
    this.activeTest = false
  }
  createTest() {
    this.activeTest = !this.activeTest
    this.activeContent = false
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
        if (responseData) {
          this.notifier.notify("info", responseData.level_name + " is updated!");
        }

      })
    }
  }
  removeContent(val: number) {
    let tmp = val
    for (let content of this.section.contents) {
      if (content.weight === tmp) {
        content.weight = content.weight - 1
        tmp += 1
      }
    }
    this.section.contents.splice(val, 1)
    this.course.updateSection(this.id, this.section.level_name, this.section.level_description, this.section.contents).subscribe((responseData) => {
      console.log(responseData)
    })
    this.notifier.notify("warning", " Content is removed!!!");
  }

}
