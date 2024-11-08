import WorkflowColumn from "../../components/WorkflowColumn/WorkflowColumn"
import './BoardViewPage.scss'
import { Task, WorkflowColumnHeader } from '../../types';
import { tasksByStatusData } from "../../data/fakeData";
import { useEffect, useState } from "react";
import { getAttachmentsByTaskCount } from "../../services/attachmentsServices";

const BoardViewPage = () => {
  const [tasks, setTasks] = useState<Record<WorkflowColumnHeader, Task[]>>({
    Incomplete: [],
    'To Do': [],
    'Doing': [],
    'Under Review': [],
    Completed: [],
    Overdue: [],
  });

  const fetchData = async () => {
    const responses = await getAttachmentsByTaskCount();
    (Object.keys(tasksByStatusData) as WorkflowColumnHeader[]).forEach((title) => {
      responses.data.forEach((response: { _id: string, count: number }) => {
        tasksByStatusData[title].forEach((task) => {
          if (task.id === Number(response._id)) {
            task.attachmentsCount = response.count;
          }
        });
      });
    });
    setTasks(tasksByStatusData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="board-view">
      {(Object.keys(tasks) as WorkflowColumnHeader[]).map((title, index) => (
        <WorkflowColumn key={index} title={title} tasks={tasks[title]} />
      ))}
    </div>
  )
}

export default BoardViewPage;
