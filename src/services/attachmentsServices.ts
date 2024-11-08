import axios from 'axios';

const addAttachments = async (formData: FormData) => {
    return  axios.post(`${process.env.REACT_APP_API_URL}/api/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
};

const getAttachmentsByTaskCount = async () => {
    return  axios.get(`${process.env.REACT_APP_API_URL}/api/task/attachments`);
};

export {
  addAttachments,
  getAttachmentsByTaskCount
}
