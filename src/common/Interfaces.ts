
/**
|--------------------------------------------------
|  Interfaces
|--------------------------------------------------
*/
export type Dispatch = React.Dispatch<IAction>;


export interface IAppState {
  projects: Array<IProject>;
  users: Array<IUser>;
}

export interface IUser {
  id: number;
  name: string;
  description: string;
  email: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  funding: number;
  lifecycle: number;
}

export interface ITask {
  name: string;
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

