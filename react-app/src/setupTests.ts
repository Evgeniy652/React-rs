// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { mswServer } from './__mocks__/server/setup-server';

let localStorageValue = '';

const localStorageMock = {
  getItem: jest.fn(() => localStorageValue),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getAll: jest.fn(),
  clear: jest.fn(),
  length: 0,
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

export const setItemToLocalStorage = (value: string) => {
  localStorageValue = value;
};

beforeEach(() => mswServer.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
