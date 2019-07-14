import React from 'react'
import useReactWeb3 from '../../chainstate/useReactWeb3';


export default function AddUserToRPC() {
  const ethAccount = useReactWeb3();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getUser = async() => {
      console.log("getting user for acct:", ethAccount);
    }

    if (ethAccount){
      getUser();
    }
  }, [ethAccount]);


  return (
    <div>
      
    </div>
  )
}


/*
 const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
*/