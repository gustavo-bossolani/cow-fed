import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryComponent } from './category.component';

import { SectionTitleModule } from '../shared/components/section-title/section-title.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/components/input/input.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { ColorPickerModule } from '../shared/components/color-picker/color-picker.module';
import { NewCategoryComponent } from './new-category/new-category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SectionTitleModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    LoaderModule,
    ColorPickerModule
  ]
})
export class CategoryModule { }
