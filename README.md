# Bike24 Frontend Challenge

##### by Daniel Rauhut

## Prerequisites

For the best experience, using a Linux distro or MacOS is recommended. Please also make sure, that `make` is installed on your system, as container interaction is abstracted away by `Makefile`.

Make comes preinstalled on most distros and MacOS and you can verify its existence by executing

```
make -v
```

If its not present you can install it using your OS-specific package manager, for example

```
[apt / brew / yum / ...] install make
```

## Scope of functions

The user is presented a shop page with an option to select a product and amount which he can add to his shopping cart. Each product has a maximum amount that can be purchased, which can not be exceeded.
The user can navigate to his shopping cart, review and change their order and continue to checkout into limbo.

## Organization

I organized this project using a Trello board in a Scrumban style. I have made the board public: [Trello Orga Board](https://trello.com/invite/b/TMoec0Zp/ATTI5307547e302d5a34ec4620468ff2c7b6F2FAC534/tech-challenge-frontend)

## Technologies

This project uses NextJS, and subsequently React, as its primary framework. Although the most current version of NextJs recommends the new App Router as it's now stable, this project will use the traditional Pages/ Routing, as the App Router has mostly not been adopted yet and this project being time-limited.

I thought about using Redux to manage shopping cart state globally, but I decided that for this rather small project, a Context would suffice.

### Dependencies

| Dependency       | Reasoning                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MUI Autocomplete | Arguably the best Combobox available. Not only are MUI Components consistent and visually pleasing, they put an emphasis on accessibility, too. Also, don't reinvent the wheel! |
| MUI Slider       | One of the best free Slider components available. It also integrates well visually with other MUI Components (Autocomplete). Also, don't reinvent the wheel!                    |
| React Toastify   | A very capable notification library that is easy to use and set up, reinventing the wheel, especially for notifications, would be a huge time eater.                            |
| Jest             | Arguably the most prominent testing library for frontend unit tests in the JS/TS environment.                                                                                   |
| @testing-library | Jest without it would not be the same!                                                                                                                                          |

###<a id="container"></a> Container interaction

This project uses Makefile to abstract away some of the `docker-compose` commands:

| Command    | Effect                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| make build | Build the container                                                            |
| make up    | Start the container                                                            |
| make cli   | Enter container CLI (Since 22.06.23 does not create a new container for shell) |
| make down  | Stop container                                                                 |
| make log   | Open the container logs                                                        |
| make logl  | Open the container logs and follow them live                                   |

### SSR

At the moment, this project utilizes SSG, as the data is statically available and can be fetched serverside from the server-local file system.

Once the main workload is done, I will see if I have the time to implement SSR practices, such as an internal provider route for the data.

### Testing

As is common, `jest` is used in conjunction with `@testing-library` to create unit tests for components. I added a handful of unit tests of varying dimension and intricacy, as well as one integration test between the shop order component and the shopping cart.

To run these tests:

```
npm run test
```

Or for running the test with the `verbose` flag:

```
npm run vtest
```

Or for running test and displaying the test coverage:

```
npm run coverage
```

For this challenge, getting 100% coverage was not the goal, and would be needlessly time consuming for the scope of this project.

### Code Quality

This project leverages multiple methods of aiding in homogenous and predictable code quality
|Tool |Advantage |
|---|---|
|ESLint |Linting according to specific rules to enforce homogenous development between team members |
|Prettier |Code formatting rules to enforce homogenous code appearance between team members |

## Deployment

This project is (almost) ready-to-deploy. The docker setup was configured to use the `NODE_ENV` environment variable to determine which mode to start in. Currently there are two modes available: `development` and `production`, which can be controlled through a `.env` file. Please make sure you copy the `.env.dist` file, rename it to `.env` and assign either `development` or `production` to the `NODE_ENV` variable.

Given Next is a little finicky with the starting port, the port numbers might have to be adjusted manually in the `Dockerfile`, `docker-compose.yml` and `package.json`, if your deployment provider requires using certain ports.

From there on, handling the container is identical between dev and prod. Refer to [Container Interaction](#container) to see which commands are available.

**_In order to deploy to production_**:

1. Make sure that a .env file exists in the project root
2. Set the `NODE_ENV` variable to `production`
3. (optionally) adjust the port in the `Dockerfile`, `docker-compose.yml` and `package.json`
4. Build the container using `make build` (optionally tag it)
5. Push the container image to your preferred Registry
6. Pull the image in your cloud provider and integrate it into a project

## Pitfalls

Of course there were some pitfalls implemented into the requirement. One of them being duplicate product names. Since product names can be identical between different products, the product id was used to differentiate between products, as identical names are a 'to be expected' edge case.

Additionally, the taxRate provided should be used to calculate the gross amount. When looking at BIKE24 web shop, we see that for private customers, the tax is included in the unit price. However, in this scenario, the tax has to be added to the unit price and therefore increases the total gross price, as opposed to being included.

## Shortcomings

I want to use this dedicated little section to once explicitly mention, that I am not a designer, which probably reflects in the visual appearance of my web shop. However, I do like to translate designs to proper frontends (duh).

## Bonus

The cart is serialized, persisted in localstorage and will be deserialized on page load.

For the short time limit this project entailed, decent responsivity in the design is given.
