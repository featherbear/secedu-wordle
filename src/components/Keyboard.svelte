<script lang="ts">
  import type words from "../lib/WordParser";

  import { createEventDispatcher, getContext } from "svelte";

  import Keyboard from "svelte-keyboard";
  import WordleLayout from "svelte-keyboard/layouts/wordle";
  import type { Readable } from "svelte/store";

  for (let key of WordleLayout) {
    if (key.value.length === 1) {
      key.value = key.value.toUpperCase();
    }
  }

  let layouts = {
    standard: WordleLayout,
    numerical: [
      ...Array.from((new Array(10)).keys()).map(i => ({ row: 0, value: i.toString() })),
      ...WordleLayout.map((v) => ({...v, row: v.row + 1})),
    ],
  };

  console.log(layouts);

  const dispatch = createEventDispatcher();

  function handleKeydown(e) {
    console.log(e.detail);
    dispatch("keydown", { key: e.detail } as any);
  }

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");
</script>

{#if $currentWord}
{$currentWord.word}
  <Keyboard
    layout="wordle"
    custom={/[0-9]/.test($currentWord.word)
      ? layouts.numerical
      : layouts.standard}
    keyClass={{ x: "active" }}
    on:keydown={handleKeydown}
  />
{/if}

<style lang="scss">
  :global(.key.clicked) {
    background-color: red;
  }
</style>
