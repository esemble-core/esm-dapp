import React from "react";
import Header from "./Header";


export default function Main() {
  
  return (
      <React.Fragment>
        <div id="home">
          <Header />
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner">
            </div>
          </div>
        </div>
      </div>
      <div className="caption text-center">
        <h1>esemble</h1>
        <h3>the global creator cooperative</h3>
        <a className="btn btn-outline-light btn-lg" href="#overview">Learn More</a>
      </div>
      <div id="overview" className="offset">
        <div className="col-12 narrow text-center">
          <h1>build it together, own it together</h1>
          <p className="lead">
            esemble uses decentralized technologies (blockchain) and token based
            rewards to enable a global creator cooperative. If you are talented and efficient, we want you as part of the team.
            Come and go as you please, earn based on your contributions and work
            with cool people on interesting projects. If you have been looking to land your passion somewhere, come and try it out. 
            Just pick up a task or make a proposal for the community to work on. We are also trying to make
            this a place where you can learn (and get guidance from others), so there are tasks available for all levels
            of skills and experience. You will be rewarded for resonable attempts, so you can learn and earn. 
            No central owner or company, a true cooperative of creators. For the first time, we own it, we build it.
          </p>
          <a className="btn btn-secondary btn-md" 
            onClick={() => {
              location.assign('/projects');
            }}
          >
          Go to Projects & Tasks</a>
        </div>
      </div>
      <div id="products" className="offset">
        <div className="jumbotron">
          <div className="narrow">
            <div className="col-12">
              <h3 className="heading text-center">Platform Elements</h3>
              <div className="heading-underline"></div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="product">
                  <i className="fas fa-file-invoice fa-4x" data-fa-transform="shrink-3 up-5"></i>
                  <h3>Proposals</h3>
                  <p>Proposals are submitted to be approved by the esemble community to be funded and worked on.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="product">
                  <i className="fas fa-tasks fa-4x" data-fa-transform="shrink-3 up-4.5"></i>
                  <h3>Projects</h3>
                  <p>Tasks and Projects submit a design to the community for review and approval and may have a subsequent build phase which may also
                    require some review, refinement and approval before it is integrated into the platform or a project codebase.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="product">
                  <i className="fas fa-coins fa-4x" data-fa-transform="shrink-3 up-5"></i>
                  <h3>Rewards</h3>
                  <p>Rewards are provided in the form of the ESM (Esemble) token as well as in some cases other crypto tokens can be used as rewards (namely ETH or ERC20 tokens).
                    You get rewarded for completing a task or a project, and will also recieve rewards for making reasonable attepts to complete the work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      </React.Fragment>
  );
}
