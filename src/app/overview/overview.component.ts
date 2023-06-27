import { AfterViewInit, Component } from '@angular/core';
import { ReplaySubject, finalize, tap } from 'rxjs';


import { OverviewService } from '../shared/services/overview/overview.service';
import { Chart, Dataset, options } from '../shared/models/charts/chart.model';
import { OverviewAll } from '../shared/models/overview/overview-all.model';

@Component({
  selector: 'cow-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent implements AfterViewInit {

  protected pendingStatementsWithInstallmentPlan = 0;
  protected amount = 0;
  protected totalPendingStatements = 0;
  protected isLoading = false;
  protected dataset$ = new ReplaySubject<Chart>();
  protected options = options;

  private _dataset: Chart = {
    labels: [],
    datasets: [],
  };

  constructor(
    private overviewService: OverviewService
  ) { }

  ngAfterViewInit(): void {
    this.populateOverview();
  }

  protected get message(): string {
    const month = new Date()
      .toLocaleDateString('pt-BR', { month: 'long' })

    return `Apontamentos referentes ao mês de ${month}, somados com os meses seguintes.`;
  }

  private populateOverview(): void {
    this.overviewService.overviewAll()
      .pipe(
        tap(() => this.isLoading = true),
        tap(({ statementsPerCategory }) =>
          statementsPerCategory
            .forEach(item => this._dataset.labels.push(item.category))
        ),
        tap(response => this.fillDataset(response)),
        tap(response => this.countAllStatementWithInstallmentPlan(response)),
        tap(response => this.fillChartTitle(response)),
        tap(response => this.countTotalPendingStatements(response)),
        tap(() => this.dataset$.next(this._dataset)),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        error: () => this.options.plugins.title.text = 'Ocorreu um erro, tente novamente mais tarde.'
      });
  }

  private fillDataset({ statementsPerCategory }: OverviewAll): void {
    let dataset: Dataset = {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: []
    };

    statementsPerCategory.forEach(item => {
      dataset.data.push(item.quantity);
      dataset.backgroundColor.push(item.color);
      dataset.hoverBackgroundColor.push(item.color);
    });

    this._dataset.datasets.push(dataset);
  }

  private countAllStatementWithInstallmentPlan({ statementsWithInstallment }: OverviewAll): void {
    const { amount, statements } = statementsWithInstallment;
    this.amount = amount;
    this.pendingStatementsWithInstallmentPlan = statements;
  }

  private fillChartTitle({ statementsWithInstallment, statementsPerCategory }: OverviewAll): void {
    const zeroStatements =
      (!statementsWithInstallment.amount && !statementsWithInstallment.statements) && !statementsPerCategory.length;

    if (zeroStatements) {
      this.options.plugins.title.text = 'Você não possui nenhum apontamento';
      this.options.plugins.subtitle.text = '';
    } else {
      this.options.plugins.title.text = 'Apontamentos ainda em aberto';
      this.options.plugins.subtitle.text = 'agrupados por categoria';
    }
  }

  private countTotalPendingStatements({ statementsPerCategory }: OverviewAll): void {
    this.totalPendingStatements =
      statementsPerCategory.reduce((accumulator, item) => accumulator + item.quantity, 0);
  }

}
