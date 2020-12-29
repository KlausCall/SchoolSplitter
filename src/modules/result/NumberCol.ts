import { Column } from "./Column";

export class NumberCol extends Column<number> {

  value(row: any): number {
    return row[this.prop] as number;
  }

  compareVal(a: number, b: number): number {
    return a - b;
  }

}
