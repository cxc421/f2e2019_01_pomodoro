import React, { useState } from 'react';
import uuid from 'uuid/v1';
import { makeDate } from './helpers/date';

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

export enum TaskStatus {
  Work,
  Rest
}

enum TOTAL_TIME {
  WORK = 25 * 60 * 1000,
  REST = 5 * 60 * 1000
  // WORK = 10 * 1000,
  // REST = 5 * 1000
}

interface GlobalState {
  selectTaskId: string;
  timerStatus: TimerStatus;
  taskStatus: TaskStatus;
  timeMax: number;
  time: number;
  todoTasks: Task[];
  doneTasks: Task[];

  soundBasePath: string;
  soundNameList: string[];
  soundWorkIndex: number;
  soundRestIndex: number;
}

type ContextType = [GlobalState, React.Dispatch<Action>] | null;

const initTodoTasks: Task[] = [
  {
    id: uuid(),
    text: '蕃茄鐘設定頁面: 時間',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '蕃茄鐘設定頁面: 循環',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '保存全域設定',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '響應式 Layout',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '蕃茄鐘分析頁面: LineChart 動畫',
    doneDate: null,
    tomatoes: []
  },
  {
    id: uuid(),
    text: '蕃茄鐘分析頁面: 數字動畫',
    doneDate: null,
    tomatoes: []
  }
];

const initDoneTasks = [
  {
    id: uuid(),
    text: '蕃茄鐘基本 Layout',
    doneDate: makeDate(2019, 7, 11),
    tomatoes: [
      makeDate(2019, 7, 9),
      makeDate(2019, 7, 10),
      makeDate(2019, 7, 11)
    ]
  },
  {
    id: uuid(),
    text: '倒數計時動畫',
    doneDate: makeDate(2019, 7, 12),
    tomatoes: [
      makeDate(2019, 7, 11),
      makeDate(2019, 7, 11),
      makeDate(2019, 7, 12),
      makeDate(2019, 7, 12)
    ]
  },
  {
    id: uuid(),
    text: '切換 tab 動畫',
    doneDate: makeDate(2019, 7, 16),
    tomatoes: [
      makeDate(2019, 7, 13),
      makeDate(2019, 7, 13),
      makeDate(2019, 7, 14),
      makeDate(2019, 7, 15)
    ]
  },
  {
    id: uuid(),
    text: '圖表 (lineChart)',
    doneDate: makeDate(2019, 7, 19),
    tomatoes: [
      makeDate(2019, 7, 16),
      makeDate(2019, 7, 17),
      makeDate(2019, 7, 17),
      makeDate(2019, 7, 18),
      makeDate(2019, 7, 18),
      makeDate(2019, 7, 18),
      makeDate(2019, 7, 19)
    ]
  },
  {
    id: uuid(),
    text: '蕃茄鐘設定頁面: 鈴聲',
    doneDate: makeDate(2019, 7, 19),
    tomatoes: [
      makeDate(2019, 7, 19),
      makeDate(2019, 7, 19),
      makeDate(2019, 7, 19),
      makeDate(2019, 7, 19),
      makeDate(2019, 7, 20),
      makeDate(2019, 7, 20),
      makeDate(2019, 7, 20)
    ]
  }
];

const initialState: GlobalState = {
  selectTaskId: initTodoTasks[0].id || '',
  timerStatus: TimerStatus.Stop,
  taskStatus: TaskStatus.Work,
  timeMax: TOTAL_TIME.WORK,
  time: TOTAL_TIME.WORK,
  // taskStatus: TaskStatus.Rest,
  // timeMax: TOTAL_TIME.REST,
  // time: TOTAL_TIME.REST,
  todoTasks: initTodoTasks,
  doneTasks: initDoneTasks,
  soundBasePath: '/sounds',
  soundNameList: ['Super Mario - Game Start', '高雄發大財'],
  soundWorkIndex: 0,
  soundRestIndex: 1
};

const Context = React.createContext<ContextType>(null);

export function GlobalStateProvider(props: object): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]) as ContextType;
  return <Context.Provider value={value} {...props} />;
}

