# silly-translator

A simple web server to translate text using google translator.

## Installation

The simplest way to setup the project is launching the `setup.sh` script in this way in your terminal:
```sh
./setup.sh
```

But if you want to build the project by yourself, follow these steps:

### Build client
- Enter into the client folder:
  ```sh
  cd ./client
  ```

- Install dependencies:
  ```sh
  npm ci
  ```

- Build project:
  ```sh
  npm run build
  ```

### Build server
- Enter into the server folder:
  ```sh
  cd ./server
  ```

- Install dependencies:
  ```sh
  npm ci
  ```

- Build the DB:
  ```sh
  ./typeorm.sh -d ./src/data-source.ts migration:run
  ```

- Insert the seeds into the DB:
  ```sh
  npm run start seeds
  ```

- Transpile the project
  ```sh
  npm run build
  ```

## Usage
- Enter into the server folder:
  ```sh
  cd ./server
  ```

- To create a default configuration folder:
  ```sh
  node ./dist/index.js setup
  ```

- To initialize the server:
  ```sh
  node ./dist/index.js server
  ```

