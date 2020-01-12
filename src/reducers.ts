import {ListState, List} from "./World";
import expect from 'expect';

export const testAddList = () => {
  const before: ListState = {
    lists: [],
  };
  const after: ListState = {
    lists: [
      {
        text: 'test',
        items: [],
      }
    ],
  };
  const action = {
    type: 'ADD_LIST',
    text: 'test',
  };
  expect(defaultReducer(before, action)).toEqual(after);
};

export const testRemoveList = () => {
  const before: ListState = {
    lists: [
      {
        text: 'test',
        items: [],
      }
    ],
  };
  const after: ListState = {
    lists: [],
  };
  const action = {
    type: 'REMOVE_LIST',
    text: 'test',
  };
  expect(defaultReducer(before, action)).toEqual(after);
};

export const testAddItem01 = () => {
  const before: ListState = {
    lists: [
      {
        text: 'test',
        items: [],
      }
    ],
  };
  const after: ListState = {
    lists: [
      {
        text: 'test',
        items: ['item'],
      }
    ],
  };
  const action = {
    type: 'ADD_LIST_ITEM',
    listText: 'test',
    itemText: 'item',
  };
  expect(defaultReducer(before, action)).toEqual(after);
};

export const testAddItem02 = () => {
  const before: ListState = {
    lists: [
      {
        text: 'test1',
        items: ['i1','i2','i3'],
      },
      {
        text: 'test2',
        items: ['i1','i2','i3'],
      },
    ],
  };
  const after: ListState = {
    lists: [
      {
        text: 'test1',
        items: ['i1','i2','i3', 'i4'],
      },
      {
        text: 'test2',
        items: ['i1','i2','i3'],
      },
    ],
  };
  const action = {
    type: 'ADD_LIST_ITEM',
    listText: 'test1',
    itemText: 'i4',
  };
  expect(defaultReducer(before, action)).toEqual(after);
};

export const testRemoveItem01 = () => {
  const before: ListState = {
    lists: [
      {
        text: 'test1',
        items: ['i1','i2','i3'],
      },
      {
        text: 'test2',
        items: ['i1','i2','i3'],
      },
    ],
  };
  const after: ListState = {
    lists: [
      {
        text: 'test1',
        items: ['i1','i2'],
      },
      {
        text: 'test2',
        items: ['i1','i2','i3'],
      },
    ],
  };
  const action = {
    type: 'REMOVE_LIST_ITEM',
    listText: 'test1',
    itemText: 'i3',
  };
  expect(defaultReducer(before, action)).toEqual(after);
};


const defaultState: ListState = {
  lists: [
    {
      text: 'football',
      items: ['broncos', 'cowboys'],
    },
    {
      text: 'basketball',
      items: ['bulls', 'mavs', 'heat'],
    },
    {
      text: 'baseball',
      items: ['yankees'],
    },
  ],
};

export const defaultReducer = (state = defaultState, action: any): ListState => {
  switch(action.type) {
    case 'ADD_LIST':
      console.log('add list');
      return {lists: [...state.lists, {text: action.text, items: []}]};
    case 'REMOVE_LIST':
      console.log('removing list');
      return {lists: state.lists.filter(l => l.text !== action.text)};
    case 'ADD_LIST_ITEM': {
      console.log('add item');
      const index = state.lists.map(l => l.text).indexOf(action.listText);
      const prefix = state.lists.slice(0, index);
      const suffix = state.lists.slice(index + 1, state.lists.length);
      const list: List = {text: state.lists[index].text, items: [...state.lists[index].items, action.itemText]};
      return {lists: [...prefix, list, ...suffix]};
    }
    case 'REMOVE_LIST_ITEM': {
      console.log('remove item');
      const index = state.lists.map(l => l.text).indexOf(action.listText);
      const prefix = state.lists.slice(0, index);
      const suffix = state.lists.slice(index + 1, state.lists.length);
      const list: List = {text: state.lists[index].text, items: [...state.lists[index].items.filter(i => i !== action.itemText)]};
      return {lists: [...prefix, list, ...suffix]};
    }
    default:
      return state;
  }
};