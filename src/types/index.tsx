export interface TaskCardProps {
    id: number,
    description: string;
    clientImage: string;
    assigneeImage: string;
    clientName: string;
    assigneeName: string;
    employeeCount: string;
    commentsCount: number;
    attachmentsCount: number;
    dueDate: string;
    image1: string;
    image2: string;

}
export interface Task {
    id: number;
    description: string;
    clientName: string;
    assigneeName: string;
    clientImage: string;
    assigneeImage: string;
    employeeCount: string;
    commentsCount: number;
    attachmentsCount: number;
    dueDate: string;
    image1: string;
    image2: string;
}
export interface WorkflowColumnProps {
    title: string;
    tasks: Task[];
}

export type WorkflowColumnHeader =
    'Incomplete' |
    'To Do' |
    'Doing' |
    'Under Review' |
    'Completed' |
    'Overdue';
