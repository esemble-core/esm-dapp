import React from 'react'
import AllUsers from '../components/esm/users/AllUsers';
import RPCStatus from '../components/admin/RPCStatus';


export default function Admin() {
  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Admin</h3>
        <div className="heading-underline"></div>

        <RPCStatus />

        <AllUsers />
        
      </div>
    </div>
  </div>
  )
}

