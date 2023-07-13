# silly-translator

A simple web server to translate text using google translator.

## Installation
- Enter into the server folder:
  ```sh
  cd ./server
  ```

- Build the DB:
  ```sh
  ./typeorm -d ./src/data-source.ts migration:run
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

