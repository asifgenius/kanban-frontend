import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ open, onClose, onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFiles([...files, ...acceptedFiles]),
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    }
  });

  const handleDelete = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const handleUpload = () => {
    onUpload(files);
    onClose();
    setFiles([]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
          <input {...getInputProps()} />
          <p>Drag & drop files here, or click to select files</p>
        </div>
        <List>
          {files.map((file, index) => (
            <ListItem key={index} secondaryAction={

              <IconButton edge="end" onClick={() => handleDelete(file.name)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </IconButton>
            }>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpload} color="primary" disabled={files.length === 0}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadModal;
