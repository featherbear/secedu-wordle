<script>
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  window["onYouTubeIframeAPIReady"] = function () {
    player = new window["YT"].Player("rick-roll-iframe", {
      events: {
        onReady: onPlayerReady,
      },
    });
  };
  function onPlayerReady(event) {
    player.playVideo();
  }
</script>

<div>
  <iframe
    id="rick-roll-iframe"
    title="hehe"
    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1&loop=1&enablejsapi=1"
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
      background-color: rgba(255, 255, 255, 0.2);

      width: 100%;
      height: 100%;

      position: absolute;
    }

    iframe {
      position: absolute;
      height: 100%;
      width: 100%;

      filter: blur(3px);
      transform: scale(3.5);
    }
  }
</style>
