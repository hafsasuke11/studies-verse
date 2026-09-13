import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  login: (email, password) => 
    axios.post(`${API_BASE_URL}/login`, { regEmail: email, password }),
  
  register: (name, email, password) => 
    axios.post(`${API_BASE_URL}/register`, { regName: name, regEmail: email, password }),
  
  getProfile: () => axios.get(`${API_BASE_URL}/profile`),
  
  getSubjects: () => axios.get(`${API_BASE_URL}/subjects`),
  
  getNotes: (subjectId) => 
    axios.get(`${API_BASE_URL}/notes${subjectId ? `?subjectId=${subjectId}` : ''}`)
};

export default api;