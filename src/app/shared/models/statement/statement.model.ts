interface Statement {
  title: string;
  description?: string;
  installment: number;
  /**
   * Formato mês-ano
   * @example '12-2020'
   */
  startDate: string;
  amount: number;
  categoryId?: string;
}

export { Statement };
