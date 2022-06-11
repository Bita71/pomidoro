import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import formatDate from "../utils/ts/formatDate";
import { generateRandomString } from "../utils/ts/generateRandomIndex";

interface ITask {
  id: string;
  name: string;
  pomodoro: number;
}

export interface IDay {
  pause: number;
  focus: number;
  break: number;
  stops: number;
  tasks: number;
  pomodoro: number;
}

interface ITasksState {
  tasks: ITask[];
  hystory: {
    [key: string]: IDay;
  };
}

type TPayloadId = PayloadAction<Pick<ITask, "id">>;

const initialState: ITasksState = {
  tasks: [],
  hystory: {},
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      { payload: { name } }: PayloadAction<Pick<ITask, "name">>
    ) => {
      const task: ITask = {
        id: generateRandomString(),
        name,
        pomodoro: 1,
      };
      state.tasks = state.tasks.concat(task);
    },
    deleteTask: (state, { payload: { id } }: TPayloadId) => {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    editTaskName: (
      state,
      { payload: { id, name } }: PayloadAction<Pick<ITask, "id" | "name">>
    ) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          name: name,
        };
      });
    },
    increasePomodoro: (state, { payload: { id } }: TPayloadId) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          pomodoro: task.pomodoro + 1,
        };
      });
    },
    decreasePomodoro: (state, { payload: { id } }: TPayloadId) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          pomodoro: task.pomodoro - 1,
        };
      });
    },
    editDay: (state, { payload }: PayloadAction<Partial<IDay>>) => {
      const date = formatDate();
      if (!state.hystory[date]) {
        state.hystory[date] = {
          pause: 0,
          focus: 0,
          break: 0,
          stops: 0,
          tasks: 0,
          pomodoro: 0,
        };
      }
      const hystory = state.hystory[date];
      hystory.pause += payload.pause || 0;
      hystory.focus += payload.focus || 0;
      hystory.break += payload.break || 0;
      hystory.stops += payload.stops || 0;
      hystory.tasks += payload.tasks || 0;
      hystory.pomodoro += payload.pomodoro || 0;
    },
  },
});

export type { ITasksState, ITask };

export const {
  addTask,
  increasePomodoro,
  deleteTask,
  decreasePomodoro,
  editTaskName,
  editDay,
} = tasksSlice.actions;

export default tasksSlice.reducer;
