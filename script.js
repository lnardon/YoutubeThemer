// window.onload = () => {
//   const theme = localStorage.getItem("@youtheme");
//   if (theme) {
//     let parsedTheme = JSON.parse(theme);
//     let keys = Object.keys(parsedTheme);
//     keys.forEach((key) => {
//       document.getElementById(key).value = parsedTheme[key];
//     });
//   }
// };

function getInputValue(id) {
  return document.getElementById(id).value;
}

function handleClick() {
  const theme = {
    setLogoColor: getInputValue("setLogoColor"),
    setTimelineColor: getInputValue("setTimelineColor"),
    setAllFontsColors: getInputValue("setFontsColor"),
    setIconsColor: getInputValue("setIconsColor"),
  };

  localStorage.setItem("youtheme", JSON.stringify(theme));

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.runtime.sendMessage(theme);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("applyBtn").addEventListener("click", handleClick);
});
