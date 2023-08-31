# RevoU Week 11 Assignment - Milestone Project 2

Creates simple Blog application using ExpressJs, Typescript, Swagger, and DOM, also connects it with MySQL database... **in 4 days**....

## Assignment Information

1. Back-end is written using Typescript, ExpressJS, and NodeJS.

2. Back-end and Database is deployed at Railway.app.

3. Database used is MySQL and Sequelize.

4. Front-end is written using HTML, CSS, javascript (for styling), and Typescript (for scripting).

## Advanced Information - Back-End

1. There's 2 role, user and admin.

2. User can create, update, and view other blog posts, while admin can only view blogpost and delete posts.

3. If user accessed invalid API Endpoint, it will be blocked and instead return HTTP 404.

4. After any query, database connection is closed automatically using Sequelize.

5. When connection successfully established, it will be shown on Console.
   
   ![](file://B:\Works\RevoU\Week 9\submission\assets\img\README\2023-08-18-09-57-54-image.png?msec=1693377624666)

## Deploy Link

Back-end: [https://adriantori-w11-be.up.railway.app/](https://adriantori-w11-be.up.railway.app/)

Swagger UI: [Swagger UI](https://adriantori-w11-be.up.railway.app/api-docs)

## API Endpoint

Base URL : adriantori-w11-be.up.railway.app/

| HTTP Request | URL Endpoint     | Explanation                                                                                                                                |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| POST         | /api/v1/register | Register new user, by default it have 'user' role                                                                                          |
| POST         | /api/v1/login    | Login user and generate JWT Token                                                                                                          |
| POST         | /api/v1/posts    | Create new post, can be accessed by 'user' role.                                                                                           |
| GET          | /api/v1/posts    | Get all posts, can be accessed by 'user' and 'admin' role.                                                                                 |
| PATCH        | /api/v1/posts    | Update Title and Body of the post, can only be accessed by 'user' who creates the post.                                                    |
| DELETE       | /api/v1/posts    | Soft-delete the post, can only be accessed by 'admin' role. Post wont be permanently deleted, instead will be flagged as IsDeleted = true. |
| GET          | /api-docs        | Returns Swagger UI documentation                                                                                                           |

## API Request and Response

All of error response are handled by back-end and moved through Error line to both back-end call and front-end alert box.

### Users:

#### POST /api/v1/register

Response:

```json
{
    "username":"string",
    "password":"string"
}
```

Response:

```json
{
    "message": "Error || Successfully registered"
}
```

#### POST /api/v1/login

Request:

```json
{
    "username":"string",
    "password":"string"
}
```

Response:

```json
{
    "message": "Error || Successfully registered"
}
```

### Posts:

#### POST /api/v1/posts

Request:

```json
{
    "postTitle":"string <255>",
    "postBody":"string <511>"
}
```

Response:

```json
{
    "message": "Error || Post successful"
}
```

### GET /api/v1/posts

 Response:

```json
{
    "message": "Error || Get all posts"
}
```

#### PATCH /api/v1/posts

Request:

```json
{
    "postTitle":"string <255>",
    "postBody":"string <511>"
}
```

Response:

```json
{
    "message": "Error || Post updated"
}
```

##### DELETE /api/v1/posts

Request:

```json
{
    "postId": <number>
}
```

Response:

```json
{
    "message": "Error || Post deleted"
}
```

## Advanced Information - Database

in this section, I will explain about Table definition, how to use it, and how Redis works.

### MySQL Database Table Definition:

#### Role table

| Column    | Type                  |
| --------- | --------------------- |
| role_id   | INT Auto_increment PK |
| role_name | VARCHAR(20)           |

```sql
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` enum('user','admin') NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

#### Users table

| Column    | Type                  |
| --------- | --------------------- |
| user_id   | INT Auto_increment PK |
| user_name | VARCHAR(70)           |
| user_pass | VARCHAR(80)           |
| role_id   | INT FK_role_table     |

```sql
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(70) NOT NULL,
  `user_pass` varchar(80) NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_un` (`user_name`),
  KEY `usertable_FK` (`role_id`),
  CONSTRAINT `usertable_FK` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

#### Posts table

| Column         | Type                     |
| -------------- | ------------------------ |
| post_id        | INT Auto_increment PK    |
| post_content   | VARCHAR(100)             |
| user_id        | INT FK_users_table       |
| createdAt      | TIMESTAMP                |
| UpdatedAt      | TIMESTAMP                |
| post_isDeleted | TINYINT(1) [true, false] |

```sql
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_content` varchar(511) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `post_isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_id`),
  KEY `posttable_FK` (`user_id`),
  CONSTRAINT `posttable_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Validation

There's only 2 validation in the entire app, Register has minimum 8 characters and alphanumeric, and Post title and Post Body cant be empty.

## Unit Testing

### 

## Front-end - Simple Explanation
