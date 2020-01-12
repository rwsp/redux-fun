import * as React from 'react';
import { css } from 'emotion';
import {List} from "./World";
import {useState} from "react";

type Props = {
  list: List;
  removeList: () => void;
  addItem: (i: string) => void;
  removeItem: (i: string) => void;
};

const ListCard: React.FC<Props> = (props: Props) => {
  const [addItemField, setAddItemField] = useState('');

  return (
  <div className={css`
    border: 2px solid black;
    width: 300px;
  `}>
    <div onClick={props.removeList}>{props.list.text}</div>
    {props.list.items.map(i => <div onClick={() => props.removeItem(i)}>---{i}</div>)}
    <input value={addItemField} onChange={(e: any) => setAddItemField(e.target.value)} />
    <button type="button" onClick={() => {
      props.addItem(addItemField);
      setAddItemField('');
    }}>add item</button>
  </div>
  );
};

export default ListCard;