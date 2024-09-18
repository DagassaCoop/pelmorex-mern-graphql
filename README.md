# Perlmorex-Mern-GraphQL

## Description
Test task for Pelmorex.

## Installation

### Client

```
cd client/

npm i
```

### Server

```
cd server/

npm i
```

## Usage

### Client

```npm run dev```

Use link: http://localhost:3000/

### Server

```npm run dev```

Use link: http://localhost:4000/graphql

## Technologies

### Client

* React - JS framework
  * React Router - routing
  * React Query - data fetching and management
  * React Hook Form - validation
  * Yup - validation schema builder
  * Notistack - global notifications
* Apollo Client - graphql provider for client
  * GraphQL
* Axios - http requests
* TypeScript
* TailwindCSS - for styles
* Material UI - ready UI components
* JWT - authentication

### Server

* Express - Node.js framework
  * Cors - server middleware for CORS policy
* MongoDB - database
  * Mongoose - schema builder
* Apollo Server - graphql provider for server
  * GraphQL
* JWT - authentication
  * Express JWT - express plugin for using jwt
  * Bcrypt - hashing passwords
* Typescript


## Technical Decisions

### Client

#### Fetching

I chose the combination of React Query and Axios. React Query handles data workflows efficiently, offering error handling and caching, while Axios allows for easy customization of HTTP clients and requests.

#### UI Libraries

I combined Material UI and TailwindCSS for UI development. This approach offers a variety of ready-to-use components with straightforward customization options.

#### Form Validation

For form validation, I selected React Hook Form and Yup. These libraries integrate well with TypeScript, and Yup’s builder is well-documented with clear usage examples.

### Server

#### Communication between server and client

I opted for GraphQL over REST, considering that your product utilizes this technology.

#### Authentication

For authentication, I selected JWT instead of Sessions, given that your platform manages a large volume of user data. Storing all sessions on your servers could become costly. Additionally, JWT eliminates the need for extra requests to verify user session status.

#### Schema builder

I decided to use Mongoose due to its popularity as a MongoDB schema builder. It has strong community support and comprehensive documentation.