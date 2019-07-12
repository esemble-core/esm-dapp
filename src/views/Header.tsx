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
                  <a className="nav-link" href="/get_involved">get involved</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/projects">projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/products">products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/stay_in_touch">stay in touch</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/how_it_works">how it works</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/my_profile">my profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin">admin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/test">test</a>
                </li>
              </ul>
            </div>
        </nav>
    </React.Fragment>
  )
}
