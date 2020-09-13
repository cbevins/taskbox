// src/components/Task.stories.js

import Task from './Task.svelte';
import { action } from '@storybook/addon-actions';

/*
To tell Storybook about the component we are documenting,
we create a default export that contains:
  component -- the component itself,
  title -- how to refer to the component in the sidebar of the Storybook app,
  excludeStories -- information required by the story, but should not be rendered by the Storybook app.
*/
export default {
  title: 'Task',
  excludeStories: /.*Data$/,
};

/*
Actions help you verify interactions when building UI components in isolation.
Oftentimes you won't have access to the functions and state you have in context
of the app. Use action() to stub them in.

action() allows us to create a callback that appears in the actions panel
of the Storybook UI when clicked. So when we build a pin button, we’ll be
able to determine in the test UI if a button click is successful.

As we need to pass the same set of actions to all permutations of our component,
it is convenient to bundle them up into a single actionsData variable
and pass them into our story definition each time (where they will be accessed
when the dispatch function is invoked).

Another nice thing about bundling the actionsData that a component needs is that
you can export them and use them in stories for components that reuse this component,
as we'll see later.
*/
export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

/*
When creating a story we use a base task (taskData) to build out the shape
of the task the component expects. This is typically modelled from what the
true data looks like. Again, export-ing this shape will enable us to reuse
it in later stories, as we'll see.
*/
export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'Task_INBOX',
  updated_at: new Date(2019, 0, 1, 9, 0),
};

/*
To define our stories, we export a function for each of our test
states to generate a story.
The story is a function that returns a rendered element
(i.e. a component class with a set of props) in a given state.
*/
// default task state
export const Default = () => ({
  Component: Task,
  props: {
    task: taskData,
  },
  on: {
    ...actionsData,
  },
});
// pinned task state
export const Pinned = () => ({
  Component: Task,
  props: {
    task: {
      ...taskData,
      state: 'TASK_PINNED',
    },
  },
  on: {
    ...actionsData,
  },
});
// archived task state
export const Archived = () => ({
  Component: Task,
  props: {
    task: {
      ...taskData,
      state: 'TASK_ARCHIVED',
    },
  },
  on: {
    ...actionsData,
  },
});
