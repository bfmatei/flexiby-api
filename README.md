# Flexiby API

## Commands
   - `npm start` - shorthand for `npm start:dev`.
   - `npm install` / `npm i` - install the latest packages according to `package.json`.
   - `npm ci` - install the latest packages according to `package-lock.json`.

### Build
   - `npm run prebuild` - remove build folder.
   - `npm run build` - produces build for production environments.
   - `npm run build:clean` - produces build for production environments after removing the build folder.

### Serve (`http://localhost:3000/`)
   - `npm run start:debug` - start local instance in debug mode.
   - `npm run start:dev` - start local instance in watch mode.
   - `npm run start:prod` - start local instance in production mode.

### Test
   - `npm run test` - run the unit tests in watch mode.
   - `npm run test:debug` - run the unit tests in debug mode.
   - `npm run test:ci` - run the unit tests in ci mode.
   - `npm run test:coverage` - generate code coverage.
   - `npm run lint` - run the linting.
   - `npm run e2e` - run the e2e test.
