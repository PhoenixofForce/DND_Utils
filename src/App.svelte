<script>
	import Recalc from './Recalc.svelte';
	import SpellCompare from './SpellCompare.svelte';
	import InitTracker from './InitTracker.svelte';
	import DiceRoller from './DiceRoller.svelte';
</script>

<!-- Dice Roller -->

<div class="main">
	<div>
		<SpellCompare />
	</div>
	<div class="flex">
		<div>
			<InitTracker />
		</div>
		<div>
			<Recalc />
		</div>
		<div>
		<DiceRoller />
		</div>
	</div>
</div>

<style>
	.main {
		width: 90%;
		margin-left: auto;
	  margin-right: auto;
		padding-top: 64px;
	}

	div {
		margin-right: 12px;
		margin-bottom: 12px;
	}

	.flex {
		display: flex;
		align-items: start;
	}
</style>
