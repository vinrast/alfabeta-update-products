import database from "./init.database";

export class TransactionBuilder {
  private sequelize = database.connection;

  private constructor() {};

  private async build(){
    return this.sequelize.transaction();
  };

  public static async build() {
    const transactionInstance = new TransactionBuilder();
    return await transactionInstance.build();
  };
};
