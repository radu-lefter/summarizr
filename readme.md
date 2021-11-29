# Summarizr API

> Backend API for Summarizr application, which is a summary collection website

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, summaries, translations and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo

The API is live at []()

Extensive documentation with examples [here](https://documenter.getpostman.com/view/14302851/UVJcmcEb)

- Version: 1.0.0
- License: MIT
- Author: Radu Lefter
