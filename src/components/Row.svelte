<script lang="ts">
  import type words from "src/lib/WordParser";

  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");
  let guesses: Readable<string[]> = getContext("guesses");

  import Letter from "./Letter.svelte";

  export let position: number;
</script>

<div style="display: flex; flex-direction: row; gap: 5px;">
  {#if position < $guesses.length}
    {#each Array($currentWord.length) as _, i}
      <Letter position={i} value={$guesses[position][i]} reveal={true} />
    {/each}
  {:else}
    {#each Array($currentWord.length) as _, i}
      <Letter position={i} />
    {/each}
  {/if}
</div>
