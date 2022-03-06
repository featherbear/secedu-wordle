<script lang="ts">
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";

  import words from "./lib/WordParser";
  import { attempts, prefilled } from "./data/WordData";

  import GameController from "./lib/GameController";
  import { onMount, setContext } from "svelte";

  import Row from "./components/Row.svelte";
  import { writable } from "svelte/store";

  import log from './lib/logger'

  console.log(words);

  let { currentWord, guesses, gameInProgress } = GameController;

  onMount(() => {
    GameController.newGame();
  });
  setContext("guesses", guesses);
  setContext("currentWord", currentWord);

  function addCharacter(c) {
    if (!$gameInProgress) return;
    $currentGuess = $currentGuess + c;
  }
  function handleKeydown(evt: KeyboardEvent) {
    // TODO: Handle prefilled characters

    if (/^[a-z]$/i.test(evt.key)) {
      if ($currentGuess.length == $currentWord.length) return;

      let nextPrefill = $currentWord.word[$currentGuess.length];
      if (prefilled.includes(nextPrefill)) addCharacter(nextPrefill);

      addCharacter(evt.key.toUpperCase());
    } else if (/^[0-9]$/.test(evt.key)) {
      if ($currentGuess.length == $currentWord.length) return;

      addCharacter(evt.key);

      // TODO: Check if numeric input is enabled
      if (true) return;
    } else if (evt.key === "Escape") {
      $currentGuess = "";
    } else if (evt.key === "Enter") {
      if ($currentGuess.length != $currentWord.length) return;

      let result = GameController.tryWord($currentGuess);
      $currentGuess = "";
      setTimeout(() => handleGuessResult(result), 0);
    } else if (evt.key === "Backspace") {
      $currentGuess = $currentGuess.slice(0, -1);
    }
  }

  let currentGuess = writable<string>("");
  setContext("currentGuess", currentGuess);
  let guessRows: HTMLElement;

  function handleGuessResult(result) {
    function revealWord(word?: string) {
      if (!word) word = $currentWord.word;
      new Row({
        target: guessRows,
        props: {
          value: word,
          forceLength: word.length,
          animateReveal: true,
        },
        context: new Map(
          Object.entries({
            guesses: guesses,
            currentWord: currentWord,
          })
        ),
        intro: true,
      });
    }
    const context = {
      word: $currentWord.word,
      revealWord,
    };

    function handleComplete() {
      log.info("Game over! Word was " + $currentWord.word);
      $currentWord.onComplete?.apply(context);
    }

    switch (result) {
      case true:
        if (!$currentWord.onWin || !$currentWord.onWin.apply(context)) {
          /**
           * Default win routine
           */
        }

        handleComplete();
        break;
      case false: {
        if (!$currentWord.onLose || !$currentWord.onLose.apply(context)) {
          /**
           * Default lose routine
           */
          revealWord();
        }

        handleComplete();
        break;
      }
      // case null
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{JSON.stringify($currentWord)}
{#if $currentWord}
  <div
    style="display: flex; flex-direction: column; gap: 5px;"
    bind:this={guessRows}
  >
    {#each Array(attempts[$currentWord.length]) as _, i}
      {#if i < $guesses.length}
        <Row value={$guesses[i]} showFeedback={true} showPrefill={true} />
      {:else if i === $guesses.length && $gameInProgress}
        <Row value={$currentGuess} showPrefill={true} />
      {:else}
        <Row isInactive={true} />
      {/if}
    {/each}
  </div>
{/if}
<main>
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript!</h1>

  <button
    on:click={() => {
      GameController.newGame();
    }}
  />
  <Counter />

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
