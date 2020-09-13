// src/components/TaskList.stories.js
import TaskList from './TaskList.svelte';

/*
taskData supplies the shape of a Task that we created and exported
from the Task.stories.js file.
Similarly, actionsData defines the actions (mocked callbacks)
that a Task component expects, which the TaskList also needs.
*/
import { taskData, actionsData } from './Task.stories';
export default {
  title: 'TaskList',
  excludeStories: /.*Data$/,
};

export const defaultTasksData = [
  { ...taskData, id: '1', title: 'Task 1' },
  { ...taskData, id: '2', title: 'Task 2' },
  { ...taskData, id: '3', title: 'Task 3' },
  { ...taskData, id: '4', title: 'Task 4' },
  { ...taskData, id: '5', title: 'Task 5' },
  { ...taskData, id: '6', title: 'Task 6' },
];
export const withPinnedTasksData = [
  ...defaultTasksData.slice(0, 5),
  { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
];

// default TaskList state
export const Default = () => ({
  Component: TaskList,
  props: {
    tasks: defaultTasksData,
  },
  on: {
    ...actionsData,
  },
});
// tasklist with pinned tasks
export const WithPinnedTasks = () => ({
  Component: TaskList,
  props: {
    tasks: withPinnedTasksData,
  },
  on: {
    ...actionsData,
  },
});
// tasklist in loading state
export const Loading = () => ({
  Component: TaskList,
  props: {
    loading: true,
  },
});
// tasklist no tasks
export const Empty = () => ({
  Component: TaskList,
});
