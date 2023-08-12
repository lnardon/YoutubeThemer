function gotMessage(message) {
  function changeLogoColor() {
    const selector =
      "#logo-icon > yt-icon-shape > icon-shape > div > svg > svg > g:nth-child(1) > path:nth-child(1)";
    const svgPath = document.querySelector(selector);

    if (svgPath) {
      svgPath.style.fill = message.setLogoColor;
    } else {
      console.error("SVG path not found using the given selector:", selector);
    }
  }

  function changeTimeLineColor() {
    const selector = ".ytp-swatch-background-color";
    const timeLine = document.querySelectorAll(selector);

    if (timeLine) {
      timeLine.forEach((el) => {
        el.style.backgroundColor = message.setTimelineColor;
      });
    } else {
      console.error("SVG path not found using the given selector:", selector);
    }
  }

  function changePlayerIconsColor() {
    let selector = ".ytp-svg-fill";
    let icons = document.querySelectorAll(selector);

    if (icons) {
      icons.forEach((el) => {
        el.style.fill = message.setPlayerIconsColor;
      });
    } else {
      console.error("SVG path not found using the given selector:", selector);
    }

    selector = ".ytp-button > svg";
    icons = document.querySelectorAll(selector);

    if (icons) {
      icons.forEach((el) => {
        el.style.fill = message.setPlayerIconsColor;
      });
    } else {
      console.error("SVG path not found using the given selector:", selector);
    }
  }

  function changeIconsColor() {
    const selector = ".guide-icon.ytd-guide-entry-renderer";
    const icon = document.querySelectorAll(selector);

    if (icon) {
      icon.forEach((el) => {
        el.style.color = message.setIconsColor;
      });
    } else {
      console.error("SVG path not found using the given selector:", selector);
    }
  }

  changeLogoColor();
  changeTimeLineColor();
  changeIconsColor();
  changePlayerIconsColor();
}

chrome.runtime.sendMessage({ greeting: "get-theme-data" }, (response) => {
  if (response) {
    setTimeout(() => {
      gotMessage(response);
    }, 3000);
  }
});
