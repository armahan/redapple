import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SectionComponent, SectionEditComponent } from './pages';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';

const routes: Routes = [
  { path: 'courses', component: CourseComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path:'course-create', component: CourseCreateComponent},
  { path:'course-edit/:id', component: CourseEditComponent},
  { path: 'section/:id', component: SectionComponent },
  { path: 'section-edit/:id', component: SectionEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CourseRoutingModule { }