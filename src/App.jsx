import { useState, useReducer } from "react";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import taskReducer from "./utils/taskReducer";
import TASK_ACTIONS from "./utils/taskActions";
import TASK_STATUS from "./utils/taskStatus";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./components/TaskColumn";
import { BsPlus } from "react-icons/bs";

function App() {
  const [tasks, setTask] = useReducer(taskReducer, [
    {
      id: 0,
      title: "To create a react APP",
      body: "Create a task management react app",
      status: TASK_STATUS.backlog,
    },
    {
      id: 1,
      title: "To create a react APP",
      body: "Create a task management react app",
      status: TASK_STATUS.readyToDo,
    },
    {
      id: 2,
      title: "To create a react APP",
      body: "Create a task management react app",
      status: TASK_STATUS.inProgress,
    },
    {
      id: 3,
      title: "To create a react APP",
      body: "Create a task management react app",
      status: TASK_STATUS.done,
    },
  ]);
  const lengthOfTasks = Object.keys(tasks).length;
  const [taskIdCounter, setTaskIdCounter] = useState(lengthOfTasks);

  const handleAddTask = (status) => {
    setTaskIdCounter(taskIdCounter + 1);
    setTask({
      type: TASK_ACTIONS.ADD_TASK,
      payload: {
        id: taskIdCounter,
        title: "Title",
        body: "Body",
        status: TASK_STATUS[status],
      },
    });
  };

  const handleDrop = (item, status) => {
    setTask({
      type: TASK_ACTIONS.MOVE_TASK,
      payload: {
        id: item.id,
        status: status,
      },
    });
  };

  const handleTaskUpdate = (id, title, body, status) => {
    setTask({
      type: TASK_ACTIONS.UPDATE_TASK,
      payload: {
        id,
        title,
        body,
        status,
      },
    });
  };

  const handleDeleteTask = (id) => {
    setTask({
      type: TASK_ACTIONS.DELETE_TASK,
      payload: {
        id,
      },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {Object.keys(TASK_STATUS).map((key) => (
          <div key={`${key}-board`} className={`board-${key}`}>
            <h1>{TASK_STATUS[key]}</h1>
            <Button
              className="board-button"
              variant="outline-primary"
              value={key}
              onClick={() => {
                handleAddTask(key);
              }}
            >
              <BsPlus size={24} />
            </Button>
            <TaskColumn
              key={`${key}-tasks`}
              status={TASK_STATUS[key]}
              tasks={tasks.filter((task) => task.status === TASK_STATUS[key])}
              onDrop={handleDrop}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleDeleteTask}
            />
          </div>
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
