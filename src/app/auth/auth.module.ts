import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CoreModule } from '../core';
import { RegisterComponent, LoginComponent, UserComponent } from './pages';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        CoreModule,
        AuthRoutingModule
    ],
    declarations:[AuthComponent, RegisterComponent, LoginComponent, UserComponent],
    exports:[AuthComponent, RegisterComponent, LoginComponent, UserComponent],
    providers: []
})

export class AuthModule{}