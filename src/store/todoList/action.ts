import { ActionCreator } from "redux";
import { store } from "../../App";

export interface IChange {
  type: 'ADDTODO';
  list: IToDo[];
}
export interface IDelete {
  type: 'DELETETODO';
  list: IToDo[];
}
export interface IEdit {
  type: 'EDITTODO';
  list: IToDo[];
}
export interface IIncrease {
  type: 'INCREASETODO';
  list: IToDo[];
}
export interface IDecrease {
  type: 'DECREASETODO',
  list: IToDo[]
}
export interface IChangeTomatoesLeft {
  type: 'CHANGETOMATOESLEFTTODO',
  list: IToDo[]
}
export interface IToDo {
  name: string,
  id: string,
  numberOfTomatoes: number;
  tomatoesLeft: number;
}


export const addTodo: ActionCreator<IChange> = (item: IToDo) => {
  const list = store.getState().toDo.toDoList;
  const newList = list.slice(0);
  newList.push(item);
  return {
    type: 'ADDTODO',
    list: newList,
  };
}

export const deleteTodo: ActionCreator<IDelete> = (id: string) => {
  const list = store.getState().toDo.toDoList;
  const newList = list.filter((el) => el.id !== id);
  return {
    type: 'DELETETODO',
    list: newList,
  };
};

export const increaseTodo: ActionCreator<IIncrease> = (id: string) => {
  const list = store.getState().toDo.toDoList;
  let itemIncrease = list.find((el) => el.id === id);
  if (!itemIncrease) {
    return {
      type: 'INCREASETODO',
      list: list
    };
  }
  const newList: IToDo[] = [];
  list.forEach((el) => {
    if (el.id !== id) {
      newList.push(el)
    } else {
      el.numberOfTomatoes += 1;
      newList.push(el)
    }
  })
  return {
    type: 'INCREASETODO',
    list: newList,
  };
};

export const decreaseTodo: ActionCreator<IDecrease> = (id: string) => {
  const list = store.getState().toDo.toDoList;
  let itemDecrease = list.find((el) => el.id === id);
  if (!itemDecrease) {
    return {
      type: 'DECREASETODO',
      list: list
    };
  }
  const newList: IToDo[] = [];
  if (itemDecrease.numberOfTomatoes > 1) {
    list.forEach((el) => {
      if (el.id !== id) {
        newList.push(el)
      } else {
        el.numberOfTomatoes -= 1;
        newList.push(el)
      }
    })
    return {
      type: 'DECREASETODO',
      list: newList,
    };
  } else {
    const newList = list.filter((el) => el.id !== id);
    return {
      type: 'DECREASETODO',
      list: newList
    };
  }
};
export const changeTomatoesLeftTodo: ActionCreator<IChangeTomatoesLeft> = (id: string) => {
  const list = store.getState().toDo.toDoList;
  let itemChangeTomatoesLeft = list.find((el) => el.id === id);
  if (!itemChangeTomatoesLeft) {
    return {
      type: 'CHANGETOMATOESLEFTTODO',
      list: list
    };
  }
  const newList: IToDo[] = [];
  list.forEach((el) => {
    if (el.id !== id) {
      newList.push(el)
    } else {
      el.tomatoesLeft += 1;
      newList.push(el)
    }
  })
  return {
    type: 'CHANGETOMATOESLEFTTODO',
    list: newList,
  };
};

export const editTodo: ActionCreator<IEdit> = (id: string, name: string) => {
  const list = store.getState().toDo.toDoList;
  let itemEdit = list.find((el) => el.id === id);
  if (!itemEdit) {
    return {
      type: 'EDITTODO',
      list: list
    };
  }
  const newList: IToDo[] = [];
  list.forEach((el) => {
    if (el.id !== id) {
      newList.push(el)
    } else {
      el.name = name;
      newList.push(el)
    }
  })
  return {
    type: 'EDITTODO',
    list: newList,
  };
};
