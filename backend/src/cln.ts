import fs from "fs";
import { getFiletype, translateFile } from "./utils/file";

import { scanf, colors } from "./utils/iostream";

class CommandLine {
  protected filename: string;
  protected file: string;
  protected filetype: string;
  protected commands: Array<string>;

  public constructor() {
    console.log("running on command line");

    this.commands = process.argv;

    this.setFileName(this.commands);
  }

  public getFilename(): string {
    return this.filename;
  }

  public setFileName(command: Array<string>): void {
    const CMD = "-file";

    if (!command.includes(CMD)) {
      console.log("Arquivo não especificado");

      this.askNewFileName();
    } else {
      // this.filename = command["-file"];
      command.map((i, j) => {
        if (i === CMD) {
          this.filename = command[++j];
          console.log(
            colors.Bright,
            colors.fg.Green,
            `Reading ${this.filename}`,
            colors.Reset,
            colors.fg.White
          );
        }
      });
    }

    this.findFile();
    return null;
  }

  private askNewFileName(): void {
    scanf(
      "Escolha o local do arquivo ou aperte a letra 'c' para parar: \n"
    ).then(res => {
      if (res === "c") {
        process.exit();
      }

      if (res === "" || null || undefined) {
        process.exit();
      }

      this.findFile();
    });

    return null;
  }

  public findFile(): void {
    fs.readFile(this.filename, (err, res) => {
      if (err) {
        console.log(colors.bg.Red, "file not found", colors.bg.Black);
        process.exit();
      }

      this.file = res.toString();
      this.filetype = getFiletype(this.filename);
      translateFile(this.filename, this.file);
    });
  }
}

export default CommandLine;
