import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider} from "./common/Store";
import { Router, RouteComponentProps } from "@reach/router";
import "antd/dist/antd.css";
import './bootstrap.min.css';
import './fixed.css';
import './style.css';

import Main from "./views/Main";
import Test from './views/Test';
/*import SoSes from './views/SoSes';
import Users from './views/Users';
import Providers from './views/Providers';
import Skills from "./views/Skills";*/
import Projects from './views/Projects';
import Proposals from './views/Proposals';
import Voting from './views/Voting';
import Profile from './views/Profile';
import Admin from './views/Admin';



const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

ReactDOM.render(
  <StoreProvider>
      <Router>
        <App path="/">        
            <RouterPage pageComponent={<Main />} path="/" />
            <RouterPage pageComponent={<Projects />} path="/projects" />
            <RouterPage pageComponent={<Proposals />} path="/proposals" />
            <RouterPage pageComponent={<Voting />} path="/voting" />
            <RouterPage pageComponent={<Profile />} path="/profile" />
            <RouterPage pageComponent={<Admin />} path="/admin" />
            <RouterPage pageComponent={<Test />} path="/test" />  
        </App>
      </Router>
  </StoreProvider>,
  document.getElementById("root")
);
