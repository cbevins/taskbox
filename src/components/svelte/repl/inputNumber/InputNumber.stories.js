import { withKnobs, object } from '@storybook/addon-knobs'
import InputNumber from './InputNumber.svelte';

export default {
  title: 'Svelte/REPL/InputNumber',
  Component: Tree,
};

export const tutorialDemo = () => ({
  Component: InputNumber,
  props: {
    a: object('a', 4),
    b: object('b', 8),
  }
});
