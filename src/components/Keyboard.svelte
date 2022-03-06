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
      ...Array.from(new Array(10).keys()).map((i) => ({
        row: 0,
        value: i.toString(),
      })),
      ...WordleLayout.map((v) => ({ ...v, row: v.row + 1 })),
    ],
  };

  console.log(layouts);

  const dispatch = createEventDispatcher();

  function handleKeydown(e) {
    console.log(e.detail);
    dispatch("keydown", { key: e.detail } as any);
  }

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");
  let guesses: Readable<string[]> = getContext("guesses");

  $: if ($currentWord) {
    keyClass = {};
    for (let wrongLetter of Array.from(
      new Set($guesses.map((f) => [...f]).flat())
    ).filter((l) => !$currentWord.word.includes(l))) {
      keyClass[wrongLetter] = "wrong";
    }
  }

  let keyClass = {};

  function handleKey(isDown: boolean, evt: KeyboardEvent) {
    if (isDown) {
      keyClass[evt.key.toUpperCase()] =
        (keyClass[evt.key.toUpperCase()] ?? "") + " clicked";
    } else {
      keyClass[evt.key.toUpperCase()] = (
        keyClass[evt.key.toUpperCase()] ?? ""
      ).replace("clicked", "");
    }
  }
</script>

{#if $currentWord}
  {$currentWord.word}
  <Keyboard
    layout="wordle"
    custom={/[0-9]/.test($currentWord.word)
      ? layouts.numerical
      : layouts.standard}
    {keyClass}
    on:keydown={handleKeydown}
  />
{/if}

<svelte:window
  on:keydown={(evt) => handleKey(true, evt)}
  on:keyup={(evt) => handleKey(false, evt)}
/>

<style lang="scss">
  :global(.key.wrong) {
    background-color: #a7a7a7;
    border-color: darken(#a7a7a7, 20%);
  }

  :global(.key.clicked) {
    background: var(--active-background, #ccc) !important;
    border: var(--active-border, none) !important;
    box-shadow: var(--active-box-shadow, none);
    color: var(--active-color, #111);
    opacity: var(--active-opacity, 1);
    transform: var(--active-transform, none);
  }
</style>
