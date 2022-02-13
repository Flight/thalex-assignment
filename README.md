# Thalex Front-End Developer Technical Assignment Solution

Framework: ReactJS
Unit-tests: Jest + React Testing Library
Integration tests: Cypress
Scss implementation: Dart Sass
Linters: eslint with airbnb config, stylelint, prettier

## Available Scripts

**Backend changes:** CORS headers added
To run the BE:

### `cd mock_backend && yarn && nodemon .`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn cy`

Launches the cypress tests runner. Please don't forget to launch the application before running the tests.

### `yarn lint`

Launches the eslint (typescript) linter.

### `yarn stylelint`

Launches the stylelint (scss) check.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
