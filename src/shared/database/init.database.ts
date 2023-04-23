import { DATABASE_CONFIG_OPTIONS, DATABASE_CONFIG_URI } from '../config';
import { Sequelize } from 'sequelize';

class Database {
  public connection!: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(
      DATABASE_CONFIG_URI,
      DATABASE_CONFIG_OPTIONS
    );
  }
}

const database: Database = new Database();
(async () => {
  try {
    await database.connection.authenticate();
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
})();

export default database;
