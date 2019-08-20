import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core';
import { HeaderComponent, FooterComponent, HomeComponent } from './layout';





@NgModule({
    imports:[CommonModule,RouterModule, CoreModule],
    declarations:[HomeComponent, HeaderComponent, FooterComponent],
    exports:[HomeComponent, HeaderComponent, FooterComponent]
})

export class SharedModule{}