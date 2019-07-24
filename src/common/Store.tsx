import React from "react";
import {
  IAction,
  IAppState,
} from "./Interfaces";
import { ninvoke } from "q";


export enum ActionType {
  SET_USERS = "esm/USERS",
  SET_CURRENT_USER = "esm/CURRENT_USER",
  SET_PROJECTS = "esm/PROJECTS",
  SET_CURRENT_PROJECT = "esm/CURRENT_PROJECT",
  SET_TASKS = "esm/TASKS",
  ADD_TASK = "esm/ADD_TASK"
}


const initialState: IAppState = {
    users: [],
    currentUser: {},
    projects: [],
    currentProject: {},
    tasks: [],
};


export const Store = React.createContext<IAppState | any>(initialState);

function reducer(state: IAppState, action: IAction | any): IAppState {
  switch (action.type) {
    case ActionType.SET_USERS:
      return {
        ...state, users: action.payload
      }
      case ActionType.SET_CURRENT_USER:
        return {
          ...state, currentUser: action.payload
      }
    case ActionType.SET_PROJECTS:
      return {
        ...state, projects: action.payload
      }
    case ActionType.SET_CURRENT_PROJECT:
      return {
        ...state, currentProject: action.payload
      }
    case ActionType.ADD_TASK:
      return {
        ...state, tasks: [...state.tasks, action.payload]
      }
    case ActionType.SET_TASKS:
      return {
        ...state, tasks: action.payload
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

