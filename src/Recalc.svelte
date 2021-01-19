<script>
  let tiles = 1;
  let feet = 5;
  let meter = 1.5;

  function changeTile() {
    feet = tiles * 5;
    meter = tiles * 1.5;
  }

  function changeFeet() {
    tiles = feet / 5;
    meter = tiles * 1.5;
  }

  function changeMeter() {
    tiles = meter / 1.5;
    feet = tiles * 5;
  }
</script>

<div class="card">
  <div> <b> Distance Converter </b> </div>
  <div class="input-holder"> Tiles <input bind:value={tiles} type=number on:input={ changeTile  } /> </div>
  <div class="input-holder"> Feet  <input bind:value={feet}  type=number on:input={ changeFeet  } /> </div>
  <div class="input-holder"> Meter <input bind:value={meter} type=number on:input={ changeMeter } /> </div>
</div>


<style>
  .input-holder {
    padding-bottom: 8px;
  }

  .card {
    display: inline-block;
  }
</style>
