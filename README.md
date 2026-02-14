# ARE WE COOKED? 🍳

A full-stack meal planning and recipe exploration application built with the MVC architecture. Discover new recipes from around the world, save your favorites, and plan your weekly menu.

## Features

- **Recipe Discovery**: Browse meals by category, area, or starting letter using TheMealDB API.
- **Smart Search**: Find specific recipes by name.
- **Meal Management**: 
  - Save recipes to your personal collection.
  - Mark recipes as **Favorites** for quick access.
  - Add recipes to your **This Week** list for meal planning.
- **Detailed Recipe Views**: View full ingredients list, step-by-step instructions, and YouTube video tutorials.
- **Hybrid Data Source**: Seamlessly switches between the local database (for saved preferences) and the external API (for exploration).
- **Responsive Design**: Clean and modern UI with a custom light theme.

## Tech Stack

- **Backend**: Node.js & Express.js
- **Frontend**: Handlebars.js (MVC Pattern)
- **Database**: PostgreSQL / MySQL (via Sequelize ORM)
- **Authentication**: Express Session & Bcrypt (ready for expansion)
- **API Integration**: TheMealDB API

## Getting Started

### Prerequisites

- Node.js (v14+)
- A local database (PostgreSQL or MySQL)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/tremckinley/are-we-cooked.git
    cd are-we-cooked
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your database credentials:
    ```env
    DB_NAME='are_we_cooked_db'
    DB_USER='your_username'
    DB_PASSWORD='your_password'
    SESSION_SECRET='your_secret_key'
    ```

4.  **Database Configuration**:
    Update `config/connection.js` if necessary to match your database type (PostgreSQL is default in `package.json`).

5.  **Seed the database** (Optional):
    ```bash
    npm run seed
    ```

6.  **Start the server**:
    ```bash
    npm run dev
    ```

The application will be running at `http://localhost:3001`.

## Project Structure

```text
├── config/             # Database connection configuration
├── controllers/        # Route handlers (Home & API)
├── models/             # Sequelize models (Meal, User, etc.)
├── public/             # Static assets (CSS, JS, Images)
├── utils/              # Helper functions (API handlers, DB tools)
├── views/              # Handlebars templates
│   ├── layouts/        # Main page wrapper
│   └── partials/       # Reusable UI components (Meal Card)
└── server.js           # Entry point
```

## Credits

Built by [@tremckinley](https://github.com/tremckinley) for the Codecademy Fullstack Course.
Special shoutout to TheMealDB for the API and Roger Le for the handlebars template and idea support.

---

*Happy Cooking!* 🍲
