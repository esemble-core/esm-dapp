import React from 'react'
import { Card } from 'antd';

export default function Products() {
  return (
    <div className="jumbotron">
    <div className="narrow">
      <div className="col-12">
        <h3 className="heading text-center">Products</h3>
        <div className="heading-underline"></div>
        <div className="antDDefault">
        <Card title="Products" bordered={false} >
         <p>Products are under development by the community and coming soon!</p>
        </Card>
        </div>
      </div>
    </div>
  </div>
  )
}
