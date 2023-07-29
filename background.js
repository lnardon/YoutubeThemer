// HELPER FUNCTIONS
function persist(key, value) {
  let theme = JSON.parse(localStorage.getItem("@youtheme"));
  if (theme) {
    theme[key] = value;
  } else {
    theme = {};
    theme[key] = value;
  }
  localStorage.setItem("@youtheme", JSON.stringify(theme));
}

// Function to modify theme
function gotMessage(message, sender, sendResponse) {
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
    const selector = ".ytp-swatch-background-color ";
    const timeLine = document.querySelector(selector);

    if (timeLine) {
      timeLine.style.backgroundColor = message.setTimelineColor;
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
}

// Listen for messages
function handleGotMessage(message, sender, sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: gotMessage,
      args: [message],
    });
  });
}
chrome.runtime.onMessage.addListener(handleGotMessage);
