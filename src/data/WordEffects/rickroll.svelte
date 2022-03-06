<div>
  <iframe
    title="hehe"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1&loop=1"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
  />
</div>

<style lang="scss">
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: -1;

    user-select: none;

    &::after {
      content: "";
      background-color: rgba(255,255,255,0.2);

      width: 100%;
      height: 100%;

      position: absolute;

    }

    iframe {
      position: absolute;
      height: 100%;
      width: 100%;

      filter: blur(10px);
      transform: scale(1.5);
    }
  }
</style>
