import React from 'react'
import ShowProject from '../components/esm/projects/ShowProject';

export default function Project(props:any) {
  
  console.log("Project.props", props);
  
  return (
    <React.Fragment>
      <ShowProject />
    </React.Fragment>
  )
}
