
interface OverviewAll {
  statementsPerCategory: StatementsPerCategory[];
  statementsWithInstallment: StatementsWithInstallment;
}

interface StatementsPerCategory {
  color: string;
  category: string;
  quantity: number;
}

interface StatementsWithInstallment {
  statements: number;
  amount: number;
}

export { OverviewAll,StatementsPerCategory,  StatementsWithInstallment};
