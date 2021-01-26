<script>
  import { Dice } from './Dice.js';
  import AutoComplete from "simple-svelte-autocomplete";
  import { spells, rollSpell as rollSpellJS } from './data/spells.js';

  let diceToRoll = [];  //Contains dice from quick-buttons, get rolled after debounce

  let lastRoll = "";    //Calculations of last roll
  let result = 0;       //Total of last roll

  let text;             //Text input for custom dice

  let spellLevel;       //Selected Spell level
  let currentSpell;     //Selected Spell
  let prevSpell;        //Previos selected spell, onChange would trigger all the time without this

  //Adds a dice from the quick-buttons
  function addDie(count, max) {
    let existingDie = diceToRoll.find(e => e.max == max);
    if(existingDie) existingDie.count += count;
    else diceToRoll.push({ max: max, count: count});

    diceToRoll = diceToRoll;
    debounce(roll, 1500);
  }

  //Rolls the dice from the quick-buttons
  function roll() {
    let curRoll = [];
    let dice = "";

    for(let die of diceToRoll) {
      let d = new Dice(die.count, die.max);
      curRoll.push(d.roll());

      dice += d + " + ";
    }

    lastRoll = curRoll.join(" + ") + " (" + dice.substring(0, dice.length - 3) + ")";
    result = curRoll.reduce((a, c) => a + c)
    diceToRoll = [];
  }

  //Rolls all the die for the selected spell on the selected level
  function rollSpell() {
    if(currentSpell) {
      let roll = rollSpellJS(currentSpell, spellLevel);

      lastRoll = roll.throws.join(" + ") + " (" + roll.dice + ")";
      result = roll.result;
    }
  }

  //Roll Strings like "1d20+2d8-d6+5"
  function rollCustom() {
    let textToParse = text.replaceAll(" ", "");

    //Regex for (xdy | x | dy) (+ | -) (xdy | x | dy)...
    if(textToParse && textToParse.match(/^(\d+)?(d\d+)([\+\-](\d+|(\d+)?(d\d+)))*$/)) {
      diceToRoll = [];
      clearTimeout(timer);

      let splitText = textToParse.split(/(\-|\+)/g);
      let numbers = [];

      //Skip operator
      for(let i = 0; i < splitText.length; i+=2) {
        let curText = splitText[i];
        let num;

        if(curText.includes("d")) { // (dy | xdy)
          let splitCur = curText.split("d");

          if(splitCur[0].length == 0) { // dy
            num = new Dice(1, parseInt(splitCur[1])).roll();
          } else {  // xdy
            num = new Dice(parseInt(splitCur[0]), parseInt(splitCur[1])).roll();
          }
        } else { // x
          num = parseInt(curText);
        }

        if(i > 0 && splitText[i-1] == "-") num *= -1;
        numbers.push(num);
      }

      lastRoll = numbers.map(e => e < 0? (" " + e).replace("-", "- "): " + " + e).join("").substring(2);
      lastRoll += " (" + text + ")"
      result = numbers.reduce((a, c) => a + c)
    }
  }

  //Required, onChange would trigger all the time without this
  function setSpell() {
    if(prevSpell != currentSpell) {
        spellLevel = currentSpell? currentSpell.level: 1;
        prevSpell = currentSpell;
    }
  }

  //Debounce
  let timer;            //Timer for debounce
  const debounce = (f, t) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			f();
		}, t? t: 500);
	}
</script>

<div class="card">
  <div> <b> Dice Roller </b> </div>

  <!-- Quick Buttons -->
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

  <!-- Spell Roller -->
  <div class="row">
    <div class="col">
      <AutoComplete items={ spells } bind:selectedItem={ currentSpell } labelFieldName="name" onChange={ setSpell } showClear={ currentSpell } hideArrow={ currentSpell } />
    </div>

    <div class="col-2">
      {#if currentSpell}
        <select bind:value={ spellLevel }>
          {#each Array(9 - currentSpell.level + 1) as _, i}
            <option value={ i + currentSpell.level }> Level { i + currentSpell.level } </option>
          {/each}
        </select>
      {/if}
    </div>

    <div class="col-2">
      <a class="button is-full-width primary" on:click={ rollSpell }> Roll </a>
    </div>
  </div>

  <!-- Custom Rolls -->
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

  <!-- Current Quick-Button Pool -->
  {#each diceToRoll as die}
    <span class="tag"> { die.count }d{ die.max }</span>
  {/each}
  {#if diceToRoll.length > 0}
    <br>
  {/if}

  <!-- Result -->
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
