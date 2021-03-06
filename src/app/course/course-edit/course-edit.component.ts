import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CourseService, Course, User, Section } from 'src/app/core';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  public sectionForm = new FormGroup({
    sectionName: new FormControl('', { validators: Validators.required }),
    description: new FormControl('', { validators: Validators.required })
  });

  constructor(private route: ActivatedRoute, private router: Router, private course: CourseService) { }
  id: number;
  sectionContent: Course;
  newSections: Array<Section> = [];
  createdSection = {} as Section;
  levelCount: number = 0;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'))
    });
    this.getSections(this.id)
  }
  getSections(game_id: number) {
    this.course.getCourse(game_id).subscribe(responseData => {
      this.sectionContent = responseData
      this.levelCount = this.sectionContent.levels.length
      this.sectionContent.levels.sort(function (obj1, obj2) {
        return obj1.weight - obj2.weight;
      })
    });
  }
  createSection(sectionName: string, description: string, contents: any, weight: number) {
    this.course.createSection(sectionName, description, contents).subscribe((responseData) => {
      if (responseData.level_id) {
        this.createdSection.level_id = responseData.level_id
        this.createdSection.level_name = responseData.level_name
        this.createdSection.level_description = responseData.level_description
        this.createdSection.weight = weight
        this.sectionContent.levels.push(this.createdSection)
        this.course.updateCourse(this.id, this.sectionContent.game_name, this.sectionContent.levels, false).subscribe();
        this.levelCount = this.sectionContent.levels.length
      }
    });

  }
  updatePage() {
    window.location.reload();
  }
  deleteLevel(levelId: number) {
    this.course.deleteSection(levelId).subscribe();
    window.location.reload();
  }
  editLevel(id) {
    this.router.navigate(['/section-edit', id]).then((e) => {
    });
  }
  weightSwap(valUp: number, valDown: number) {
    let tmp = valUp
    if (valUp => 1 && valUp < this.sectionContent.levels.length) {
      this.sectionContent.levels[valUp].weight = valDown
      this.sectionContent.levels[valDown].weight = tmp
      this.sectionContent.levels.sort(function (obj1, obj2) {
        return obj1.weight - obj2.weight;
      })
    }
  }
  onSubmit() {
    this.createSection(this.sectionForm.value.sectionName, this.sectionForm.value.description, null, this.levelCount);
    //console.log(this.sectionForm.value.weight)
    this.sectionForm.reset();
    this.getSections(this.id);
  }

}
