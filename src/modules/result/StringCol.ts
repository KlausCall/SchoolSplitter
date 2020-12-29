import { Column } from "./Column";

export class StringCol extends Column<string> {

  value(row: any): string {
    return row[this.prop] as string;
  }
  compareVal(a: string, b: string): number {
    return a.localeCompare(b);
  }

}
