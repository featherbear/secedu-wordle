<script lang="ts">
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";

  import words from "./lib/WordParser";
  import { attempts, prefilled } from "./data/WordData";

  import GameController from "./lib/GameController";
  import { onMount, setContext } from "svelte";

  import Row from "./components/Row.svelte";

  console.log(words);

  let { currentWord } = GameController;

  onMount(() => {
    GameController.newGame();
  });
  setContext("guesses", GameController.guesses);
  setContext("currentWord", currentWord);
</script>

{JSON.stringify($currentWord)}
{#if $currentWord}
  <div style="display: flex; flex-direction: column;  gap: 5px;">
    {#each Array(attempts[$currentWord.length]) as _, i}
      <Row position={i} />
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
