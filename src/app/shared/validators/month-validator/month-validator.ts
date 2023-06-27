import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @description
 * Valida se um mês apontado está entre os 12 meses do calendário,
 * o validador assume de que sempre será enviado no formato em string no seguinte padrão:
 *
 * ```
 * '01' = 'Janeiro'
 * '12' = 'Dezembro'
 * '00' = erro
 * '79' = erro
 * ```
 * Exemplo de retorno
 * ```typescript
 * const control = new FormControl('89', monthValidator());
 *
 * console.log(control.errors); // { invalidMonth: true } mês inválido
 * ```
 */
export function monthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = { invalidMonth: true, actualValue: control.value };
    const inputValue = control.value;

    if (inputValue) {

      if (inputValue === '00') {
        return error;
      }

      return +inputValue > 12 ? error : null;
    } else {
      return null;
    }
  };
}
