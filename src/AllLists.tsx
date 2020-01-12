import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { ListState } from './World';
import {useState} from "react";
import ListCard from "./ListCard";
import {testAddItem01, testAddItem02, testAddList, testRemoveItem01, testRemoveList} from "./reducers";

const AllLists: React.FC = () => {
  // tests
  testAddList();
  testRemoveList();
  testAddItem01();
  testAddItem02();
  testRemoveItem01();


  const [addListField, setAddListField] = useState('');
  const lists = useSelector((state: ListState) => state.lists);
  const dispatch = useDispatch();

  return (
    <>
      <input value={addListField} onChange={(e: any) => setAddListField(e.target.value)} />
      <button type="button" onClick={() => {
        dispatch({type: 'ADD_LIST', text: addListField});
        setAddListField('');
      }}>click</button>
      {lists.map(l => <ListCard
        list={l}
        removeList={() => dispatch({type: 'REMOVE_LIST', text: l.text})}
        addItem={(i: string) => dispatch({type: 'ADD_LIST_ITEM', listText: l.text, itemText: i})}
        removeItem={(i: string) => dispatch({type: 'REMOVE_LIST_ITEM', listText: l.text, itemText: i})}
      />)}
    </>
  );
};

export default AllLists;