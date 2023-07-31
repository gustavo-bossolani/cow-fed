import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, fromEvent } from 'rxjs';
import { AlertType } from 'src/app/shared/components/alert/models/alert.model';

import { AlertService } from 'src/app/shared/components/alert/services/alert.service';
import { CategoryService, CreateCategoryRequest } from 'src/app/shared/services/category/category.service';

import { IsCategoryNameExistValidator } from 'src/app/shared/validators/category-name-validator/category-name-validator';

@Component({
  selector: 'cow-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.sass']
})
export class NewCategoryComponent implements OnDestroy, OnInit {
  private subscriptions: Subscription[] = [];

  protected isLoading$ = new BehaviorSubject(false);
  protected newCategoryForm = this.builder.group({
    name: [
      '',
      [Validators.required],
      [IsCategoryNameExistValidator.createValidator(this.categoryService)]
    ],
    color: ['#002F61', [Validators.required]]
  });

  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    const searchEvent = fromEvent<CustomEvent<void>>(window, IsCategoryNameExistValidator.IsValidatingAsync)
      .subscribe(() => this.isLoading$.next(true));

    const completeEvent = fromEvent<CustomEvent<void>>(window, IsCategoryNameExistValidator.IsValidationAsyncFinished)
      .subscribe(() => this.isLoading$.next(false));

    this.subscriptions.push(searchEvent);
    this.subscriptions.push(completeEvent);
  }

  protected handleCreateCategory(): void {
    this.isLoading$.next(true);
    this.categoryService.createCategory(this.newCategoryForm.value as CreateCategoryRequest)
      .subscribe({
        next: () => {
          this.isLoading$.next(false);
          this.newCategoryForm.reset();
          this.alertService.openAlert({
            type: AlertType.SUCCESS,
            message: 'Criada com sucesso.'
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.newCategoryForm.setErrors({ internalError: true });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
