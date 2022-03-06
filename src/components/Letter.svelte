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
  <span>
    {prefilled.includes(correctValue) && showPrefill
      ? correctValue
      : value}</span
  >
</div>

<style lang="scss">
  @import "magic.css/assets/scss/bling/_vanishIn.scss";

  div {
    user-select: none;
    width: 3em;
    height: 3em;

    span {
      font-size: 2em;
    }

    text-align: center;

    &.correct {
      background-color: #54c64a;
      border-color: darken(#54c64a, 20%);
    }
    &.nearby {
      background-color: #ffdc1e;
      border-color: darken(#ffdc1e, 20%);
    }

    &.wrong {
      background-color: #a7a7a7;
      border-color: darken(#a7a7a7, 20%);
      
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    &.reveal {
      // Uses magic.css import
      animation: vanishIn 0.8s linear var(--reveal-delay),
        opacityDelay var(--reveal-delay);
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
    0%,
    100% {
      opacity: 0;
    }
  }

  @keyframes shake {
    10%,
    90% {
      border-color: rgb(182, 51, 51);
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
