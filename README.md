# Job Scraper Extension
<img width="569" height="285" alt="image" src="https://github.com/user-attachments/assets/ac233e5f-97a5-4025-964b-8e3e3bd9efb4" />


A lightweight browser extension that scrapes job posting details from **LinkedIn** and seamlessly integrates with the [`job-tracker`](https://github.com/creatorshv/job-tracker) MERN application. This tool automates job data collection, eliminates manual entry, and streamlines your job hunting process.

---

## Features
<img width="568" height="285" alt="image" src="https://github.com/user-attachments/assets/54a125d1-66e0-4424-90cf-e124d32f98ca" />

<img width="573" height="281" alt="image" src="https://github.com/user-attachments/assets/a9d0c818-c565-4410-9908-b99ebf5b7d24" />

* **Authentication**: Secure connection to the `job-tracker` backend with JWT authentication.
* **One-Click Scraping**: Extracts job details (title, company, location, salary, job type, link, description and much more) directly from LinkedIn job posts.
* **Error Handling**: Graceful fallback for missing data or failed scrapes.
* **Seamless Syncing**: Sends the scraped data to your `job-tracker` database for centralized management.
* **Lightweight UI**: Minimalist popup interface for quick actions.
* **Basic Controls**: Login/logout, scrape current page, etc.

---

## Prerequisites

* A browser that supports Chrome-compatible extensions (Chrome, Edge, Brave, etc.).

---

## Usage

1. Open LinkedIn and navigate to a job posting.
2. Click on the extension icon.
3. Login using your `job-tracker` credentials.
4. Click **Scrape Job** – the job details will be automatically sent to the tracker application.
5. Check your `job-tracker` dashboard to verify the entry.

---

## Roadmap

* Multi-site support (Indeed, Naukri, Glassdoor, etc.)
* Tagging & custom notes before saving
* Background auto-scraping with notifications
* And more...

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
