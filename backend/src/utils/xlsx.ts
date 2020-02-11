import xlsx, { WorkBook, Sheet } from "xlsx";

export default (buffer: Buffer): Array<Object> => {
  const file: WorkBook = xlsx.read(buffer);
  const SheetNames: string[] = file.SheetNames;

  console.log(SheetNames);
  let data: Array<Object> = [];

  SheetNames.forEach(i => {
    const worksheet: Sheet = file.Sheets[i];
    let headers = {};

    for (let j in worksheet) {
      if (j[0] === "!") continue;

      let tt: number;

      for (let k: number = 0; k < j.length; k++) {
        if (!isNaN(j[k])) {
          tt = k;
          break;
        }
      }

      let col: any = j.substring(0, tt);
      let row: number = parseInt(j.substring(tt));
      let value: String = worksheet[j].v;

      if (row == 1 && value) {
        headers[col] = value;
        continue;
      }

      if (!data[row]) data[row] = {};
      data[row][headers[col]] = value;
    }

    data.shift();
  });

  return data;
};
