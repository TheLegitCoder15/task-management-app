import React from "react";
import TASK_STATUS from "../utils/taskStatus";
import { Badge } from "react-bootstrap";

const StatusBadge = ({ status }) => {
  var badgeColor = "";
  if (status == TASK_STATUS.backlog) {
    badgeColor = "danger";
  } else if (status == TASK_STATUS.readyToDo) {
    badgeColor = "info";
  } else if (status == TASK_STATUS.inProgress) {
    badgeColor = "secondary";
  } else if (status == TASK_STATUS.done) {
    badgeColor = "success";
  } else {
    badgeColor = "";
  }

  return <Badge bg={badgeColor}>{status}</Badge>;
};

export default StatusBadge;
