import * as React from 'react';
import AllLists from "./AllLists";

export type ListState = {
  lists: List[];
}

export type List = {
  text: string,
  items: string[];
};

const World: React.FC = () => {
  return (
    <AllLists />
  );
};

export default World;