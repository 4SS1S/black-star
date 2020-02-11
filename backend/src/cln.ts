import fs from "fs";
import { getFiletype, translateFile, convertFile } from "./utils/file";

import Formats from "./utils/formats";
import { scanf, colors } from "./utils/iostream";

class CommandLine {
  protected filename: string;
  protected file: string;
  protected filebuffer: Buffer;
  protected filetype: string;
  protected commands: Array<string>;
  protected output_format: string;
  protected output: string;

  public constructor() {
    console.log("Running on command line");

    this.commands = process.argv;

    this.setFileName(this.commands);
  }

  public getFilename(): string {
    return this.filename;
  }

  public setFileName(command: Array<string>): void {
    const CMD = "--file";

    if (!command.includes(CMD)) {
      console.log("Arquivo não especificado");

      // this.askNewFileName();
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
        if (i === "--output") {
          this.output_format = command[++j];
        }
      });
    }

    return this.filename ? this.findFile() : null;
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

      this.filebuffer = res;
      this.file = this.filebuffer.toString();
      this.filetype = getFiletype(this.filename);

      const output_filetype = getFiletype(this.output_format);
      console.log(output_filetype);

      const file: Object = JSON.stringify(
        translateFile(this.filename, this.filebuffer)
      );

      fs.writeFile(
        this.output_format,
        convertFile(this.output_format, JSON.parse(file)),
        err => {
          if (err) throw err;

          console.log("File saved");
        }
      );

      switch (getFiletype(this.output_format)) {
        case "json":
          fs.writeFile(this.output_format, file, err => {
            if (err) throw err;

            console.log("File saved");
          });
          break;

        default:
          console.log("not output format found");
          break;
      }
    });
  }
}

export default CommandLine;
