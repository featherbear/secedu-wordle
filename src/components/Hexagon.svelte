<div class="container">
  <main>
    <div class="hexagonContainer">
      <div class="hexagon" />
    </div>
  </main>
</div>

<style lang="scss">
  @import "../theme.scss";

  div.container {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  main {
    transform: translate(-135px, -140px);
  }

  .hexagonContainer {
    margin: 30px;
    animation: spin 100s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  $hexagon-colour: $colour-primary;

  .hexagon {
    position: relative;
    width: 300px;
    height: 173.21px;
    margin: 86.6px 0;
    border-left: solid 1px $hexagon-colour;
    border-right: solid 1px $hexagon-colour;
  }

  .hexagon:before,
  .hexagon:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 212.13px;
    height: 212.13px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 42.934px;
  }

  .hexagon:before {
    top: -106.066px;
    border-top: solid 1.4142px $hexagon-colour;
    border-right: solid 1.4142px $hexagon-colour;
  }

  .hexagon:after {
    bottom: -106.066px;
    border-bottom: solid 1.4142px $hexagon-colour;
    border-left: solid 1.4142px $hexagon-colour;
  }
</style>
