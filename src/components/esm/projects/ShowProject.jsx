import React from 'react'
import { fetchProject, notifyWarn, workOnTask } from '../../../common/Actions';
import { Card, Button, List } from 'antd';
import AddTask from './AddTask';
import { Store } from '../../../common/Store';
import useLoadUser from '../users/useLoadUser';
import { idFromUrl } from '../../../utils/WebUtil';
import { appendedLookup, EN, FUNDING_KEY } from '../../../common/Lookup';



export default function ShowProject(props) {
  const { state, dispatch } = React.useContext(Store);
  const project = state.currentProject;
  const tasks = state.tasks;
  const [showAddTasks, setShowAddTasks] = React.useState(false);
  
  useLoadUser();
  const user = state.currentUser;

  
  React.useEffect(() => {
    const loadProj = async() => {
      let projectId = idFromUrl();
      await fetchProject(dispatch, projectId);
    }
    loadProj();
  }, [])
  
  
  return (
    <React.Fragment>
      <div className="antDDefault">
        <Card title="Projects" bordered={false} > 
            <p>Name: {project.name}</p>
            <p>Description: {project.description}</p>
            <p>Funding: {appendedLookup(EN, FUNDING_KEY, project.funding)}</p>
            <p>Lifecycle: {appendedLookup(EN, FUNDING_KEY, project.lifecycle)}</p>
        </Card>
      </div>
      
      <div className="antDDefault">
        <Card title="Tasks for Project" bordered={false}> 

        <List
          header="Tasks"
          bordered
          dataSource={tasks}
          renderItem={item => (
            <List.Item 
              key={item.id}
            >
              <p className="strong-p">{item.name}</p> 
              { !item.done ?
                <React.Fragment>
                  <Button
                    className="ml-auto"
                    type="dashed"
                    onClick={async () => {
                      //if they just added task, it will be ther in state, but not 
                      //have hit the server, so it won't have id (until refresh/refetch)
                      if (item.id===undefined){
                        notifyWarn("This task can not currently be worked on, it may be too new (try refreshing screen).");
                      }
                      
                      await workOnTask(dispatch, user, item);
                    }}
                    >
                    Work on
                  </Button>
                  <Button
                    className="ml-auto"
                    type="dashed"
                    onClick={()=> {
                        window.location = `/task/${item.id}`
                      }}
                    >
                  View
                  </Button>
                </React.Fragment>
                :
                <p className="ml-auto">Complete</p>
              }  
           
            </List.Item>
          )}
        />    


        <Button
            type="dashed"
            onClick={ () => {
              console.log("adding task")
              setShowAddTasks(true);
            }}
          >
             Add
          </Button>
        </Card>
      </div>
      {showAddTasks ? <AddTask projectId={project.id} /> : ''}
    </React.Fragment>
  )
}


/*
import { List, Avatar, Button, Skeleton } from 'antd';

import reqwest from 'reqwest';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

ReactDOM.render(<LoadMoreList />, mountNode);


.demo-loadmore-list {
  min-height: 350px;
}

*/
