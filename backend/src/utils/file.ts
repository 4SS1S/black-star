import xlsx from "./xlsx";
import sql from "./sql";

const SQL = new sql();

function getFiletype(filename: string): string {
  return (/[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined)[0];
}

function translateFile(filename: string, filedata: Buffer): Object {
  let json_obj: Object;

  switch (getFiletype(filename)) {
    case "xlsx":
      json_obj = xlsx(filedata);
      break;

    default:
      return;
      break;
  }

  return json_obj;
}

function convertFile(
  filename: string,
  jsondata: Array<Object>,
  model?: Array<String>
): string {
  switch (getFiletype(filename)) {
    case "json":
      return JSON.stringify(jsondata);
      break;

    case "sql":
      return SQL.table(jsondata, model);
      break;
  }

  return null;
}

export { getFiletype, translateFile, convertFile };
