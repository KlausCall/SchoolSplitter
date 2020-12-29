export abstract class Column<T> {
  readonly prop: string;
  readonly title: string;
  readonly tip?: string;

  constructor(aProp: string, aTitle: string, aTip?: string) {
    this.prop = aProp;
    this.title = aTitle;
    this.tip = aTip;
  }

  abstract value(row: any) : T;

  abstract compareVal(a:T, b:T): number;

  public compare(rowA: any, rowB: any): number {
    return this.compareVal(this.value(rowA), this.value(rowB));
  }

}
