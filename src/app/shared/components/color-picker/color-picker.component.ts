import { AfterViewInit, Attribute, Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';

import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { debounceTime, delay } from 'rxjs';

@Component({
  selector: 'cow-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements AfterViewInit, ControlValueAccessor, Validator {
  @Input()
  label = 'Escolha uma cor:'

  @Input()
  disabled!: boolean;

  @Input()
  hint!: string;

  @Output()
  onColorChange = new EventEmitter<string>();

  protected control!: FormControl;
  protected onTouched = (_: any) => { };

  private innerValue: string = '';
  private onChange = (_: any) => { };

  set value(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): string {
    return this.innerValue;
  }

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe({
        next: (color) => this.onColorChange.emit(color)
      });
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
