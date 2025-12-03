# 🎬 MovieDB WebApp
## 🚀 Features

- **Browse Movies**: Paginated list of popular movies
- **Genre Filtering**: Filter movies by genres using dropdown or genre badges
- **Search**: Search movies by title or partial title
- **Movie Details**: View comprehensive information including ratings, cast, budget, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn**

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/AndriyTok/movie-db_webapp.git
cd movie-db_webapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

> **Note**: Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)

4. **Run the development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🎯 Usage

### Browsing Movies
- The home page displays a grid of popular movies
- Use pagination at the bottom to navigate through pages

### Filtering by Genre
- Click **Жанри** in the header to open the dropdown
- Select a genre to filter movies
- Click on genre badges below movie posters for quick filtering
- Select **Всі фільми** to reset filters

### Searching Movies
- Use the search input in the header
- Type movie title and press Enter or click 🔍
- Search works with partial titles

### Viewing Movie Details
- Click on any movie card to view full details
- Details page shows: rating, genres, release date, runtime, budget, revenue, overview, and production companies
- Click on genres to filter all movies by that genre
- Use **← Назад** button to return to the previous page


