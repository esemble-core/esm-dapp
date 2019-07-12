import React from 'react'
import { Card, List } from 'antd';


export default function AllUsers(props) {
 
  const [usersArray, setUsersArray] = React.useState([]);

  React.useEffect(() => {
    console.log("loading from api");
    fetch('http://localhost:3210/api/v1/users')
      .then(response => response.json())
      .then(json => setUsersArray(json.data))
      .catch(error => console.error(error))
  }, []);


  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="All Users" bordered={false} >
    <List
          header="All Users"
          bordered
          dataSource={usersArray}
          renderItem={item => (
            <List.Item 
              key={item.eth_addr}
            >
              <p className="strong-p">{item.name}</p>    
              <p>{" | "}{item.eth_addr}</p>         
            </List.Item>
          )}
        />    
    </Card>
  </div>
  )
}



 
