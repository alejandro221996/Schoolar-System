import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: "[Cart] - LoadCart from cookies | storage" }
  | { type: "[Cart] - Add Product"; payload: ICartProduct };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
      };

    default:
      return state;
  }
};
