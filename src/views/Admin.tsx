import React from 'react'
import AllUsers from '../components/esm/users/AllUsers';

export default function Admin() {
  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Admin</h3>
        <div className="heading-underline"></div>
        <AllUsers />
      </div>
    </div>
  </div>
  )
}
