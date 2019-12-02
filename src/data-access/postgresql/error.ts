interface Message {
  message: string;
}

export class BadRequestError extends Error {
  public name: string;
  public noData: boolean;
  public details: Message[];
  constructor(message: string) {
    super(message);
    this.noData = true;
    this.details = [
      {
        message,
      },
    ];
    this.name = "NoDataError";
  }
}
