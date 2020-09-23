import { withKnobs, object } from '@storybook/addon-knobs'
import InputNumber from '../inputNumber/InputNumber.svelte';
import Tree from './Tree.svelte';
import TabApp from '../tabs/TabApp.svelte'

export default {
  title: 'Svelte/REPL/TreeView',
  Component: Tree,
};

export const treeTutorialDemo = () => ({
  Component: Tree,
  props: {},
});

export const inputNumberDemo = () => ({
  Component: InputNumber,
  props: {
    a: object('a', 4),
    b: object('b', 8),
  }
});

export const tabsReplDemo = () => ({
  Component: TabApp,
  props: {},
});
