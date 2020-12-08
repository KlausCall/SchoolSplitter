import { LevelSlicer } from "./LevelSlicer";

export class Move {
  public readonly combination: number;
  public readonly from: number;
  public readonly to: number;
  public readonly progress: number;

  constructor(combination: number, from: number, to: number, progress: number) {
    this.combination = combination;
    this.from = from;
    this.to = to;
    this.progress = progress;
  }

  // revert this move
  public revert(slicer: LevelSlicer) {
    // TODO
  }

}
