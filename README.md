# Bike24 Frontend Challenge

##### by Daniel Rauhut

## Scope of functions

The user is presented a shop page with an option to select a product and amount which he can add to his shopping cart. Each product has a maximum amount that can be purchased, which can not be exceeded.
The user can navigate to his shopping cart, review and change their order and continue to checkout into limbo.

## Organization

I organized this project using a Trello board in a Scrumban style. I have made the board public: [Trello Orga Board](https://trello.com/invite/b/TMoec0Zp/ATTI5307547e302d5a34ec4620468ff2c7b6F2FAC534/tech-challenge-frontend)

## Technologies

This project uses NextJS, and subsequently React, as its primary framework. Although the most current version of NextJs recommends the new App Router as it's now stable, this project will use the traditional Pages/ Routing, as the App Router has mostly not been adopted yet and this project being time-limited.

### Project structure

### Dependencies

| Dependency       | Reasoning                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| MUI Autocomplete | Arguably the best Combobox available. Not only are MUI Components consistent and visually pleasing, they put an emphasis on accessibility, too. |

### Container interaction

This project uses Makefile to abstract away some of the `docker-compose` commands:

| Command    | Effect              |
| ---------- | ------------------- |
| make build | Build the container |
| make up    | Start the container |
| make cli   | Enter container CLI |
| make down  | Stop container      |

### SSR

### Testing

### Code Quality

This project leverages multiple methods of aiding in homogenous and predictable code quality
|Tool |Advantage |
|---|---|
|ESLint |Linting according to specific rules to enforce homogenous development between team members |
|Prettier |Code formatting rules to enforce homogenous code appearance between team members |

## Deployment to the Cloud
