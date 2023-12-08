# Its-just-flix-bro

Review app created in React/Express with a MongoDB backend.

# Purpose

For movie and tv watchers who want to read & write reviews, “It’s Just Flix, Bro” is a movie review website that stores user-written reviews. Unlike Rotten Tomatoes, our product looks like Netflix.

# UML Diagram

![uml](https://github.com/KyleQ1/Its-just-flix-bro/assets/102489587/511f0bbd-34ea-4842-9e4e-863af5e7db2c)

# UI Prototype

https://www.figma.com/file/fHzwvWsr5SaZx7xVyfaJy1/It's-just-a-flix%2C-bro?type=design&node-id=0%3A1&mode=design&t=icvfu5KnpWbpaV9O-1

# Dev environment setup

Clone this repo to your local machine.

Run npm install from packages/express-backend, then npm start.

Run npm install from packages/react-frontend, then npm start.


## Testing

Run `npx cypress test` from packages/react-frontend to open the tests. Select e2e and google chrome. Click on login.cy.js to see tests run. Learn more [here](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test).
## Linter

npx prettier . --write

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
