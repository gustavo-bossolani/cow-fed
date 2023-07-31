import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of, delay, switchMap, tap, finalize } from 'rxjs';

import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category/category.model';

export class IsCategoryNameExistValidator {

  static readonly IsValidatingAsync = 'async-validation-category-name-exists';
  static readonly IsValidationAsyncFinished = 'async-validation-category-name-exists-complete';

  /**
   * @description
   * Valida se o nome indicado no campo existe cadastrado na base de categoria
   *
   * @param categoryService
   * serviço de categoria disponivel em `shared/services/category`
   *
   * @type CategoryService
   *
   * @usageNotes
   *
   * ### Basta incluir o validador no espaço de validadores assincronos
   *
   * ```typescript
   * const control = new FormControl('', [Validators.required], [IsCategoryNameExistValidator.createValidator(categoryService)])

   * // caso a base devolva 200 (item já cadastrado) é devolvido
   * console.log(control.errors); // {categoryAlreadyExists: true}
   *
   * // caso ocorra algum erro interno no serviço é devolvido
   * console.log(control.errors); // {internalError: true}
   * ```
   *
   * @returns Erro de `{categoryAlreadyExists: true}` caso o nome exista,
   * Erro de `{internalError: true}` caso ocorra erro interno no servidor,
   * retorna `null` em caso de nome não cadastrado e resposta OK.
   *
   */
  static createValidator(categoryService: CategoryService): AsyncValidatorFn {

    const dispatchAsyncValidationEvent = () => {
      const closeEvent = new CustomEvent<void>(IsCategoryNameExistValidator.IsValidatingAsync);
      window.dispatchEvent(closeEvent);
    };

    const dispatchCompleteAsyncValidationEvent = () => {
      const closeEvent = new CustomEvent<void>(IsCategoryNameExistValidator.IsValidationAsyncFinished);
      window.dispatchEvent(closeEvent);
    };

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value)
        .pipe(
          delay(1000),
          tap(() => dispatchAsyncValidationEvent()),
          switchMap(
            name =>
              categoryService
                .getCategoryBy({ keySearch: 'name', value: name })
                .pipe(
                  map((result: Category) =>
                    result ? { categoryAlreadyExists: true } : null
                  ),
                  catchError(() => of({ internalError: true })),
                  finalize(() => dispatchCompleteAsyncValidationEvent())
                )
          )
        )
    };
  }
}
