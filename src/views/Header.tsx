import React from 'react';
import Logo from "./../img/esemble6.png";

export default function Header() {
  return (
    <React.Fragment>
       <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="/"><p className="logo-text"><img className="logo" src={Logo}/></p></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarResponsive">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/projects">Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/proposals">Proposals</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/voting">Voting</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin">Admin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/test">Test</a>
                </li>
              </ul>
            </div>
        </nav>
    </React.Fragment>
  )
}
