interface Alert {
  type: AlertType;
  message: string;
}

enum AlertType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success'
}

export { Alert, AlertType };
