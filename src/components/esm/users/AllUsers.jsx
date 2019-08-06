import React from 'react'
import { Card, List } from 'antd';
import { fetchUsers } from '../../../common/Actions';
import { Store } from '../../../common/Store';


export default function AllUsers() {
  const { state, dispatch } = React.useContext(Store);
  const usersArray = state.users;


  React.useEffect(() => {
    const loadUsers = async() => {
      await fetchUsers(dispatch);
    }
    loadUsers();
  }, []);


  return (
    <div className="antDDefault">
    <Card title="All Users" bordered={false} >
    <List
          header="Users"
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



 
