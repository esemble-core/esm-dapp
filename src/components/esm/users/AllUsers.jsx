import React from 'react'
import { Card, List } from 'antd';
import axios from 'axios';


export default function AllUsers(props) {
 
  const [usersArray, setUsersArray] = React.useState([]);

  React.useEffect(() => {
    const loadUsers = async() => {
      console.log("loading users from api");
      const result = await axios(
        'http://localhost:3210/api/v1/users',
      );
      setUsersArray(result.data.data);
    }
    loadUsers();
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



 
