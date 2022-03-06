<script lang="ts">
  import type words from "src/lib/WordParser";

  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");

  import Letter from "./Letter.svelte";

  export let value: string = "";

  export let showFeedback: boolean = false;
  export let showPrefill: boolean = false;
  export let isInactive: boolean = false;
  export let forceLength: number = 0;
  export let animateReveal: boolean = false;
</script>

<div class:active={!isInactive}>
  {#each Array(forceLength || $currentWord.length) as _, i}
    <Letter value={value[i] ?? ""} position={i} {showFeedback} {showPrefill} revealDelay={animateReveal ? (i+1) * 300 : null}/>
  {/each}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: row;
    gap: 5px;

    &:not(.active) {
      opacity: 0.4;
    }
  }
</style>
