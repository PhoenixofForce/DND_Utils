<script>
  import { slide } from 'svelte/transition';
  import { Dice } from './Dice.js';

  let nameRef;  //Reference to name input, used to apply focus

  //Inputs from the <inptut />'s'
  let currentName = "";
  let currentInit = "";

  let allInits = [];  //Sorted List

  function addInit() {
    if(!currentInit && currentInit !== 0) currentInit = new Dice(1, 20).roll();
    if(!currentName) currentName = "Enemy";
    currentName = currentName.replaceAll(/[0-9]/g, "").trim();  //Remove Numbers

    //Rename Same Name: Enemy + Enemy => Enemy 1 + Enemy 2
    let sameName = allInits.filter(e => e.name.includes(currentName));
    if(sameName.length > 0) {
      //Add 1 to others name, if it is the only one and does not already has a number
      if(sameName.length == 1 && !sameName[0].name.match(/[^0-9]+[0-9]+/)) sameName[0].name += " 1";

      //Add maxIndex as ID
      //Maybe store indexes outside such that (+1, +2, -2, +n)=[1,n=3] and not (+1, +2, -2, +n)=[1,n=2]
      let indexes = sameName.map(e => parseInt(e.name.replaceAll(/[^0-9]/g, "")));
      let maxIndex = Math.max(...indexes);

      currentName = currentName + " " + (maxIndex + 1);
    }

    //Add and sort
    allInits.push({ name: currentName, init: currentInit });
    allInits.sort((a, b) => a.init - b.init);
    allInits.reverse();
    allInits = allInits;

    //Reset
    currentInit = "";
    currentName = "";
    nameRef.focus();
  }

  //On Input Enter
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

  <!-- Inputs and buttons -->
  <input placeholder="Name (Default: Enemy)" bind:this={ nameRef } bind:value={ currentName } />
  <input placeholder="Initiative (Default: d20)" type="number" bind:value={ currentInit }  on:keyup|preventDefault={ handleKeyup }>
  <a class="button" on:click={ clearAll }> Clear </a><br>
  <a class="button primary" on:click={ addInit }> Add </a>

  <!-- Display Inits -->
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

    <!-- Seperator when not the last element -->
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
