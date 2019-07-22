import React from 'react'
import ShowProject from '../components/esm/projects/ShowProject';

export default function Project(props:any) {
  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Project Details</h3>
        <div className="heading-underline"></div>
          <ShowProject />
      </div>
    </div>
  </div>
  )
}
