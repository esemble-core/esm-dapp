import _ from "lodash";
import { toast } from "react-toastify";
import { ActionType, Store } from "./Store";
import Axios from "axios";
import { Dispatch, ITask, IUser, IProject, IVerifiableTaskEvent } from './Interfaces';
import React from 'react';
import { async } from "q";

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


export const submitEvent = async (dispatch: Dispatch, event: IVerifiableTaskEvent) => {
  const result = await Axios.post(
    "/api/v1/create_task_event",
    {
      attachment_link_text: event.attachment_link_text,
      task_id: event.task_id,
      event_type_id: event.event_type_id
    });

      dispatch({
          type: ActionType.ADD_EVENT,
          payload: event
        })
    /* Refetch, issue with event objects json in currentTask */
    //await fetchTask(dispatch, event.task_id.toString());

    notify("information submitted");
  return result;
}

export const fetchEventTypes = async (dispatch: Dispatch) => {
  const result = await Axios.get('/api/v1/task_event_types');
  dispatch({
    type: ActionType.SET_EVENT_TYPES,
    payload: result.data.task_event_types
  });
}


export const proposeProject = async(project: IProject) => {
  const result = await Axios.post(
    "/api/v1/projects",
    {
      lifecycle: 1,
      name: project.name,
      description: project.description,
      funding: project.funding
    });
    notify("project proposal submitted successfully");
  return result;
}


export const fetchTask = async(dispatch: Dispatch, taskId: string| undefined) => {
  console.log("fetchTask()");
  const result = await Axios.get(
    `/api/v1/tasks/${taskId}`
  );
  dispatch({
    type: ActionType.SET_CURRENT_TASK,
    payload: [result.data.task, result.data.users_working_on, result.data.task_fundings, result.data.events]
  })
}



export const workOnTask = async (dispatch: Dispatch, user: IUser, task: ITask) => {
  if (user===undefined || user.id === undefined){
    notifyError("Please register on the \"my profile\" page and log into meta mask to be able to work on this task");
    return;
  }
  //console.log("work on task, for user.id: ", user.id, " taskid: ", task.id);
  const result = await Axios.post(
      "/api/v1/user_working_on_task",
      {
        user_id: user.id,
        task_id: task.id
      }
    );
  notify("User added to work on this task");
}


export const addUser = async (dispatch: Dispatch, user: IUser) => {
  if (user === undefined){
    notifyWarn("user was not available to process, please log into meta mask before registering");
    return;
  }

  if (user.eth_addr===undefined || user.eth_addr===''){
    notifyWarn("The Meta Mask user was not available. Please log in (or register) with Meta Mask.");
    return;
  }

  if (user.name===undefined || user.name===''){
    notifyWarn("You must provide a desired user name");
    return;
  }

  if (user.email===undefined || user.email===''){
    notifyWarn("You must provide your email address");
    return;
  }

  const result = await Axios.post(
    "/api/v1/users",
    {
      eth_addr: user.eth_addr,
      name: user.name,
      email: user.email,
      uuid: "a-b-c-d"
    }
  );
  dispatch({
    type: ActionType.SET_CURRENT_USER,
    payload: user
  })
  notify("user added successfully");
}


export const fetchUserForEthAddr = async(dispatch: Dispatch, ethAccount: string) => {
  const result = await Axios(
    `/api/v1/usersearch?eth_addr=${ethAccount}`
  );

  if (result.data.status==='SUCCESS') {
    dispatch({
      type: ActionType.SET_CURRENT_USER,
      payload: result.data.user
    })
  }else {
    dispatch({
      type: ActionType.SET_CURRENT_USER,
      payload: {}
    })
    //console.log("json return for search did not return a success status for fetch user");
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
  dispatch({
    type: ActionType.ADD_TASK,
    payload: task
  });
  notify("task added successfully");
}

export const fetchProject = async (dispatch: Dispatch, projectId:number) => {
  try{
    const result = await Axios(
      `/api/v1/projects/${projectId}`, {params: {with_tasks: true}},
    );
      
    dispatch({
      type: ActionType.SET_CURRENT_PROJECT,
      payload: result.data.project
    });
    dispatch({
      type: ActionType.SET_TASKS,
      payload: result.data.tasks
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
      payload: result.data.projects
    });

  }catch (error){
      console.error("Could not connect to server");
      notifyError("Could not connect to server, please try again later");
  }
}


export const fetchUsers = async (dispatch: Dispatch, force: boolean) => {
  try{
    const result = await Axios(
      '/api/v1/users',
    );

    dispatch({
      type: ActionType.SET_USERS,
      payload: result.data.users
    });

  }catch (error){
      console.error("Could not connect to server");
      notifyError("Could not connect to server, please try again later");
  }
}


export const generateTestProject = async(prefix: string) => {
  console.log("Action.generateTestProject(), for prefix:", prefix);
  let proj: IProject = {
    name: `${prefix}-project name`,
    description: `${prefix}-project description`,
    funding: 3,
    lifecycle: 1
  }
  let projResult = await proposeProject(proj);
  let projectId = projResult.data.project.id;
  console.log("project result, data payload, id", projectId);
  
  const result = await Axios.post(
    "/api/v1/tasks",
    {
      project_id: projectId,
      name: `${prefix} task one`
    }
  );
  notify("task one submitted successfully");
  console.log("task creation result,", result.data.task.id);
  let taskId = result.data.task.id;
  
  const resultUser = await Axios.get('/api/v1/users/1');
  
  if (resultUser.data.user.id > 0){
    const resultWorking = await Axios.post(
      "/api/v1/user_working_on_task",
      {
        user_id: 1,
        task_id: taskId
      }
    );
    notify("user working on, added");
  }else {
    notifyWarn("could not add user_working_on, since user id=1 was not found");
  }

  const resultFundings = await Axios.post(
    "/api/v1/task_fundings/",
    {
      token_address: '0x2956356cd2a2bf3202f771f50d3d14a367b48070', 
      token_name: 'Ethereum', 
      token_symbol: 'ETH', 
      amount: 5, 
      task_id: taskId
    }
  );

  const resultFundings2 = await Axios.post(
    "/api/v1/task_fundings/",
    {
      token_address: '0x2956356cd2a2bf3202f771f50d3d14a367b48070', 
      token_name: 'Ethereum', 
      token_symbol: 'ETH', 
      amount: 20, 
      task_id: taskId
    }
  );
  notify("task fundings added");

  const resultTaskEvent = await Axios.post(
    "/api/v1/create_task_event/",
    {
      attachment_link_test: 'http://linksomewhere.co',
      event_type: 1,
      task_id: taskId
    }
  );
  notify("task event added");
 
  //event verifications
}