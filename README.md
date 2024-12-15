# SEOBoost - Keyword Analysis Tool

## Overview

SEOBoost is a web application designed to help users analyze keywords, track keyword trends, and get SEO recommendations. The app allows users to input a keyword or phrase and provides detailed insights into search volume, competition, and SEO optimization techniques.

## Features

- **Trending Keywords**: Once logged in, the system displays the top trending keywords based on Google Trends. These are the most searched keywords in various regions.
  
- **Keyword Research**: Users can input a keyword or phrase to be analyzed. The system pulls data from multiple sources to provide details about search volume, competition level, and keyword relevance.

- **SEO Analysis**: After selecting a keyword, users can receive content optimization recommendations. The tool suggests how the keyword should be used within text and provides related keywords or queries that are highly relevant and frequently searched by users.

## Tech Stack

- **Next.js**: Used for building the frontend and backend of the application.
- **MongoDB**: For storing user data, search history, and keyword analysis results.
- **Google Trends**: To fetch real-time data about trending keywords.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/SEOBoost.git
   ```

2. Install dependencies:
   ```bash
   cd SEOBoost
   npm install
   ```

3. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and provide the necessary values:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

- **Login**: Users must log in to access the keyword analysis features. Use your credentials to sign in.
- **Keyword Trend Display**: After logging in, the app will show a list of the top trending keywords, sourced from Google Trends.
- **Keyword Analysis**: Input a keyword or phrase into the search bar to begin analysis. The app will provide details about the keyword’s search volume, competition, and relevance.
- **SEO Recommendations**: After the analysis, SEOBoost will give you recommendations on how to optimize your content, including the use of related keywords and queries.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Google Trends API](https://trends.google.com/trends/?geo=US)

---
