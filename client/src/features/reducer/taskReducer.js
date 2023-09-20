import { createSlice } from '@reduxjs/toolkit';

const userTask = createSlice({
  name: 'UserTasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    setAllTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      const existingTask = state.tasks.find(
        (task) => task._id === action.payload._id
      );
      if (!existingTask) {
        state.tasks.push(action.payload);
      } else {
        Object.assign(existingTask, action.payload);
      }
    },
    updateTask: (state, action) => {
      const { _id, description } = action.payload;
      const index = state.tasks.findIndex((item) => item._id === _id);
      console.log(action.payload, index);

      if (index !== -1) {
        const updatedTask = { ...state.tasks[index], description };
        state.tasks[index] = updatedTask;
      }
    },
    toggleComplete: (state, action) => {
      const taskId = action.payload;
      const index = state.tasks.findIndex((item) => item.id === taskId);

      if (index !== -1) {
        const updatedTask = {
          ...state.tasks[index],
          completed: !state.tasks[index].completed,
        };
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((item) => item.id !== id);
    },
  },
});

export default userTask.reducer;
export const { addTask, updateTask, deleteTask, toggleComplete, setAllTasks } =
  userTask.actions;
