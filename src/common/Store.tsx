import React from "react";
import {
  IAction,
  IAppState,
} from "./Interfaces";


export enum ActionType {
  SET_PROJECTS = "esm/PROJECTS",
  SET_USERS = "esm/USERS",
}


const initialState: IAppState = {
    projects: [],
    users: []
};




export const Store = React.createContext<IAppState | any>(initialState);

function reducer(state: IAppState, action: IAction | any): IAppState {
  switch (action.type) {
    case ActionType.SET_PROJECTS:
      return {
        ...state, projects: action.payload
      }
    case ActionType.SET_USERS:
      return {
        ...state, users: action.payload
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

