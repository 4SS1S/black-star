import express from "express";
import cors from "cors";
import langs, { Legends } from "./langs";

import routes from "./routes";

class App {
  protected express: express;
  protected app: express.Application;

  public constructor() {
    const PORT = 3333;

    this.app = express();
    this.middlewares();

    this.app.listen(PORT, () => {
      langs(Legends.starting).then(e => console.log(`${e} ${PORT}`));
    });
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }
}

export default App;
