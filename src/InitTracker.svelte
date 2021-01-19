<script>
  import { slide } from 'svelte/transition';

  let nameRef;

  let currentName = "";
  let currentInit = "";

  let allInits = [];

  function addInit() {
    if(!currentInit) currentInit = 10;
    if(!currentName) currentName = "Enemy";

    let count = allInits.filter(e => e.name.includes(currentName));
    if(count.length > 0) {
      if(count.length == 1) count[0].name += " 1";
      currentName = currentName + " " + (count.length+1);
    }

    allInits.push({ name: currentName, init: currentInit });
    allInits.sort((a, b) => a.init - b.init);
    allInits = allInits;

    currentInit = "";
    currentName = "";

    nameRef.focus();
  }

  function handleKeyup(event) {
    if (event.code == 'Enter') {
			event.preventDefault();
			addInit();
			return false;
		}
  }

  function removeInit(index) {
    allInits.splice(index, 1);
    allInits = allInits;
  }

  function clearAll() {
    allInits = [];
  }
</script>

<div class="card">
  <div> <b> Init Tracker </b> </div>
  <input placeholder="Name (Default: Enemy)" bind:this={ nameRef } bind:value={ currentName } />
  <input placeholder="Initiative (Default: 10)" type="number" bind:value={ currentInit }  on:keyup|preventDefault={ handleKeyup }>
  <a class="button primary" on:click={ addInit }> Add </a><br>
  <a class="button" on:click={ clearAll }> Clear </a>
  {#each allInits as player, i}
    <div class="init-display row" transition:slide|local>
      <div class="col-1">
        { player.init }
      </div>
      <div class="col">
        { player.name }
      </div>
      <div class="col-3">
        <button class="button clear icon-only pull-right" on:click={ () => removeInit(i) }>
          <img src="https://icongr.am/feather/x.svg?size=12&color=ff0000">
        </button>
      </div>
    </div>
    {#if i < allInits.length-1}
      <hr>
    {/if}
  {/each}
</div>

<style>

input {
  margin-bottom: 16px;
}

a {
  width: 100%;
  margin-bottom: 8px;
}

.card {
  display: inline-block;
}

.col, .col-1, .col-2, .col-3, hr {
  margin-top: 0px;
  margin-bottom: 0px;
}

.init-display {
  display: flex;
  align-items: center;
  align-content: center;
}

</style>
