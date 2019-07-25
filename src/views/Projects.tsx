import React from 'react'
import AllProjects from '../components/esm/projects/AllProjects';
import AddProjectToRPC from '../components/esm/projects/AddProjectToRPC';
import { Button, Card } from 'antd';

export default function Projects() {
  const [propose, setPropose] = React.useState(false);

  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Projects</h3>
        <div className="heading-underline"></div>
        <AllProjects />
        <div style={{ background: "#ECECEC", padding: "30px" }}>
            <Button
            type="dashed"
            onClick={() => {
              setPropose(true);
            }}
            >
           Propose A Project
          </Button>
          </div>
         {propose ? <AddProjectToRPC /> : ''}
      </div>
    </div>
  </div>
  )
}
