import { LevelSlicer } from "./LevelSlicer";
import { Move } from "./Move";

export class ModeSwitchMove extends Move {

  constructor() {
    super(-1, -1 , -1 , 0);
  }

  // revert this move
  public revert(slicer: LevelSlicer) {
    slicer.revertModeSwitch();
  }

}