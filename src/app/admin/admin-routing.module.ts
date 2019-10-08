import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent, CoursesComponent } from './page';
import { AuthGuard } from '../core';


const routes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'course-list', component: CoursesComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }