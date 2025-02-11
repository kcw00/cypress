# cypress

To install Cypress, run this command
`npm install --save-dev cypress`

Define npm script for running test in package.json

`"cypress:open": "cypress open"` add this into scripts section

To run start Cypress, run this command
`npm run cypress:open`

When Cypress is opened,
1. Select `E2E Testing` 
2. Select `Chrome` broswer
3. Select `Create a new spec`
4. Enter this path for your new spec `cypress/e2e/{yourprojectname}.cy.js`

The test cases have been defined with the it method

Cypress commands
cy.visit opens the web address given to it
cy.contains searches for the string it received

If you see the Eslint error in your file, 
1. install eslint-plugin-cypress
`npm install eslint-plugin-cypress --save-dev`
2. change the config in .eslintrc.cjs
add `"cypress/globals": true` into `"env"` section
add `"react", "jest", "cypress"` into `"plugin"` section

