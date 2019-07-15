import React from "react";
import useReactWeb3 from "../../chainstate/useReactWeb3";
import axios from "axios";
import { Card, Input, Button } from "antd";

export default function AddUserToRPC() {
  const ethAccount = useReactWeb3();
  const [user, setUser] = React.useState({});
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const getUser = async () => {
      console.log("getting user for acct:", ethAccount);
      const result = await axios(
        `/api/v1/usersearch?eth_addr=${ethAccount}`
      );

      if (result.data.status==='SUCCESS') {
        setUser(result.data);
        setUserName(result.data.data.name)
      }else{
        setUser({});
        setUserName('');
      }
    };

    if (ethAccount) {
      getUser();
    }
  }, [ethAccount]);

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Card title="Add User" bordered={false}>
        <p className="strong-p">Enter details for new user</p>
        <Input
          id="add-user-input"
          className="form-control"
          placeholder="User name"
          value={userName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { name, value }: any = e.target;
            setUserName(value);
          }}
        />
        <div className="row">
          <Button
            type="dashed"
            onClick={async () => {
              const result = await axios.post(
                "/api/v1/users",
                {
                  eth_addr: ethAccount,
                  name: userName,
                  uuid: "a-b-c-d"
                }
              );
            }}
          >
            Create User
          </Button>
        </div>
      </Card>
    </div>
  );
}

/*
 const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
*/
