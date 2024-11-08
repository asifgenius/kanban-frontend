import { faComments, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faLayerGroup, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import './TaskCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskCardProps } from '../../types/index'
import FileUploadModal from '../FileUploadModal';
import { useState } from 'react';
import { addAttachments } from '../../services/attachmentsServices';
import toast, { Toaster } from 'react-hot-toast';
import listIcon from '../../assets/list.svg'

const TaskCard: React.FC<TaskCardProps> = ({
    description,
    clientName,
    clientImage,
    assigneeImage,
    assigneeName,
    employeeCount,
    commentsCount,
    attachmentsCount,
    dueDate,
    image1,
    image2,
    id
}) => {
    const [openFileUploadModal, setOpenFileUploadModal] = useState(false);
    const [showAttachmentCount, setshowAttachmentCount] = useState(attachmentsCount);

    const handleFileUpload = (files: File[]) => {
        const formData = new FormData();
        formData.append('taskId', String(id));
        files.forEach((file) => {
            formData.append('files', file);
        });
        addAttachments(formData).then(response => {
            setshowAttachmentCount(response.data.count)
            toast("File(s) uploaded successfully", { position: "top-center" })
        }).catch(error => {
            toast("Failed to upload file(s)")
        })
    }
    return (
        <div className="task-card">
            <div className='task-assignee-info'>
                <div className='task-card-name'>
                    <div>
                        <img className='task-card-image' src={clientImage} />
                    </div>
                    <div>
                        <p className='task-card-text'>{clientName}</p>
                    </div>
                </div>
                <div className='task-card-name'>
                    <div>
                        <img className='task-card-image' src={assigneeImage} />
                    </div>
                    <div>
                        <p className='task-card-text'>{assigneeName}</p>
                    </div>
                </div>
            </div>
            <div className='task-card-description'>
                <div className='task-card-description-body'>
                    <div className='task-card-description-group'>
                        <div>
                            <FontAwesomeIcon icon={faLayerGroup} className='task-card-description-icon' />
                        </div>
                        <div className='task-card-truncated-text'>{description}
                        </div>
                    </div>
                    <div className='task-card-description-info'>
                        <img className='task-list-icon' src={listIcon} alt="List Icon" /> 1/2
                    </div>
                </div>
            </div>
            <div className='task-card-footer'>
                <div>
                    <img className='task-card-image' src={image1} />
                </div>
                <div>
                    <img className='task-card-image task-card-image-body' src={image2} />
                </div>
                <div className='task-card-employee-count'>{employeeCount}
                </div>
                <div className='task-card-icon'>
                    <div className='task-card-icon-size'>
                        <FontAwesomeIcon icon={faComments} />
                    </div>
                    <div className='task-card-text-size'>{commentsCount}</div>
                </div>
                <div className='task-card-icon'>
                    <div className='task-card-icon-size'><a className='task-card-attachment'><FontAwesomeIcon onClick={() => setOpenFileUploadModal(true)} icon={faPaperclip} /></a></div>
                    <div className='task-card-text-size'>
                        {showAttachmentCount}
                    </div>
                </div>
                <div className='task-card-icon task-card-due-date'>
                    <div className='task-card-icon-size'><FontAwesomeIcon icon={faCalendarDays} /></div>
                    <div className='task-card-date-size'>
                        {dueDate}
                    </div>
                </div>
            </div>
            <FileUploadModal
                open={openFileUploadModal}
                onClose={() => setOpenFileUploadModal(false)}
                onUpload={files => handleFileUpload(files)}
            />
            <Toaster toastOptions={{
                success: {
                    style: {
                        background: 'green',
                    },
                },
                error: {
                    style: {
                        background: 'red',
                    },
                },
            }} />
        </div>
    );
};

export default TaskCard;
