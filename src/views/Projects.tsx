import React from 'react'
import AllProjects from '../components/esm/projects/AllProjects';
import AddProjectToRPC from '../components/esm/projects/AddProjectToRPC';

export default function Projects() {
  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Projects</h3>
        <div className="heading-underline"></div>
        <AllProjects />
        <AddProjectToRPC />
      </div>
    </div>
  </div>
  )
}
