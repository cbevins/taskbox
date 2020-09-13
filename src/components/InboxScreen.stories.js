// src/components/InboxScreen.stories.js

import InboxScreen from './InboxScreen.svelte';
import {defaultTaskData, withPinnedTasksData} from './PureTaskList.stories.js'

export default {
  title: 'PureInboxScreen',
  Component: InboxScreen,
};

export const standard = () => ({
  Component: InboxScreen,
});

export const error = () => ({
  Component: InboxScreen,
  props: {
    error: true,
  },
});
