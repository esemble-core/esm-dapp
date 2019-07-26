import React from 'react'
import { Store } from '../../../common/Store';
import { idFromUrl } from '../../../utils/WebUtil';
import { fetchTask } from '../../../common/Actions';

export default function ShowTask() {
  const { state, dispatch } = React.useContext(Store);
  const task = state.currentTask;
  const users = state.currentTask.include; //include node from json

  React.useEffect(() => {
    const loadTask = async() => {
      let taskId = idFromUrl();
      await fetchTask(dispatch, taskId);
    }
    loadTask();
  }, [])

  return (
    <div>
      show task
    </div>
  )
}
