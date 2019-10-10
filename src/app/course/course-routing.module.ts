import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SectionComponent, SectionEditComponent } from './pages';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { MyCourseComponent } from './my-course/my-course.component';

const routes: Routes = [
  { path: 'courses', component: CourseComponent },
  { path: 'my-courses', component: MyCourseComponent, canActivate: [AuthGuard] },
  { path: 'course/:id', component: CourseDetailComponent, canActivate: [AuthGuard]},
  { path: 'course-create', component: CourseCreateComponent, canActivate: [AuthGuard] },
  { path: 'course-edit/:id', component: CourseEditComponent, canActivate: [AuthGuard] },
  { path: 'section/:id', component: SectionComponent, canActivate: [AuthGuard] },
  { path: 'section-edit/:id', component: SectionEditComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CourseRoutingModule { }