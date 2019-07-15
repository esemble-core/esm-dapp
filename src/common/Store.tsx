import React from "react";
import {
  IAction,
  IAppState,
} from "./Interfaces";


export enum ActionType {
  SET_ACCOUNT = "esm/SET_ACCOUNT"
}


const initialState: IAppState = {
    ethAddr: ""
};




export const Store = React.createContext<IAppState | any>(initialState);

function reducer(state: IAppState, action: IAction | any): IAppState {
  switch (action.type) {
    case ActionType.SET_ACCOUNT:
      return {
        ...state, ethAddr: action.payload
      }
    default:
      return state;
  }
}


export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}

