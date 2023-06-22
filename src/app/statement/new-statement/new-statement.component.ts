import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cow-new-statement',
  templateUrl: './new-statement.component.html',
  styleUrls: ['./new-statement.component.sass']
})
export class NewStatementComponent implements OnInit {

  protected newStatementForm = this.builder.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(4),
    ]],
    description: ['', [ Validators.maxLength(40) ]],
    installment: ['', [
      Validators.required,
      Validators.min(1),
    ]],
    startDate: ['', [ Validators.required ]],
    amount: ['', [ Validators.required ]],
    category: [''],
  });

  options: { key: string, value: string }[] = [];

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.options.push({key:'', value: 'Outros'});
    this.options.push({key:'5400cc35-f874-4c77-a156-8578be31941e', value: 'Comida'});
    this.options.push({key: '934fca07-2a87-4f82-bc4c-13f7dbbf1497', value: 'Hardware'});
    this.options.push({key: 'df226a15-91cc-4ea0-9d11-5f2bd4fcb340', value: 'Serviços digitais'});
  }

  handlePasswordChange() {
    console.log(this.newStatementForm.value);
  }

}
