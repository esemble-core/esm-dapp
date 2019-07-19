import React from 'react'

export default function ShowProject(props:any) {
  const [project, setProject] = React.useState({});

  React.useEffect(() => {
    const loadProj = async() => {
      let url = new String(window.location);
      let projectId = url.split("/").pop();
      
    }
    loadProj();
  }, [])
  
  

  return (
    <div>
      ShowProject
    </div>
  )
}
