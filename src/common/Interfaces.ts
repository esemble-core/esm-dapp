
/**
|--------------------------------------------------
|  Interfaces
|--------------------------------------------------
*/
export type Dispatch = React.Dispatch<IAction>;


export interface IAppState {
  users: Array<IUser>;
  currentUser: IUser |any;
  projects: Array<IProject>;
  currentProject: IProject |any;
  tasks: Array<ITask>;
  currentTask: ITask |any;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  uuid?: string;
  eth_addr: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  funding: number;
  lifecycle: number;
}

export interface ITask {
  id?: number;
  name: string;
  done?: boolean;
  project_id: number;
  working_on?: Array<IUser>;
  task_fundings?: Array<ITaskFunding>;
}

export interface ITaskFunding {
  id?: number;
  token_address: string;
  token_symbol: string;
  token_name: string;
  amount: number; 
  task_id: number;
}

export interface IAction {
  type: string; //enum from Store.ActionType
  payload: any;
}


export interface ILoomConnectionInfo {
  networkAlias: string;  // LOCAL_DEV | TEST | EXTDEV | PROD
  writeUrl: string;    // 'ws://127.0.0.1:46658/websocket';
  readUrl: string;    //  'ws://127.0.0.1:46658/queryws';
  networkId : string; //  'default' 
}

export interface ILoomObject {
  contract: any;
  client: any;
  privateKey: Uint8Array|any;
  publicKey: Uint8Array|any;
  currentUserAddress: string;
  web3: any;
  instance: any;
  currentNetwork: string;

  connectionInfo: ILoomConnectionInfo|any;
}

