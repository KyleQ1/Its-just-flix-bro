# Its-just-flix-bro

Movie review app created in React/Express with a MongoDB backend.

# Purpose

For movie and tv watchers who want to read & write reviews, “It’s Just Flix, Bro” is a movie review website that stores user-written reviews. Unlike Rotten Tomatoes, our product looks like Netflix.

# UML Diagram

[UML](https://github.com/KyleQ1/Its-just-flix-bro/wiki/UML-Diagram)

# UI Prototype

https://www.figma.com/file/fHzwvWsr5SaZx7xVyfaJy1/It's-just-a-flix%2C-bro?type=design&node-id=0%3A1&mode=design&t=icvfu5KnpWbpaV9O-1

Last Updated: November 1st, 2023

# Dev environment setup

Clone this repo to your local machine.

Request environment variables from one of our contributors!

Run npm install from packages/express-backend, then npm start.

Run npm install from packages/react-frontend, then npm start.

## Testing

First run the app following the steps above.

Run `npx cypress run` or `npx cypress open` from packages/react-frontend to run tests. If using `open`, select Chrome and end to end tests from the Cypress GUI and click on our three test suites. Learn more [here](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test).

## Linter

npx prettier . --write

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
