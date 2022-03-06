<script lang="ts">
  import logo from "./assets/secedu.png";

  import { attempts, prefilled } from "./data/WordData";

  import GameController from "./lib/GameController";
  import { onMount, setContext, SvelteComponent } from "svelte";

  import Row from "./components/Row.svelte";
  import { writable } from "svelte/store";

  import log from "./lib/logger";
  import Button from "./lib/Button.svelte";
  import Hexagon from "./components/Hexagon.svelte";
  import type { CallbackContext } from "./types/WordEntry";
  import Keyboard from "./components/Keyboard.svelte";
  import words from "./lib/WordParser";

  let { currentWord, guesses, gameInProgress } = GameController;

  function doNewGame(d?) {
    componentsInCurrentState.forEach((S) => S.$destroy());
    componentsInCurrentState = [];

    guessRows?.style.setProperty("--overflow-space", "");

    $currentGuess = "";

    GameController.newGame(d);
  }

  let componentsInCurrentState: SvelteComponent[] = [];

  function attachComponentToCurrentState(component: SvelteComponent) {
    componentsInCurrentState.push(component);
    return component;
  }

  onMount(() => {
    let d;
    if (location.hash == "#r") {
      location.hash = "";
      d = words.find((E) => E.word === atob("UklDSyBST0xM"));
    }

    doNewGame(d);
  });
  setContext("guesses", guesses);
  setContext("currentWord", currentWord);

  function addCharacter(c) {
    if (!$gameInProgress) return;
    $currentGuess = $currentGuess + c;
  }
  function handleKeydown(evt: KeyboardEvent) {
    if (/^[a-z]$/i.test(evt.key)) {
      if ($currentGuess.length == $currentWord.length) return;

      let nextPrefill = $currentWord.word[$currentGuess.length];
      if (prefilled.includes(nextPrefill)) addCharacter(nextPrefill);

      addCharacter(evt.key.toUpperCase());
    } else if (/^[0-9]$/.test(evt.key)) {
      if ($currentGuess.length == $currentWord.length) return;

      if (!/[0-9]/.test($currentWord.word)) return;
      addCharacter(evt.key);
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
      let elem = attachComponentToCurrentState(
        new Row({
          target: guessRows,
          props: {
            value: word,
            forceLength: word.length,
            animateReveal: true,
          },
          context: new Map(
            Object.entries({
              guesses,
              currentWord,
            })
          ),
          intro: true,
        })
      );

      if ($currentWord.length < word.length) {
        // Force layout for off-sized final word
        // for the memes.
        let elemDOM = elem.getDOM();
        let elemDOMstyles = getComputedStyle(elemDOM);
        guessRows.style.setProperty(
          "--overflow-space",
          parseInt(elemDOMstyles.height) + parseInt(elemDOMstyles.gap) + "px"
        );
        elemDOM.style.position = "absolute";
        elemDOM.style.bottom = "calc(-1 * var(--overflow-space))";
      }
    }
    const context: CallbackContext = {
      word: $currentWord.word,
      revealWord,
      attachComponentToCurrentState,
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

<main>
  <header>
    <img src={logo} alt="Svelte Logo" />
    <h1>SECedu Wordle</h1>
  </header>
  <section>
    {#if $currentWord}
      <app bind:this={guessRows}>
        {#each Array(attempts[$currentWord.length]) as _, i}
          {#if i < $guesses.length}
            <Row value={$guesses[i]} showFeedback={true} showPrefill={true} />
          {:else if i === $guesses.length && $gameInProgress}
            <Row value={$currentGuess} showPrefill={true} />
          {:else}
            <Row isInactive={true} />
          {/if}
        {/each}
      </app>
    {/if}
  </section>
  <footer>
    <Button on:click={() => doNewGame()}>New Word</Button>

    <p>Test your COMP6[84]4X knowledge!</p>

    <Keyboard on:keydown={({ detail }) => handleKeydown(detail)} />
  </footer>
  <Hexagon />
</main>

<style lang="scss">
  @import "./theme.scss";

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
      @media (max-width: 480px) {
        font-size: 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      img {
        height: 8em;
        padding-right: 1em;
      }

      h1 {
        color: $colour-primary;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        line-height: 1.1;
        margin: 1rem auto;

        @media (min-width: 480px) {
          max-width: none;
        }
      }
      margin-bottom: 1em;
    }

    app {
      display: inline-flex;
      flex-direction: column;
      gap: 5px;
      position: relative;
      margin-bottom: var(--overflow-space);
    }
    footer {
      margin-top: 1em;
      p {
        max-width: 14rem;
        margin: 1rem auto;
        line-height: 1.35;
        font-size: 1em;

        @media (min-width: 360px) {
          max-width: none;
        }
      }
    }
  }
</style>
