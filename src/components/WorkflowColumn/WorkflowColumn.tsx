import React from 'react';
import './WorkflowColumn.scss';
import TaskCard from '../TaskCard/TaskCard';
import { WorkflowColumnProps } from '../../types/index';

const WorkflowColumn: React.FC<WorkflowColumnProps> = ({ title, tasks }) => {
  const getIconCssClassName = (value: string) => {
    if (value === "Incomplete") {
      return 'workflow-column-icon-red'
    }
    else if (value === "To Do") {
      return 'workflow-column-icon-blue'
    }
    else if (value === "Doing") {
      return 'workflow-column-icon-yellow'
    }
  }
  return (
    <div className="workflow-column">
      <div className="workflow-column-header">
        <div className="workflow">
          <div className={getIconCssClassName(title)}>
          </div>
          <div>
            <h2 className="workflow-column-title">{title}</h2>
          </div>
        </div>
        <div>
          <p className="workflow-column-count">{tasks.length}</p>
        </div>
      </div>
      <div className="workflow-column-task-card">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            id={task.id}
            clientImage={task.clientImage}
            assigneeImage={task.assigneeImage}
            description={task.description}
            clientName={task.clientName}
            assigneeName={task.assigneeName}
            employeeCount={task.employeeCount}
            commentsCount={task.commentsCount}
            attachmentsCount={task.attachmentsCount}
            dueDate={task.dueDate}
            image1={task.image1}
            image2={task.image2}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkflowColumn;
