import TASK_ACTIONS from "./taskActions";

function taskReducer(tasks, action) {
  if (action.type == TASK_ACTIONS.ADD_TASK) {
    return [...tasks, action.payload];
  } else if (action.type === TASK_ACTIONS.MOVE_TASK) {
    return tasks.map((task) =>
      task.id === action.payload.id
        ? { ...task, status: action.payload.status }
        : task
    );
  } else if (action.type === TASK_ACTIONS.UPDATE_TASK) {
    return tasks.map((task) =>
      task.id === action.payload.id
        ? {
            ...task,
            title: action.payload.title,
            body: action.payload.body,
            status: action.payload.status,
          }
        : task
    );
  } else if (action.type === TASK_ACTIONS.DELETE_TASK) {
    return tasks.filter((task) => task.id !== action.payload.id);
  } else return tasks;
}

export default taskReducer;
