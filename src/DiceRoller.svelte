<script>
  import { Dice } from './Dice.js';
  import AutoComplete from "simple-svelte-autocomplete";
  import { spells } from './data/spells.js';

  let diceToRoll = [];
  let lastRoll = "";
  let result = 0;
  let timer;

  let text;

  let spellLevel;
  let currentSpell;
  let prevSpell;

  function addDie(count, max) {
    let existingDie = diceToRoll.find(e => e.max == max);
    if(existingDie) existingDie.count += count;
    else diceToRoll.push({ max: max, count: count});

    diceToRoll = diceToRoll;
    debounce(roll, 1500);
  }

  function roll() {
    let curRoll = [];
    for(let die of diceToRoll) {
      let d = new Dice(die.count, die.max);
      curRoll.push(d.roll());
    }

    lastRoll = curRoll.join(" + ");
    result = curRoll.reduce((a, c) => a + c)
    diceToRoll = [];
  }

  function rollSpell() {
    if(currentSpell) {
      let rolls = [];

      rolls.push(currentSpell.basedamage.roll());
      let die = new Dice(Math.floor(currentSpell.perlevel.getCount() * (spellLevel - currentSpell.level)), currentSpell.basedamage.getMax());
      rolls.push(die.roll());

      lastRoll = rolls.join(" + ");
      result = rolls.reduce((a, c) => a + c)
    }
  }

  function rollCustom() {
    let textToParse = text.replaceAll(" ", "");

    if(textToParse && textToParse.match(/^(\d+)?(d\d+)([\+\-](\d+|(\d+)?(d\d+)))*$/)) {
      diceToRoll = [];
      clearTimeout(timer);

      let splitText = textToParse.split(/(\-|\+)/g);
      let numbers = [];

      for(let i = 0; i < splitText.length; i+=2) {
        let curText = splitText[i];
        let num;

        if(curText.includes("d")) {
          let splitCur = curText.split("d");

          if(splitCur[0].length == 0) {
            num = new Dice(1, parseInt(splitCur[1])).roll();
          } else {
            num = new Dice(parseInt(splitCur[0]), parseInt(splitCur[1])).roll();
          }

        } else {
          num = parseInt(curText);
        }

        if(i > 0 && splitText[i-1] == "-") num *= -1;
        numbers.push(num);
      }

      lastRoll = numbers.map(e => e < 0? (" " + e).replace("-", "- "): " + " + e).join("").substring(2);
      result = numbers.reduce((a, c) => a + c)
    }
  }

  function setSpell() {
    if(prevSpell != currentSpell) {
        spellLevel = currentSpell? currentSpell.level: 1;
        prevSpell = currentSpell;
    }
  }

  const debounce = (f, t) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			f();
		}, t? t: 500);
	}
</script>

<div class="card">
  <div> <b> Dice Roller </b> </div>

  <div class="mar-b flex">
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 2) }> 1d2 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 4) }> 1d4 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 6) }> 1d6 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 8) }> 1d8 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 10) }> 1d10 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 12) }> 1d12 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 20) }> 1d20 </a> </div>
    <div class="die-holder"> <a class="button" on:click={ () => addDie(1, 100) }> 1d100 </a> </div>
  </div>

  <div class="row">
    <div class="col">
      <AutoComplete items={ spells } bind:selectedItem={ currentSpell } labelFieldName="name" onChange={ setSpell } showClear={ currentSpell } hideArrow={ currentSpell } />
    </div>

    <div class="col-2">
      {#if currentSpell}
        <select bind:value={ spellLevel }>
          {#each Array(9-currentSpell.level +1) as _, i}
            <option value={ i + currentSpell.level }> Level {i + currentSpell.level} </option>
          {/each}
        </select>
      {/if}
    </div>

    <div class="col-2">
      <a class="button is-full-width primary" on:click={ rollSpell }> Roll </a>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <input placeholder="Insert Custom Equation (Example: d20-2d6+2)" bind:value={ text }>
    </div>

    <div class="col-2">
      <a class="button is-full-width" error on:click={ () => text = "" }> Clear </a>
    </div>

    <div class="col-2">
      <a class="button is-full-width primary" on:click={ rollCustom }> Roll </a>
    </div>
  </div>

  <div>
    <b>NOTE!</b> The current spell die are not completely right. Use at own risk.
  </div>

  {#each diceToRoll as die}
    <span class="tag"> { die.count }d{ die.max }</span>
  {/each}
  {#if diceToRoll.length > 0}
    <br>
  {/if}

  {#if lastRoll.length > 0}
  <span> <b> { result } </b> = { lastRoll } </span>
  <br>
  {/if}
</div>

<style>
  .card {
    display: inline-block;
  }

  .button {

    width: 100%;
  }

  .flex {
      display: flex;
      flex-wrap: wrap;
  }

  .die-holder {
    margin-left: 8px;
    margin-bottom: 8px;
  }
</style>
