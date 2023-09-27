# Church RESTful API Documentation

Welcome to the Church RESTful API documentation! This API is built using the Laravel framework and is designed to facilitate the management of church-related information and services. Whether you're a developer looking to integrate with this API or an administrator seeking to understand its capabilities, this guide will provide you with all the information you need.

## Table of Contents

1. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
2. [Authentication](#authentication)
    - [API Key](#api-key)
3. [Endpoints](#endpoints)
    - [1. Congregations](#1-congregations)
    - [2. Members](#2-members)
    - [3. Events](#3-events)
    - [4. Sermons](#4-sermons)
    - [5. Donations](#5-donations)
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
   git clone https://github.com/yourchurch/api.git
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

## Authentication

### API Key

To access the Church API, you need to include an API key in the headers of your HTTP requests. You can obtain an API key by contacting the system administrator. Include the API key in your request headers as follows:

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

The Church API provides several endpoints to interact with different aspects of church management. Below is an overview of the available endpoints:

### 1. Congregations

- **GET /api/congregations**: Retrieve a list of all congregations.
- **GET /api/congregations/{id}**: Retrieve information about a specific congregation by ID.
- **POST /api/congregations**: Create a new congregation.
- **PUT /api/congregations/{id}**: Update information about a congregation.
- **DELETE /api/congregations/{id}**: Delete a congregation.

### 2. Members

- **GET /api/members**: Retrieve a list of all church members.
- **GET /api/members/{id}**: Retrieve information about a specific member by ID.
- **POST /api/members**: Create a new member.
- **PUT /api/members/{id}**: Update information about a member.
- **DELETE /api/members/{id}**: Delete a member.

### 3. Events

- **GET /api/events**: Retrieve a list of all church events.
- **GET /api/events/{id}**: Retrieve information about a specific event by ID.
- **POST /api/events**: Create a new event.
- **PUT /api/events/{id}**: Update information about an event.
- **DELETE /api/events/{id}**: Delete an event.

### 4. Sermons

- **GET /api/sermons**: Retrieve a list of all sermons.
- **GET /api/sermons/{id}**: Retrieve information about a specific sermon by ID.
- **POST /api/sermons**: Create a new sermon.
- **PUT /api/sermons/{id}**: Update information about a sermon.
- **DELETE /api/sermons/{id}**: Delete a sermon.

### 5. Donations

- **GET /api/donations**: Retrieve a list of all donations.
- **GET /api/donations/{id}**: Retrieve information about a specific donation by ID.
- **POST /api/donations**: Record a new donation.
- **PUT /api/donations/{id}**: Update information about a donation.
- **DELETE /api/donations/{id}**: Delete a donation.

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request. In case of an error, the response will include a JSON object with an error message and, if applicable, additional details about the error.

## Rate Limiting

To prevent abuse of the API, rate limiting is enforced. By default, you can make up to 100 requests per minute. If you exceed this limit, you will receive a `429 Too Many Requests` response.

## Pagination

For endpoints that return multiple items (e.g., congregations, members), pagination is implemented. You can specify the page number and the number of items per page using query parameters. Example: `/api/congregations?page=1&per_page=10`.

## Examples

To help you get started, here are some example API requests:

- **List all congregations**:

  ```
  GET /api/congregations
  ```

- **Retrieve information about a specific member (ID: 1)**:

  ```
  GET /api/members/1
  ```

- **Create a new event**:

  ```
  POST /api/events
  Body: {
      "title": "Sunday Service",
      "date": "2023-09-10",
      "description": "Weekly church service."
  }
  ```

## Conclusion

This documentation provides an overview of the Church RESTful API built with Laravel. You can now start using the API to manage church-related information and services. If you have any questions or encounter any issues, please reach out to the system administrator for assistance.

Happy coding and may your church activities be enriched by this API!
