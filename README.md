# Church RESTful API Documentation

Welcome to the Church RESTful API documentation! This API is built using the Laravel framework(v.10) and is designed to facilitate the management of church-related information and services. Whether you're a developer looking to take advantage this API or an administrator seeking to understand its capabilities, this guide will provide you with all the information you need. This full stack application is part of my mission to improving the online visibility of the church as well as promoting the gospel in my own little way. Please note that this project is still in the development face. 

## Table of Contents

1. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
2. [Authentication](#authentication)
    - [API Key](#api-key)
3. [Endpoints](#endpoints)
    - [1. Users](#1-users)
    - [2. Events](#2-events)
    - [3. Sermons](#3-sermons)
    - [4. Donations](#4-donations)
    - [5. Blogs](#5-blogs)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Pagination](#pagination)
7. [Examples](#examples)
8. [Conclusion](#conclusion)

## Getting Started

### Prerequisites

Before you can start using the Church API, ensure you have the following prerequisites installed on your system:

- [PHP](https://www.php.net/) (>= 8.1.0)
- [Composer](https://getcomposer.org/)
- [Laravel](https://laravel.com/docs/8.x/installation)
- [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) or another compatible database system
- A web server (e.g., Apache, Nginx)
- [Postman](https://www.postman.com/) or a similar API testing tool (optional)

### Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/dayoesq/church.git
   ```

2. Navigate to the project directory:

   ```bash
   cd api
   ```

3. Install the project dependencies using Composer:

   ```bash
   composer install
   ```

4. Create a copy of the `.env.example` file and rename it to `.env`. Update the database configuration in the `.env` file with your own database credentials.

5. Generate an application key:

   ```bash
   php artisan key:generate
   ```

6. Run database migrations to create the necessary tables:

   ```bash
   php artisan migrate
   ```

Your Church API should now be up and running on `http://localhost:8000`.

## Endpoints

The Church API provides several endpoints to interact with different aspects of church management. Below is an overview of the available endpoints:

### 1. Users

- **GET /api/users**: Retrieve a list of all church members.
- **GET /api/users/{id}**: Retrieve information about a specific member by ID.
- **POST /api/users**: Create a new member.
- **PATCH /api/users/{id}**: Update information about a member.
- **DELETE /api/users/{id}**: Delete a member.

### 2. Events

- **GET /api/events**: Retrieve a list of all church events.
- **GET /api/events/{id}**: Retrieve information about a specific event by ID.
- **POST /api/events**: Create a new event.
- **PATCH /api/events/{id}**: Update information about an event.
- **DELETE /api/events/{id}**: Delete an event.

### 3. Sermons

- **GET /api/sermons**: Retrieve a list of all sermons.
- **GET /api/sermons/{slug}**: Retrieve information about a specific sermon by slug.
- **POST /api/sermons**: Create a new sermon.
- **PATCH /api/sermons/{slug}**: Update information about a sermon.
- **DELETE /api/sermons/{slug}**: Delete a sermon.

### 4. Projects

- **GET /api/projects**: Retrieve a list of all projects.
- **GET /api/projects/{id}**: Retrieve information about a specific project by ID.
- **POST /api/projects**: Record a new project.
- **PATCH /api/projects/{id}**: Update information about a projects.
- **DELETE /api/projects/{id}**: Delete a project.

- ### 5. Blogs

- **GET /api/blogs**: Retrieve a list of all blogs.
- **GET /api/blogs/{slug}**: Retrieve information about a specific blog by slug.
- **POST /api/blogs**: Post a new blog.
- **PATCH /api/blogs/{slug}**: Update information about a slug.
- **DELETE /api/blogs/{slug}**: Delete a blog.

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request. In case of an error, the response will include a JSON object with an error message and, if applicable, additional details about the error.

## Rate Limiting

To prevent abuse of the API, rate limiting is enforced. By default, you can make up to 100 requests per minute. If you exceed this limit, you will receive a `429 Too Many Requests` response.

## Pagination

For endpoints that return multiple items (e.g., congregations, members), pagination is implemented. You can specify the page number and the number of items per page using query parameters. Example: `/api/congregations?page=1&per_page=10`.

## Examples

To help you get started, here are some example API requests:

- **Retrieve information about a specific user (ID: 1)**:

  ```
  GET /api/users/1
  ```

  - **Create a new event**:

    ```
    POST /api/events
    Body: {
        "title": "Sunday Service",
        "description": "Weekly church service."
        "organizedBy": "John Doe."
        "anchor": 1,
        "startsAt": "2023-09-10 15:00",
        "endsAt": "2023-09-10 15:45",
    }
    ```

## Conclusion

This documentation provides an overview of the Church RESTful API built with Laravel. You can now start using the API to manage church-related information and services. If you have any questions or encounter any issues, please reach out to the system administrator for assistance.

Happy coding and may your church activities be enriched by this API!
