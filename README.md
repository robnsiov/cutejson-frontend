# Cute JSON

**Cute JSON** is a system designed to generate APIs automatically from defined JSON keys. It supports multiple HTTP methods (GET, PUT, POST, DELETE) and includes additional features like fake data generation, an online JSON editor, and version control. The frontend is built using **Next.js** to provide a user-friendly interface to interact with the API system.

## Features

- **Auto-Generated APIs**: Easily define JSON keys to automatically generate APIs with standard HTTP methods.
- **Fake Data Generation**: Generates sample fake data to test your APIs on the fly.
- **Online JSON Editor**: A powerful editor embedded into the system to directly manipulate your JSON structure.
- **Version Control**: Track and manage different versions of your JSON data to ensure proper versioning in your API development.

## Installation

To set up the project on your local machine, follow the steps below.

### Prerequisites

- **Node.js** (v18.x or later)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/robnsiov/cutejson-frontend.git
cd cutejson-frontend
```

## Install Dependencies
Using npm:
```npm install```

## Environment Setup

To run the project, you need to set the environment variable for the base URL of your backend API. Create a .env file in the root of your project and add the following line:
```NEXT_PUBLIC_BASE_URL=https://api.backend.com```
You can replace https://api.backend.com with the actual URL of your backend API.

## Running the Development Server
To start the development server, run the following command:

Using npm:
```npm run dev```

The server will start on http://localhost:3000. You can now open your browser and go to that URL to interact with the Cute JSON system.








