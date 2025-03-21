# El Dorado Spin Project

## Overview

The El Dorado Spin Project is a gaming platform built with NextJs 14.2.3. The project is structured to maintain clear separation of concerns, ensuring scalability and maintainability.

## Project Structure

The project maintains a specific folder structure:

```
/src
  /app
    /login
      - page.js
    /logout
      - page.js
    - error.js
    - layout.js
    - loading.js
    - page.js
  /components
  /utils
    - actions.ts
    - config.ts
    - utils.js
  - middleware.ts
```

## Getting Started

To get started with the El Dorado Spin Project, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/WebsitesByMTT/milkyway-platform
   ```

2. **Navigate to the project directory:**

   ```sh
   cd milkyway-platform
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   ```

5. **Build the project for production:**

   ```sh
   npm run build
   ```

6. **Start the production server:**
   ```sh
   npm start
   ```

## Folder Structure and Code Details

### src/app

- **login/page.js**

  - Handles user authentication.
  - Collects and validates username and password.
  - Sends a login request to the server and handles the response.
  - Sets a token in cookies and redirects to the home page upon successful login.

- **logout/page.js**

  - Handles user logout.
  - Deletes the user token and redirects to the login page.

- **error.js**

  - Displays a user-friendly error message.
  - Includes functionality to log out the user and redirect to the login page.

- **layout.js**

  - Defines the overall layout of the application.
  - Includes global styles, font settings, and common UI elements.
  - Wraps around the main content of each page.

- **loading.js**

  - Manages the loading state of the application.
  - Displays a loading spinner while content is being fetched.

- **page.js**
  - Renders the home page of the application.
  - Uses various components such as `Header`, `Footer`, `Games`, and `AudioPlayer`.
  - Fetches the initial list of games and provides context providers for user and volume control.

### src/components

- **Reusable UI Components**
  - Contains components such as headers, footers, game cards, and context providers.
  - Ensures consistent UI and reduces code duplication.

### src/utils

- **actions.ts**

  - Contains server actions and utility functions.
  - Interacts with the backend for tasks such as fetching games and handling user authentication.

- **config.ts**

  - Manages environment variables and settings.
  - Centralizes configuration management.

- **utils.js**
  - Provides general utility functions used across the application.

### src/middleware.ts

- **Middleware Functions**
  - Handles server-side logic and request processing.
  - Used for tasks such as authentication, logging, and error handling.

## Contributing

We welcome contributions to the El Dorado Spin Project. To contribute, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   ```sh
   git checkout -b feature-branch
   ```
3. **Make your changes and commit them:**
   ```sh
   git commit -m "Add new feature"
   ```
4. **Push to the branch:**
   ```sh
   git push origin feature-branch
   ```
5. **Create a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

This README provides a comprehensive overview of the El Dorado Spin Project, its structure, and how to get started with development. For detailed information about each component, please refer to the source files and comments within the code
