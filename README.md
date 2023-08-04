# eCommerce Application

## Description

Welcome to e-commerce car sales application. This application provides everyone with the opportunity to purchase a car online at any time and from anywhere, without having to visit a physical car dealership, while providing a wide selection, detailed information and convenient purchase conditions.

The application includes the following main pages:

Login and registration pages. Pages where users can log in to their account or register to create a new account. After successful authentication or registration, users are redirected to the main page, where they can access all the functions and features of the application available to them.

Main page. A page that displays all the basic information, all available car categories and links to all other pages of the application.

Catalog product page. This page displays cars of one specific category in the form of a list with an image and important information of the car.

Detailed product page - the page contains detailed information about a specific car that can be useful to the buyer when choosing with the subsequent possibility of adding the selected car to the cart.

User profile page. This section contains the personal data of the registered user (name, date of birth and list of addresses). As well as tools that allow the user to edit this data.

The shopping cart page contains information about the cars that the user added to the shopping cart for purchase and with the subsequent possibility of switching to the registration of this purchase.

The about us page. This page contains information about the development team (names, rules, a brief biography, photos and a link to GitHub profiles).

The application runs on the CommerceTools platform. This platform provides tools for creating, managing and scaling online stores and digital commercial projects.

## The following technologies are used in the project:

-   HTML: used to create the structure of the page.
-   CSS/SASS: used for styling elements and creating user interface.
-   JavaScript: used to add interactivity and handle events on the page.
-   TypeScript: A language that compiles to JavaScript that helps provide typing and more reliable programming.
-   SPA (Single-Page Application): web applications or websites that consist of a single HTML page.

## Development tools:

-   Webpack: A build tool for developing web applications.
-   ESLint: A static code analysis tool used to find errors in code.
-   Prettier: automatic code formatting tool.
-   Husky: tool for creating git hooks
-   Jest: JavaScript testing toolkit.

## Design

-   Figma: cross-platform design tool with built-in sharing and collaboration features.

## Project management

-   Jira: project management, issue tracking and software development management tool.
-   Discord: a platform for communication between developers.

## Scripts

running ESLint (file: package.json)  
"eslint": "eslint ./src"

running Prettier (file: package.json)  
"prettier": "prettier ./src --write"

running Jest tests (file: package.json)  
"test": "jest .src/"

## Instructions for running the project locally

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/damaloonazhret/eCommerce-Application.git`
2. Change to the dev-env-config branch: `git checkout develop`
3. Install all dependencies: `npm install`
4. Run the webpack builder: `npm start`

After the last step, the project should launch in the browser at http://localhost:8081/
