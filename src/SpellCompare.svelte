<script>
  import { Dice } from './dice.js';
  import Chart from 'svelte-frappe-charts';
  import AutoComplete from "simple-svelte-autocomplete";
  import { spells } from './data/spells.js';


  spells.sort((a,b) => {
    if (a.name < b.name)
      return -1;
    if ( a.name > b.name)
      return 1;
    return 0;
  })

  let types = [{ id: 0, name: "Min" }, { id: 1, name: "Average" }, { id: 2, name: "Max" }];

  let spell1, spell2;
  let spell1Type = types[1],
      spell2Type = types[1];

  let data;
  updateChart();

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

  function spellToSet(spell, method) {
    let dataset = { name: spell.name, values: [] };

    for(let i = 0; i < 9; i++) {
      let damage = 0;
      if(i >= spell.level-1) damage = new Dice(Math.floor(spell.basedamage.getCount() + spell.perlevel.getCount() * (i - spell.level + 1)), spell.basedamage.getMax()).rollType(method);

      dataset.values[i] = damage;
    }

    return dataset;
  }
</script>

<div class="page">
  <div class="card">
      <b> Select Spells to compare </b><br>
      <div class="input-holder"> <AutoComplete items={ spells } bind:selectedItem={ spell1 } labelFieldName="name" onChange={ updateChart } showClear={ spell1 } hideArrow={ spell1 } /><br> </div>
      <div class="input-holder"> <AutoComplete items={ spells } bind:selectedItem={ spell2 } labelFieldName="name" onChange={ updateChart } showClear={ spell2 } hideArrow={ spell2 } /><br> </div>
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
