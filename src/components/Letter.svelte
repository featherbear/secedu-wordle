<script lang="ts">
  import type words from "src/lib/WordParser";

  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";
  import { prefilled } from "../data/WordData";

  let currentWord: Readable<typeof words[number]> = getContext("currentWord");

  export let value: string = "";
  export let position: number;
  export let showFeedback: boolean = false;
  export let showPrefill: boolean = false;
  export let revealDelay: number = null;

  let correctValue,
    classState = "";
  $: {
    classState = "";
    correctValue = $currentWord.word[position];

    if (showFeedback) {
      if (prefilled.includes(correctValue)) classState = "correct";
      else if (value) {
        if (value == correctValue) classState = "correct";
        else if ($currentWord.word.includes(value)) classState = "nearby";
        else classState = "wrong";
      }
    }
  }
</script>

<div
  class={classState}
  style={revealDelay ? `--reveal-delay: ${revealDelay}ms` : ""}
  class:reveal={revealDelay !== null}
>
  {prefilled.includes(correctValue) && showPrefill ? correctValue : value}
</div>

<style lang="scss">
  @import "magic.css/assets/scss/bling/_vanishIn.scss";

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

    &.wrong {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    &.reveal {
      // Uses magic.css import
      animation: vanishIn 0.8s linear var(--reveal-delay), opacityDelay var(--reveal-delay);
    }

    & {
      $border-width: 2px;
      border: $border-width solid;
      border-radius: $border-width;

      border-color: black;

      transition: border-color 200ms ease;

      &:empty {
        border-color: grey;
      }
    }
  }


  @keyframes opacityDelay {
    0%, 100% {
      opacity: 0
    }
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
