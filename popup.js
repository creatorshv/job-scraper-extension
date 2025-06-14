import apiClient from "./apiClient.js";

document.getElementById("extractBtn").addEventListener("click", async () => {
  // Get linkedIn tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Tab validation
  if (!tab || !tab.url.includes("linkedin.com/jobs")) {
    document.getElementById("result").innerText =
      "Please open a LinkedIn job page before extracting.";
    return;
  }

  // Script
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const container = document.querySelector(
          ".jobs-semantic-search-job-details-wrapper"
        );
        return container?.innerText.trim() || null;
      },
    },
    async (injectionResults) => {
      if (chrome.runtime.lastError) {
        document.getElementById("result").innerText =
          "Script injection failed: " + chrome.runtime.lastError.message;
        return;
      }

      // Get extracted text
      const rawText = injectionResults?.[0]?.result;

      if (!rawText) {
        document.getElementById("result").innerText =
          "Job details not found or empty.";
        return;
      }

      document.getElementById("result").innerText = "Sending to backend...";

      // Send text to backend
      const response = await apiClient(rawText);
      document.getElementById("result").innerText = response;
    }
  );
});
