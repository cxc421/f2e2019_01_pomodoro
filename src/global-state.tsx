import React, { useState } from 'react';
import uuid from 'uuid/v1';

export interface Task {
  id: string;
  text: string;
  doneDate: null | Date;
  tomatoes: Date[];
}

export enum TimerStatus {
  Stop,
  Play,
  Pause
}

enum TaskStatus {
  Work,
  Rest
}

enum TOTAL_TIME {
  WORK = 25 * 60 * 1000,
  REST = 5 * 60 * 1000
}

interface GlobalState {
  selectTaskId: string;
  timerStatus: TimerStatus;
  taskStatus: TaskStatus;
  timeMax: number;
  time: number;
  todoTasks: Task[];
  doneTasks: Task[];
}

type ContextType = [GlobalState, React.Dispatch<Action>] | null;

const initTodoTasks: Task[] = [
  {
    id: uuid(),
    text: '第一件未完成的事',
    doneDate: null,
    tomatoes: [new Date()]
  },
  {
    id: uuid(),
    text: '第二件未完成的事',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '第三件未完成的事',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '第四件未完成的事',
    doneDate: null,
    tomatoes: []
  }
];

const initDoneTasks = [
  {
    id: uuid(),
    text: '第一件完成的事',
    doneDate: new Date(),
    tomatoes: [new Date(), new Date(), new Date()]
  },
  {
    id: uuid(),
    text: '第二件完成的事',
    doneDate: new Date(),
    tomatoes: [new Date(), new Date(), new Date(), new Date()]
  }
];

const initialState: GlobalState = {
  selectTaskId: initTodoTasks[0].id || '',
  timerStatus: TimerStatus.Stop,
  taskStatus: TaskStatus.Work,
  timeMax: TOTAL_TIME.WORK,
  time: TOTAL_TIME.WORK,
  todoTasks: initTodoTasks,
  doneTasks: initDoneTasks
};

const Context = React.createContext<ContextType>(null);

export function GlobalStateProvider(props: object): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]) as ContextType;
  return <Context.Provider value={value} {...props} />;
}

enum ActionType {
  StartTask,
  SetTimerStatus,
  SetTime
}

type SetTimeAction = { type: ActionType.SetTime; time: number };
type SetTimerStatusAction = {
  type: ActionType.SetTimerStatus;
  timerStatus: TimerStatus;
};

type Action = SetTimeAction | SetTimerStatusAction;

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case ActionType.SetTimerStatus: {
      return {
        ...state,
        timerStatus: action.timerStatus
      };
    }
    case ActionType.SetTime: {
      return {
        ...state,
        time: action.time
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
  const { timerStatus, time } = state;
  const [prevTimeStamp, setPrevTimeStamp] = useState<null | number>(null);

  const startTimer = (taskId: string) => {
    setPrevTimeStamp(Date.now());
    dispatch({
      type: ActionType.SetTimerStatus,
      timerStatus: TimerStatus.Play
    });
  };

  const pauseTimer = () => {
    setPrevTimeStamp(null);
    dispatch({
      type: ActionType.SetTimerStatus,
      timerStatus: TimerStatus.Pause
    });
  };

  const cancelTimer = () => {
    setPrevTimeStamp(null);
    dispatch({
      type: ActionType.SetTimerStatus,
      timerStatus: TimerStatus.Stop
    });
    dispatch({
      type: ActionType.SetTime,
      time: TOTAL_TIME.WORK
    });
  };

  React.useEffect(() => {
    if (
      timerStatus === TimerStatus.Play &&
      time > 0 &&
      prevTimeStamp !== null
    ) {
      const curTimeStamp = Date.now();
      const diff = curTimeStamp - prevTimeStamp;
      const newTime = time - diff;
      dispatch({ type: ActionType.SetTime, time: newTime > 0 ? newTime : 0 });
      setPrevTimeStamp(curTimeStamp);
    }
  }, [timerStatus, time, prevTimeStamp, dispatch]);

  return {
    state,
    startTimer,
    pauseTimer,
    cancelTimer
  };
}
