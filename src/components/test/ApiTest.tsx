import React from 'react'

export default function ApiTest() {

  React.useEffect(() => {
    console.log("loading from api");
    fetch('http://localhost:3210/api/v1/users')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error))
  }, []);

  return (
    <div>
     <p>Api test</p>
    </div>
  )
}
