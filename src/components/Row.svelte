<script lang="ts">
  import type words from "src/lib/WordParser";

  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");
  let guesses: Readable<string[]> = getContext("guesses");

  import Letter from "./Letter.svelte";

  export let value: string = ""
  export let showColours: boolean = false;
  export let showPrefill: boolean = false;
</script>

<div style="display: flex; flex-direction: row; gap: 5px;">
  {#each Array($currentWord.length) as _, i}
    <Letter value={value[i] ?? ''} position={i} {showColours} {showPrefill} />
  {/each}
</div>
