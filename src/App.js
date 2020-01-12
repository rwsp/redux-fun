import React from 'react';
import { World} from "./World";
import {useSelector} from "react-redux";


const _Test = (props) => {
  return props.lists.map(l => <div>{l}</div>)
};

const App = (props) => {
  const lists = useSelector( state => state.lists);
  return (
      <div>
        <button onClick={() => props.addList('test list f')}>click</button>
        <_Test lists={lists}/>
      </div>
  );
};

export default App;
