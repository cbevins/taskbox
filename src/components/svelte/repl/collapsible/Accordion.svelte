<script>
	import { slide } from 'svelte/transition';
	let visible = true;
	let sections = [
		{
			id: 1,
			title: "Section 1",
			content: "This is some test content",
			active: false,
		},
		{
			id: 2,
			title: "Section 2",
			content: "Welcome to section 2 test content",
			active: false,
		},
		{
			id: 3,
			title: "Section 3",
			content: "Looks like you have found what is hidden behind door number 3",
			active: false,
		}
	]

	const expand = (section) => {
		sections = sections.map(s => {
			s.active = false
			if (s.id === section.id) {
				s.active = true
			}
			return s
		})
	}
</script>

<style>
	.accordion {
		margin-bottom: 10px;
	}
	.slider {
		/* Comment out the border and padding and let the wonkyness begin!
		border: 1px solid #eee;
		padding: 4px 20px;
		*/

		/* Added some color to illustrate the issue */
		background-color: rebeccapurple;
		color: white;
	}
</style>

{#each sections as section}
<div class="accordion">
	<button on:click={() => expand(section) }>{section.title}</button>
	{#if section.active}
		<div class="slider" transition:slide>
			<h3>
				Foo
			</h3>
			<p>{section.content}</p>
		</div>
	{/if}
</div>
{/each}
