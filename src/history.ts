import { createBrowserHistory, createMemoryHistory } from 'history'; // Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history

export default process.env.BROWSER
  ? createBrowserHistory<Record<string, unknown>>()
  : createMemoryHistory<Record<string, unknown>>();
