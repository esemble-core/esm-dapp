import React from 'react'
import { Store } from '../../../common/Store';
import { idFromUrl } from '../../../utils/WebUtil';
import { fetchTask } from '../../../common/Actions';
import { ITask } from './../../../common/Interfaces';

export default function ShowTask() {
  const { state, dispatch } = React.useContext(Store);
  const task:ITask = state.currentTask;
  //const users = state.currentTask.include; //include node from json

  React.useEffect(() => {
    const loadTask = async() => {
      let taskId = idFromUrl();
      await fetchTask(dispatch, taskId);
    }
    loadTask();
  }, [])

  console.log("here, task:", task.working_on);

  return (
    <div>
      show task
    </div>
  )
}
