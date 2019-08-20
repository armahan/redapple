import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArchwizardModule } from 'angular-archwizard';
import { QuillModule } from 'ngx-quill';
import { KatexModule } from 'ng-katex';

import { CourseRoutingModule } from './course-routing.module';
import { CoreModule } from '../core';
import {
    ContentComponent,
    SectionComponent,
    QuizComponent,
    SectionEditComponent,
    ContentEditComponent,
    QuizEditComponent,
    QuestionComponent,
    QuestionEditComponent
} from './pages';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseSideBarComponent } from './course-side-bar/course-side-bar.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { QuestionsComponent } from './pages/quizes/questions/questions.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        KatexModule,
        CoreModule,
        CourseRoutingModule,
        ArchwizardModule,
        QuillModule.forRoot({
            modules: {
                syntax: false,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }, 'formula'],      // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean'],                                         // remove formatting button

                    ['link', 'image', 'video']
                ]
            }
        })
    ],
    declarations: [CourseComponent,
        CourseDetailComponent,
        CourseCreateComponent,
        CourseSideBarComponent,
        CourseEditComponent,
        ContentComponent,
        ContentEditComponent,
        SectionComponent,
        SectionEditComponent,
        QuizComponent,
        QuizEditComponent,
        QuestionsComponent,
        QuestionComponent,
        QuestionEditComponent],
    exports: [CourseComponent,
        CourseDetailComponent,
        CourseCreateComponent,
        CourseSideBarComponent,
        CourseEditComponent,
        ContentComponent,
        ContentEditComponent,
        SectionComponent,
        SectionEditComponent,
        QuizComponent,
        QuizEditComponent,
        QuestionsComponent,
        QuestionComponent,
        QuestionEditComponent],
    providers: []
})


export class CourseModule { }