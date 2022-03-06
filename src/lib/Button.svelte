<script lang="ts">
  let elem: HTMLButtonElement;
</script>

<button
  on:click={() => {
    elem.blur();
  }}
  on:click
  bind:this={elem}
  ><slot />
</button>

<style lang="scss">
  @import "../theme.scss";

  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: $colour-primary-near-dark;
    background-color: $colour-primary-near-light;
    border-radius: 1em;
    border: 2px solid $colour-primary;
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:hover {
    border: 2px solid darken($colour-primary, 10%);
  }

  button:active {
    background-color: darken($colour-primary-near-light, 10%);
  }
</style>
