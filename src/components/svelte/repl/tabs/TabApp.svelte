<script>
  import Tab from './Tab.svelte'
  import Tabs from './Tabs.svelte'
  import TabList from './TabList.svelte'
  import TabPanel from './TabPanel.svelte'
</script>

<Tabs>
	<TabList>
		<Tab>Firescope</Tab>
		<Tab>Graphs</Tab>
		<Tab>Tables</Tab>
	</TabList>

	<TabPanel>
		<h2>Fire Scope</h2>
	</TabPanel>

	<TabPanel>
		<h2>Graphs</h2>
	</TabPanel>

	<TabPanel>
		<h2>Tables</h2>
	</TabPanel>
</Tabs>