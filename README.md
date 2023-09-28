<div align="center">

# Elixir, Graphql, Vite Todo App Tutorial

A beginner step-by-step guide to building a simple todo app utilizing an Elixir backend, Graphql API, and Vite/React frontend.

<br />

![Elixir](https://img.shields.io/badge/elixir-%234B275F.svg?style=for-the-badge&logo=elixir&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br /><br />

</div>

# About the Project

Elixir is a really powerful tool that has been out for several years. Though Elixir has a great frontend framework in Phoenix and Liveview, some developers aren't familiar with building an app in this framework. This tutorial exposes how to get started with Elixir while still having the ability to utilize Typescript and React on the frontend.

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="readme_images/todo_screenshot_dark.png">
  <img alt="Todo app screenshot" src="readme_images/todo_screenshot_light.png">
</picture>

<br />

### Prerequisites

Before you get started, there are a few things you should have installed on your system. You can click the links below to find installation instructions.

* Postgres
* Erlang
* Elixir
* Node package manager: `pnpm`, `npm`, or `yarn`

<br />

## Running the finished app locally

If you want to check out the finished Todo app locally make sure you have the prerequisites above and follow these steps:

Clone the repo
```bash
git clone git@github.com:headwayio/todo_ex_vite.git && cd todo_ex_vite
```

Create the database, install dependencies, and seed the initial user data
```bash
mix setup
```

Run the app
```
mix start
```

You should now be able to visit the following urls to play with the application:

**GraphQL API**: http://localhost:4000/graphiql

**Frontend**: http://localhost:5173
