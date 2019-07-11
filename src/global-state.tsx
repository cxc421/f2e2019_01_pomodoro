import React from 'react';
import uuid from 'uuid/v1';

interface Task {
  id: string;
  text: string;
  doneDate: null | Date;
  tomatoes: Date[];
}

enum TimerStatus {
  Stop,
  Play,
  Pause
}

enum TaskStatus {
  Work,
  Rest
}

enum TOTAL_TIME {
  WORK = 25 * 60,
  REST = 5 * 60
}

interface GlobalState {
  selectTaskId: string;
  timerStatus: TimerStatus;
  taskStatus: TaskStatus;
  timeMax: number;
  time: number;
  tasks: Task[];
}

type ContextType = [GlobalState, React.Dispatch<Action>] | null;

const initialTasks: Task[] = [
  {
    id: uuid(),
    text: 'THE FIRST THING TODO',
    doneDate: null,
    tomatoes: [new Date()]
  },
  {
    id: uuid(),
    text: 'THE SECOND THING TODO',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: 'Complete Thing',
    doneDate: new Date(),
    tomatoes: [new Date(), new Date()]
  }
];

const initialState: GlobalState = {
  selectTaskId: initialTasks[0].id || '',
  timerStatus: TimerStatus.Stop,
  taskStatus: TaskStatus.Work,
  timeMax: TOTAL_TIME.WORK,
  time: TOTAL_TIME.REST,
  tasks: initialTasks
};

const Context = React.createContext<ContextType>(null);

export function GlobalStateProvider(props: object): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]) as ContextType;
  return <Context.Provider value={value} {...props} />;
}

enum ActionType {
  SetRandomTaskId
}

interface Action {
  type: ActionType;
  payload?: any;
}

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case ActionType.SetRandomTaskId: {
      const len = state.tasks.length;
      let newId = state.selectTaskId;
      while (newId === state.selectTaskId) {
        const idx = Math.floor(Math.random() * len);
        newId = state.tasks[idx].id;
      }
      return {
        ...state,
        selectTaskId: newId
      };
    }
    default:
      return state;
  }
}

export function useGlobalState() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useGlobalState must be used within a GlobalStateProvider`);
  }
  const [state, dispatch] = context;

  const setRandomSelectTask = () =>
    dispatch({ type: ActionType.SetRandomTaskId });

  return {
    state,
    setRandomSelectTask
  };
}
