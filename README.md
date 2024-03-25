# Node.js Seeder Project

This Node.js seeder project aims to provide a comprehensive starting point for developers by offering a standardized structure and essential features commonly found in Node.js applications. With this seeder project, users can kickstart their projects without the hassle of setting up basic functionalities from scratch.

## Features

- **Login API and Register API**: Easily incorporate user authentication with pre-built APIs for user login and registration.
  
- **Video Streaming API**: Implement video streaming capabilities effortlessly with built-in APIs for streaming content.

- **File Upload API**: Simplify file handling by utilizing pre-built APIs for uploading files to the server.

- **JWT Auth Middleware**: Ensure secure authentication by integrating JWT (JSON Web Tokens) authentication middleware into your project.

- **AES Encrypt and Decrypt Function Helper**: Enhance data security with helper functions for AES encryption and decryption.

- **Customizable Configuration Files**: Easily configure your database settings with customizable configuration files.

- **Constants File**: Maintain consistency across your project with a constants file for storing commonly used values.

- **Utils File**: Streamline your development process with utility functions organized within an MVC (Model-View-Controller) structure.

- **Heartbeat Endpoint**: Utilize the `/heartbeat` endpoint to retrieve server information including:
    - Server status
    - Total requests processed (irrespective of success or failure)
    - Average time per request
    - Server timestamp

    Example Request:
    ```bash
    GET /heartbeat
    ```

    Example Response:
    ```json
    {
      "server-status":"Up and running",
      "requests-completed":1,
      "average-response-time":"1.47",
      "server-timestamp":"2024-03-22T06:35:13.643Z"
    }
    ```

    This endpoint provides valuable insights into your server's health and performance metrics.

All feature APIs come with a basic template but are designed to be fully customizable to adapt to your specific project requirements.

## Getting Started

To start using this seeder project, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine using the following command:

    ```bash
    https://github.com/pradeep-c-gopai/nodejs-seeder.git
    ```

2. **Install Dependencies**: Install project dependencies using npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Customize Configuration**: Customize configuration files according to your project requirements.

4. **Start Development**: Begin building your application by adding your business logic on top of the provided structure and features.

## Directories:

1. **Uploads**: Store uploaded files in the `/uploads` directory located in the root directory of your project.

2. **Controllers and Services**: For necessary APIs, `controllers` and `services` have been separated to maintain code modularity and improve scalability. Controllers handle request handling and response formatting, while services contain the business logic and interact with databases or external services.

3. **views and models**: The HTML components can be stored in the `views` directory, and the `models` directory stores the database schema models which define the structure of data.

## License

This project is licensed under the [MIT License](LICENSE), allowing you to use, modify, and distribute it for both commercial and non-commercial purposes.

---

**Disclaimer**: This seeder project is provided as-is without any warranties. While efforts have been made to ensure reliability and security, users are encouraged to review and customize the codebase according to their specific requirements and security standards.
