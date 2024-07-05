import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ITEM_TYPES from "../utils/itemTypes";
import { useDrag } from "react-dnd";
import TASK_STATUS from "../utils/taskStatus";
import StatusBadge from "./StatusBadge";
import { BsPencil, BsX } from "react-icons/bs";

const Task = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onTaskUpdate(task.id, title, body, status);
    setIsEditing(false);
  };

  const [, ref] = useDrag({
    type: ITEM_TYPES.TASK,
    item: { id: task.id, status: task.status },
  });

  return (
    <Card ref={ref}>
      <Card.Header>
        <button
          className="card-button"
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
        >
          <BsPencil size={18} />
        </button>
        <button className="card-button" onClick={() => onTaskDelete(task.id)}>
          <BsX size={24} />
        </button>
      </Card.Header>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group>
              <Form.Label htmlFor={`task-title-${task.id}`}>Title</Form.Label>
              <Form.Control
                id={`task-title-${task.id}`}
                placeholder={task.title}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor={`task-body-${task.id}`}>Body</Form.Label>
              <Form.Control
                id={`task-body-${task.id}`}
                placeholder={task.body}
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor={`task-status-${task.id}`}>Status</Form.Label>
              <Form.Select
                id={`task-status-${task.id}`}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {Object.keys(TASK_STATUS).map((status) => (
                  <option key={status} value={TASK_STATUS[status]}>
                    {TASK_STATUS[status]}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="card-body-buttons">
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.body}</Card.Text>
            <Card.Text>
              Status: <StatusBadge status={task.status} />
            </Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;
