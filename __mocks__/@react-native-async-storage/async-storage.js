let store = {};

export default {
  setItem: jest.fn(async (key, value) => {
    store[key] = value;
    return null;
  }),
  getItem: jest.fn(async (key) => {
    return store[key] || null;
  }),
  removeItem: jest.fn(async (key) => {
    delete store[key];
    return null;
  }),
  clear: jest.fn(async () => {
    store = {};
    return null;
  }),
}; 