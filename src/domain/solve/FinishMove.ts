import { Move } from "./Move";

export class FinishMove extends Move {

  constructor() {
    super(-1, -1 , -1 , 0);
  }

  // revert this move
  public revert() {
    // TODO
  }

}