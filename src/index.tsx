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
import Projects from './views/Projects';
import Profile from './views/Profile';
import Admin from './views/Admin';
import GetInvolved from './views/GetInvolved';
import Products from './views/Products';
import StayInTouch from './views/StayInTouch';
import HowItWorks from './views/HowItWorks';
import Project from './views/Project';
import Task from "./views/Task";


const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

ReactDOM.render(
  <StoreProvider>
      <Router>
        <App path="/">        
            <RouterPage pageComponent={<Main />} path="/" />
            <RouterPage pageComponent={<GetInvolved />} path="/get_involved" />
            <RouterPage pageComponent={<Projects />} path="/projects" />
            <RouterPage pageComponent={<Project />} path="/project/:id" />
            <RouterPage pageComponent={<Task />} path="/task/:id" />
            <RouterPage pageComponent={<Products />} path="/products" />
            <RouterPage pageComponent={<StayInTouch />} path="/stay_in_touch" />
            <RouterPage pageComponent={<HowItWorks />} path="/how_it_works" />
            <RouterPage pageComponent={<Profile />} path="/my_profile" />    
            <RouterPage pageComponent={<Admin />} path="/admin" />
            <RouterPage pageComponent={<Test />} path="/test" />  
        </App>
      </Router>
  </StoreProvider>,
  document.getElementById("root")
);
