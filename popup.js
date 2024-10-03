document.getElementById("toggle-blocker").addEventListener("change", function(e) {
  const isEnabled = e.target.checked;

  // Update the background script with the status
  chrome.storage.local.set({ adBlockerEnabled: isEnabled });
});
