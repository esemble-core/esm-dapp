import React from "react";
import {
  IAction,
  IAppState,
  ITask,
} from "./Interfaces";
import { ninvoke } from "q";


export enum ActionType {
  SET_USERS = "esm/USERS",
  SET_CURRENT_USER = "esm/CURRENT_USER",
  SET_PROJECTS = "esm/PROJECTS",
  SET_CURRENT_PROJECT = "esm/CURRENT_PROJECT",
  SET_TASKS = "esm/TASKS",
  ADD_TASK = "esm/ADD_TASK",
  SET_CURRENT_TASK = "esm/CURRENT_TASK",
  SET_EVENT_TYPES = "esm/EVENT_TYPES",
  ADD_EVENT = "esm/ADD_EVENT",
  ADD_VERIFICATION = "esm/ADD_VERIFICATION"
}


const initialState: IAppState = {
    users: [],
    currentUser: {},
    projects: [],
    currentProject: {},
    tasks: [],
    currentTask: {},
    eventTypes: []
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
    case ActionType.SET_CURRENT_TASK:
        let hydratedTask: ITask = action.payload[0];
        hydratedTask.working_on = action.payload[1];
        hydratedTask.task_fundings = action.payload[2];
        //hydratedTask.events = action.payload[3];
          /* Dealing with a server issue of the events not coming as normal json */
        hydratedTask.events = JSON.parse(action.payload[3]);

        return {
          ...state, currentTask: hydratedTask
      }
    case ActionType.SET_EVENT_TYPES:
      return {
        ...state, eventTypes: action.payload
      }
    case ActionType.ADD_EVENT:
      let currentTask: ITask = state.currentTask;

      if (currentTask && currentTask.events){
        currentTask.events.push(action.payload);
        return {
          ...state, currentTask: currentTask
        }
      } else {
        console.error("currentTask or currentTask.events unexpectedly not set in state");
      }
    case ActionType.ADD_VERIFICATION:
        return {
          ...state
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

