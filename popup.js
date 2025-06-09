document.getElementById("extractBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.url.includes("linkedin.com/jobs")) {
    document.getElementById("result").innerText =
      "Please open a LinkedIn job page before extracting.";
    return;
  }

  // Inject script into the current tab to extract job details
  chrome.scripting.executeScript(
    // details: An object describing the script to inject.
    {
      target: { tabId: tab.id },
      func: () => {
        const container = document.querySelector(
          ".jobs-semantic-search-job-details-wrapper"
        );
        if (!container) {
          return "Job details container not found on this page.";
        }
        return (
          container.innerText.trim() || "No visible job details text found."
        );
      },
    },
    // A promise return value
    (injectionResults) => {
      if (chrome.runtime.lastError) {
        document.getElementById("result").innerText =
          "Script injection failed: " + chrome.runtime.lastError.message;
        return;
      }
      const text = injectionResults?.[0]?.result || "Failed to extract text.";
      document.getElementById("result").innerText = text;
    }
  );
});
