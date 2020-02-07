import xlsx from "./xlsx";

function getFiletype(filename: string): string {
  return (/[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined)[0];
}

function translateFile(filename: string, filedata: String): void {
  switch (getFiletype(filename)) {
    case "xlsx":
      xlsx(filedata);
      break;

    default:
      return;
      break;
  }

  return;
}

export { getFiletype, translateFile };
