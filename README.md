This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

<<<<<<< HEAD
First, run the development server:
=======
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
>>>>>>> dev

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

<<<<<<< HEAD
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
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

## Bonus

The cart is serialized, persisted in localstorage and will be deserialized on page load.
>>>>>>> dev
