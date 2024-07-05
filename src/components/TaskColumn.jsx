import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import ITEM_TYPES from "../utils/itemTypes";

const TaskColumn = ({ tasks, status, onDrop, onTaskUpdate, onTaskDelete }) => {
  const [, ref] = useDrop({
    accept: ITEM_TYPES.TASK,
    drop: (item) => onDrop(item, status),
  });

  return (
    <div ref={ref} className="task-column">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