enum ActionType {
  SetTimerStatus,
  SetTime,
  SetTaskStatus,
  SetTaskText,
  SetSelectTask,
  DeleteTask,
  AddNewTodoTask,
  AddNewTomato,
  ToggleTaskDoneDate,
  SwapTodoTask,
  SetSound
}
type AddNewTomatoAction = { type: ActionType.AddNewTomato; taskId: string };
type AddNewTodoTaskAction = {
  type: ActionType.AddNewTodoTask;
  text: string;
  id: string;
};
type SetTimeAction = { type: ActionType.SetTime; time: number };
type SetTimerStatusAction = {
  type: ActionType.SetTimerStatus;
  timerStatus: TimerStatus;
};
type SetTaskStatusAction = {
  type: ActionType.SetTaskStatus;
  taskStatus: TaskStatus;
};
type SetTaskTextAction = {
  type: ActionType.SetTaskText;
  text: string;
  taskId: string;
};
type SetSelectTaskAction = { type: ActionType.SetSelectTask; taskId: string };
type ToggleTaskDoneDateAction = {
  type: ActionType.ToggleTaskDoneDate;
  taskId: string;
};
type DeleteTaskAction = { type: ActionType.DeleteTask; taskId: string };
type SwapTodoTaskAction = {
  type: ActionType.SwapTodoTask;
  oldIndex: number;
  newIndex: number;
};

type SoundType = 'rest' | 'work';
type SetSoundAction = {
  type: ActionType.SetSound;
  soundType: SoundType;
  soundIndex: number;
};

