// Example popup script using browser polyfill
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');
  // Example call to browser APIs
  browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
    console.log('Active tab URL:', tabs[0].url);
  });
});
