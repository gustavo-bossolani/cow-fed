import { Component, Attribute, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'cow-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, Validator {

  @Input()
  disabled!: boolean;

  protected control!: FormControl;
  protected onTouched = (_: any) => { };

  private innerValue: string = '';
  private onChange = (_: any) => { };

  constructor(
    @Attribute('placeholder')
    protected placeholder: string,

    @Attribute('type')
    protected type: string
  ) { }

  set value(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): string {
    return this.innerValue;
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