type Action =
  | SetTimeAction
  | SetTimerStatusAction
  | SetTaskStatusAction
  | SetTaskTextAction
  | SetSelectTaskAction
  | AddNewTodoTaskAction
  | AddNewTomatoAction
  | ToggleTaskDoneDateAction
  | DeleteTaskAction
  | SwapTodoTaskAction
  | SetSoundAction;

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
    case ActionType.SetTaskStatus: {
      const timeMax =
        action.taskStatus === TaskStatus.Work
          ? TOTAL_TIME.WORK
          : TOTAL_TIME.REST;
      return {
        ...state,
        taskStatus: action.taskStatus,
        timeMax,
        time: timeMax
      };
    }
    case ActionType.SetTaskText: {
      return {
        ...state,
        todoTasks: state.todoTasks.map(task => {
          if (task.id === action.taskId) {
            return {
              ...task,
              text: action.text
            };
          }
          return task;
        })
      };
    }
    case ActionType.SetSelectTask: {
      return {
        ...state,
        selectTaskId: action.taskId
      };
    }
    case ActionType.AddNewTodoTask: {
      const newTask: Task = {
        id: action.id,
        text: action.text,
        doneDate: null,
        tomatoes: []
      };
      return {
        ...state,
        todoTasks: [...state.todoTasks, newTask]
      };
    }
    case ActionType.AddNewTomato: {
      return {
        ...state,
        todoTasks: state.todoTasks.map(task => {
          if (task.id === action.taskId) {
            return {
              ...task,
              tomatoes: [...task.tomatoes, new Date()]
            };
          } else {
            return task;
          }
        })
      };
    }
    case ActionType.ToggleTaskDoneDate: {
      let task = state.todoTasks.find(task => task.id === action.taskId);
      // swap todo to done
      if (task) {
        const newTodoTasks = state.todoTasks.filter(
          task => task.id !== action.taskId
        );
        const newDoneTasks = [
          ...state.doneTasks,
          { ...task, doneDate: new Date() }
        ];
        return {
          ...state,
          todoTasks: newTodoTasks,
          doneTasks: newDoneTasks
        };
      }
      task = state.doneTasks.find(task => task.id === action.taskId);
      // swap done to todo
      if (task) {
        const newDoneTasks = state.doneTasks.filter(
          task => task.id !== action.taskId
        );
        const newTodoTasks = [...state.todoTasks, { ...task, doneDate: null }];
        return {
          ...state,
          todoTasks: newTodoTasks,
          doneTasks: newDoneTasks
        };
      }
      return state;
    }
    case ActionType.DeleteTask: {
      return {
        ...state,
        todoTasks: state.todoTasks.filter(task => task.id !== action.taskId)
      };
    }
    case ActionType.SwapTodoTask: {
      const newTodoTasks = Array.from(state.todoTasks);
      const [removed] = newTodoTasks.splice(action.oldIndex, 1);
      newTodoTasks.splice(action.newIndex, 0, removed);
      return {
        ...state,
        todoTasks: newTodoTasks
      };
    }
    case ActionType.SetSound: {
      if (
        action.soundIndex < 0 ||
        action.soundIndex >= state.soundNameList.length
      ) {
        return state;
      }
      if (action.soundType === 'rest') {
        return {
          ...state,
          soundRestIndex: action.soundIndex
        };
      }
      if (action.soundType === 'work') {
        return {
          ...state,
          soundWorkIndex: action.soundIndex
        };
      }
      throw new Error('unknown setSound type=' + action.soundType);
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
  const { timerStatus, time, taskStatus, selectTaskId, todoTasks } = state;
  const [prevTimeStamp, setPrevTimeStamp] = useState<null | number>(null);

  const startTimer = (taskId: string) => {
    if (taskId === '') return;

    setPrevTimeStamp(Date.now());

    if (taskId !== selectTaskId) {
      dispatch({
        type: ActionType.SetTaskStatus,
        taskStatus: TaskStatus.Work
      });
      dispatch({
        type: ActionType.SetSelectTask,
        taskId
      });
    }

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
    // 只要放棄, 都跳回 WORK 狀態
    dispatch({
      type: ActionType.SetTaskStatus,
      taskStatus: TaskStatus.Work
    });
  };

  const addNewTask = (text: string) => {
    text = text.trim();
    if (text.length > 0) {
      const newId = uuid();
      dispatch({
        type: ActionType.AddNewTodoTask,
        text,
        id: newId
      });
      handleTodoTaskIncrease(newId);
    }
  };

  function handleRemoveCurSelectTask(taskId: string) {
    if (taskId !== selectTaskId) return;
    const newSelectTask = todoTasks.find(task => task.id !== selectTaskId);
    dispatch({
      type: ActionType.SetSelectTask,
      taskId: newSelectTask ? newSelectTask.id : ''
    });
    if (timerStatus !== TimerStatus.Stop) {
      cancelTimer();
      dispatch({
        type: ActionType.SetTaskStatus,
        taskStatus: TaskStatus.Work
      });
    }
  }

  function handleTodoTaskIncrease(taskId: string) {
    if (selectTaskId === '') {
      dispatch({
        type: ActionType.SetSelectTask,
        taskId
      });
    }
  }

  const toggleTaskDone = (taskId: string) => {
    dispatch({
      type: ActionType.ToggleTaskDoneDate,
      taskId
    });

    handleRemoveCurSelectTask(taskId);
    handleTodoTaskIncrease(taskId);
  };

  const setTaskText = (taskId: string, text: string) => {
    dispatch({
      type: ActionType.SetTaskText,
      text,
      taskId
    });
  };

  const deleteTask = (taskId: string) => {
    handleRemoveCurSelectTask(taskId);

    dispatch({ type: ActionType.DeleteTask, taskId });
  };

  const swapTodoTasks = (oldIndex: number, newIndex: number) => {
    dispatch({ type: ActionType.SwapTodoTask, oldIndex, newIndex });
  };

  const setSound = (soundType: SoundType, soundIndex: number) => {
    dispatch({
      type: ActionType.SetSound,
      soundType,
      soundIndex
    });
  };

  React.useEffect(() => {
    if (timerStatus === TimerStatus.Play && prevTimeStamp !== null) {
      if (time > 0) {
        const curTimeStamp = Date.now();
        const diff = curTimeStamp - prevTimeStamp;
        const newTime = time - diff;
        dispatch({ type: ActionType.SetTime, time: newTime > 0 ? newTime : 0 });
        setPrevTimeStamp(curTimeStamp);
        return;
      }

      if (time === 0) {
        if (taskStatus === TaskStatus.Work) {
          dispatch({
            type: ActionType.AddNewTomato,
            taskId: selectTaskId
          });
          dispatch({
            type: ActionType.SetTaskStatus,
            taskStatus: TaskStatus.Rest
          });
          setPrevTimeStamp(Date.now());
        } else {
          dispatch({
            type: ActionType.SetTaskStatus,
            taskStatus: TaskStatus.Work
          });
          dispatch({
            type: ActionType.SetTimerStatus,
            timerStatus: TimerStatus.Stop
          });
          setPrevTimeStamp(null);
        }
      }
    }
  }, [timerStatus, time, prevTimeStamp, dispatch, taskStatus, selectTaskId]);

  return {
    state,
    startTimer,
    pauseTimer,
    cancelTimer,
    addNewTask,
    setTaskText,
    deleteTask,
    toggleTaskDone,
    swapTodoTasks,
    setSound
  };
}
