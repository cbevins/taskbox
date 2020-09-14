<!-- src/App.svelte -->

<script>
  import { AppStore } from './store';
  import InboxScreen from './components/InboxScreen.svelte';
  import Tree from './components/svelte/treeview/Tree.svelte';
</script>

<Tree />
<InboxScreen error="{$AppStore}" />
