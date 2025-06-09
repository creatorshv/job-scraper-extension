chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeJob") {
    const jobData = scrapeJobDetails();
    sendResponse({ jobData });
    return true; // Keep message channel open for async sendResponse if needed
  }
});

function scrapeJobDetails() {
  // Grab job title
  const titleElem = document.querySelector("h1");
  const title = titleElem ? titleElem.innerText.trim() : null;

  // Grab company name
  const companyElem = document.querySelector(
    ".jobs-unified-top-card__company-name a, .jobs-unified-top-card__company-name"
  );
  const company = companyElem ? companyElem.innerText.trim() : null;

  // Grab location
  const locationElem = document.querySelector(".jobs-unified-top-card__bullet");
  const location = locationElem ? locationElem.innerText.trim() : null;

  // Grab posting date (e.g. '3 days ago')
  const dateElem = document.querySelector(
    "span.jobs-unified-top-card__posted-date"
  );
  const postingDate = dateElem ? dateElem.innerText.trim() : null;

  // Number of applicants
  const applicantsElem = document.querySelector(
    ".jobs-unified-top-card__applicant-count"
  );
  const applicants = applicantsElem ? applicantsElem.innerText.trim() : null;

  // Skills required (usually in skill tags, adapt as needed)
  const skillsElems = Array.from(
    document.querySelectorAll(".job-criteria__list li span.job-criteria__text")
  );
  const skills = skillsElems.length
    ? skillsElems.map((el) => el.innerText.trim())
    : [];

  // Job description
  const descElem = document.querySelector(".jobs-description-content__text");
  const description = descElem ? descElem.innerText.trim() : null;

  return {
    title,
    company,
    location,
    postingDate,
    applicants,
    skills,
    description,
  };
}
