import xlsx, { WorkBook } from "xlsx";

export default (data: String): Array<String> => {
  const file: WorkBook = xlsx.read(data, { type: "string" });
  // const SheetNames: string[] = file.SheetNames;

  console.log("sd");

  return [null];
};
