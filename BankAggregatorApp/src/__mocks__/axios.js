// src/__mocks__/axios.js
const mockAxios = {
    create: jest.fn(() => mockAxios), // axios.create() returns itself
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  };
  
  export default mockAxios;
  