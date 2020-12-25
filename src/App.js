import './scss/App.scss';
import { connect } from 'react-redux';
import { addNode, changeAlert, getNodes, removeNode } from './redux/nodesReducer';
import { useEffect } from 'react';
import Header from './components/header/header';
import NodesList from './components/nodesList/nodesList';
import Alert from './components/alert/alert';
import AddNodeForm from './components/addNode/addNode';
import { compose } from 'redux';
import { Route, withRouter } from 'react-router-dom';
import Information from './components/information/Information';

function App(props) {
  
  useEffect(()=>{
    props.getNodes()
  }, [])


  const onSubmit = (formData) =>{
    props.addNode(
      {
        title:formData.node,
        date: new Date().toJSON()
        })
  }

  return (
    <div className="wrapper">
      <Header/>
      <Route path='/' exact render={()=>(
      <>
        {(props.alert.show) && <Alert alert={props.alert} changeAlert={props.changeAlert}/>}
        <AddNodeForm onSubmit={onSubmit} {...props}/>
        <NodesList nodes={props.nodes} removeNode={props.removeNode} changeAlert={props.changeAlert}/>
      </>)} 
       />
       <Route path='/info' exact render={()=><Information/>} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  nodes: state.data.nodes,
  alert: state.data.alert
})

export default compose(
  withRouter,
  connect(mapStateToProps, {getNodes,removeNode, changeAlert, addNode})
)(App)

