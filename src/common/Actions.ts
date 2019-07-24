import _ from "lodash";
import { toast } from "react-toastify";
import { ActionType } from "./Store";
import Axios from "axios";
import { Dispatch, ITask } from './Interfaces';

export const notify = (msg: string, success?: boolean) => {
  !success ? toast(msg) : toast.success(msg, { autoClose: false });
};

export const notifyError = (msg: string) => {
  toast.error(msg, { autoClose: false });
};

export const notifyWarn = (msg: string) => {
  if (!toast.isActive("nfId")) {
    toast.warn(msg, { toastId: "nfId" });
  }
};


export const fetchUserForEthAddr = async(dispatch: Dispatch, ethAccount: string) => {
  const result = await Axios(
    `/api/v1/usersearch?eth_addr=${ethAccount}`
  );

  if (result.data.status==='SUCCESS') {
    dispatch({
      type: ActionType.SET_CURRENT_USER,
      payload: result.data.data
    })
  }else {
    console.log("json return for search did not return a success status");
  }
}


export const addTask = async (dispatch: Dispatch, task: ITask) => {
  const result = await Axios.post(
    "/api/v1/tasks",
    {
      project_id: task.project_id,
      name: task.name
    }
  );
  notify("task added successfully");
}

export const fetchProject = async (dispatch: Dispatch, projectId:number) => {
  try{
    const result = await Axios(
      `/api/v1/projects/${projectId}`, {params: {with_tasks: true}},
    );
      
    dispatch({
      type: ActionType.SET_CURRENT_PROJECT,
      payload: result.data.data
    });
    dispatch({
      type: ActionType.SET_TASKS,
      payload: result.data.include
    });

  }catch (error){
    console.error("Could not connect to server");
    notifyError("Could not connect to server, please try again later");
  }
}


export const fetchProjects = async(dispatch: Dispatch, force: boolean) => {
  try{
    const result = await Axios(
      '/api/v1/projects',
    );

    dispatch({
      type: ActionType.SET_PROJECTS,
      payload: result.data.data
    });

  }catch (error){
      console.error("Could not connect to server");
      notifyError("Could not connect to server, please try again later");
  }
}

export const fetchTasks = async( dispatch: Dispatch, projectId:number, force:boolean) => {

}

export const fetchUsers = async (dispatch: Dispatch, force: boolean) => {
  try{
    const result = await Axios(
      '/api/v1/users',
    );

    dispatch({
      type: ActionType.SET_USERS,
      payload: result.data.data
    });

  }catch (error){
      console.error("Could not connect to server");
      notifyError("Could not connect to server, please try again later");
  }
}
