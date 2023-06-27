import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';

import { AlertType } from 'src/app/shared/components/alert/models/alert.model';
import { AlertService } from 'src/app/shared/components/alert/services/alert.service';
import { Statement } from 'src/app/shared/models/statement/statement.model';

import { CategoryService } from 'src/app/shared/services/category/category.service';
import { StatementService } from 'src/app/shared/services/statement/statement.service';
import { monthValidator } from 'src/app/shared/validators/month-validator/month-validator';

interface NewStatementForm {
  amount: number;
  category: string;
  description: string;
  installment: string;
  title: string;
  startDate: {
    month: string;
    year: string;
  }
}

@Component({
  selector: 'cow-new-statement',
  templateUrl: './new-statement.component.html',
  styleUrls: ['./new-statement.component.sass']
})
export class NewStatementComponent implements OnInit {

  protected options = new Map<string, string>();
  protected isLoading$ = new BehaviorSubject(false);
  protected newStatementForm = this.builder.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(4),
    ]],
    description: ['', [Validators.maxLength(40)]],
    installment: ['', [
      Validators.required,
      Validators.min(1),
    ]],
    startDate: this.builder.group({
      month: ['', [
        Validators.required,
        Validators.minLength(2),
        monthValidator()
      ]],
      year: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.min(2000)
      ]]
    }),
    amount: ['', [Validators.required]],
    category: [''],
  });

  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private statementService: StatementService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  get monthHint(): string {
    const value = this.newStatementForm?.get('startDate')?.get('month')?.value;

    if (!value || value.length <= 1) {
      return 'Ex: 08 Agosto';
    } else {
      const month = new Date(value)
        .toLocaleDateString('pt-BR', { month: 'long' })

      const fixedMonth = month.charAt(0).toUpperCase() + month.slice(1);

      return `Data de inicio previsto para ${fixedMonth}.`;
    }
  }

  protected handleCreateStatement(): void {
    const form: NewStatementForm = this.newStatementForm.value as any;

    const amount = Number(form.amount);
    const installment = Number(form.installment);

    const request: Statement = {
      amount,
      installment,
      title: form.title,
      startDate: this.getFormDate()
    }

    if (form.description) {
      request.description = form.description;
    }

    if (form.category) {
      request.categoryId = form.category;
    }

    this.isLoading$.next(true);
    this.statementService.createStatement(request)
      .pipe(
        tap(() => this.newStatementForm.disable()),
        finalize(() => this.isLoading$.next(false))
      )
      .subscribe({
        next: () => {
          this.newStatementForm.reset();
          this.newStatementForm.enable();
          this.alertService.openAlert({
            type: AlertType.SUCCESS,
            message: 'Seu apontamento foi criado e está disponivel nas sessões gerais.'
          });
        },
        error: () => {
          this.newStatementForm.enable();
          this.newStatementForm.setErrors({ systemError: true });
        }
      });
  }

  private getCategories(): void {
    this.newStatementForm.get('category')?.disable();
    this.categoryService.getCategories()
      .pipe(
        tap(
          categories =>
            categories.forEach(category => this.options.set(category.id, category.name))
        )
      )
      .subscribe({
        next: () => this.newStatementForm.get('category')?.enable(),
        error: _ => {
          const categoryControl = this.newStatementForm.get('category');
          categoryControl?.setErrors({ fetchError: true });
          categoryControl?.disable();
        }
      });
  }

  private getFormDate(): string {
    const startDate = this.newStatementForm.get('startDate')?.value;
    return `${startDate?.year}-${startDate?.month}-01`;
  }

}
