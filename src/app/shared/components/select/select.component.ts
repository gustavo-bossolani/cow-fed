import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'cow-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, Validator {

  @Input()
  options!: { key: string, value: string }[];

  @Input()
  hint!: string;

  @Input()
  disabled!: boolean;

  protected control!: FormControl;
  protected onTouched = (_: any) => { };

  private innerValue: string = '';
  private onChange = (_: any) => { };

  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: FormControl): null {
    if (!this.control) {
      this.control = control;
    }
    return null;
  }

}
