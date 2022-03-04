<script lang="ts">
  import type words from "src/lib/WordParser";

  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";
  import { prefilled } from "../data/WordData";

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");

  export let value: string = "";
  export let position: number;
  export let showColours: boolean = false;
  export let showPrefill: boolean = false;

  let correctValue,
    classState = "";
  $: {
    classState = "";
    correctValue = $currentWord.word[position];

    if (showColours) {
      if (prefilled.includes(correctValue)) classState = "correct";
      else if (value) {
        if (value == correctValue) classState = "correct";
        else if ($currentWord.word.includes(value)) classState = "nearby";
      }
    }
  }
</script>

<div class={classState}>
  {prefilled.includes(correctValue) && showPrefill ? correctValue : value}
</div>

<style lang="scss">
  div {
    user-select: none;
    width: 20px;
    height: 20px;

    text-align: center;

    &.correct {
      background-color: green;
    }
    &.nearby {
      background-color: yellow;
    }

    & {
      $borderWidth: 2px;
      border: $borderWidth solid black;

      &:empty {
        border: $borderWidth solid grey;
      }
    }
  }
</style>
