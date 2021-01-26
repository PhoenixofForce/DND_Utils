<script>
  import { Dice } from './dice.js';
  import Chart from 'svelte-frappe-charts';
  import AutoComplete from "simple-svelte-autocomplete";
  import { spells, rollSpell } from './data/spells.js';

  //Spell Damage Types for the Dropdown
  let types = [{ id: 0, name: "Min" }, { id: 1, name: "Average" }, { id: 2, name: "Max" }];

  let spell1, spell2; //Selected Spells
  let spell1Type = types[1], spell2Type = types[1]; //Selected Damage types, def: Average

  let data;
  updateChart();

  //Change chart when a spell or spell dmg type changes
  function updateChart() {
    let newData = {
      labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8", "Level 9"],
      datasets: []
    };

    if(spell1) newData.datasets.push(spellToSet(spell1, spell1Type.id));
    else newData.datasets.push({name: "", values: [0,0,0,0,0,0,0,0,0 ]});

    if(spell2) newData.datasets.push(spellToSet(spell2, spell2Type.id));
    else newData.datasets.push({name: "", values: [0,0,0,0,0,0,0,0,0 ]})

    data = newData;
  }

  //Calculates for a spell the [methode] damage for each lvl
  function spellToSet(spell, method) {
    let dataset = { name: spell.name, values: [] };

    for(let i = 0; i < 9; i++) {
      let damage = rollSpell(spell, i + 1, method);
      dataset.values[i] = damage.result;
    }

    return dataset;
  }
</script>

<div class="page">
  <div class="card">
    <!-- Spell Inputs -->
    <b> Select Spells to compare </b><br>
    <div class="input-holder"> <AutoComplete items={ spells } bind:selectedItem={ spell1 } labelFieldName="name" onChange={ updateChart } showClear={ spell1 } hideArrow={ spell1 } /><br> </div>
    <div class="input-holder"> <AutoComplete items={ spells } bind:selectedItem={ spell2 } labelFieldName="name" onChange={ updateChart } showClear={ spell2 } hideArrow={ spell2 } /><br> </div>

    <!-- Damage Dropdowns -->
    <b> Select damage types </b><br>
    <div class="input-holder"> <select bind:value={spell1Type} on:blur={ updateChart }>
      {#each types as type}
        <option value={type}>
          {type.name}
        </option>
      {/each}
    </select> </div>

    <div class="input-holder"> <select bind:value={spell2Type} on:blur={ updateChart }>
      {#each types as type}
        <option value={type}>
          {type.name}
        </option>
      {/each}
    </select> </div>
  </div>

  <!-- Chart -->
  <div class="chart"> <Chart { data } type="bar" /> </div>
</div>

<style>
  .page {
      display: flex;
  }

  .card {
    display: inline-block
  }

  .chart {
    width: 100%;
  }

  .input-holder {
    padding-bottom: 8px;
  }
</style>
