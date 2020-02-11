import express from "express";
import cors from "cors";

import routes from "./routes";

class App {
  protected app: express.Application;

  public constructor() {
    const PORT = 3333;

    this.app = express();
    this.middlewares();

    this.app.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}`);
    });
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }
}

export default App;
