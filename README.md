<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<div align="center" style="display: flex; justify-content: center">

![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Gitlab](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white)

</div>

# TicketAPI

Amazing API focused on manage users authentication and creation, modification, update and delete of support tickets.

# Features

This API is composed by 4 main modules which are:

- 🔐 **Authentication (REST API)**
  - Authorization control with JWT
  - Creation of users
  - Roles managment
  - Disable/enable user access

---

- 🧾 **Tickets (REST API)**
  - Create, list, update and soft-delete of tickets
  - Filter by:
    - ID or ticket number (both unique keys)
    - Title (partial coincidence)
    - Open/closed tickets
    - Category

---

- 🕸️ **Tickets-Graph (GraphQL API)**
  - Filter by:
    - ID or ticket number (both unique keys)
    - Title (partial coincidence)
    - Open/closed tickets
    - Category

# Get started

# Live version (Digital Ocean)

# Development Environment (Local)

# Examples of usage

## **Authentication**

- **[POST]** ➡ `/auth/register`
- **[POST]** ➡ `/auth/login`
- **[POST]** ➡ `/auth/disable`
- **[POST]** ➡ `/auth/enable`
- **[GET]** ➡ `/auth/check-status`

## **Tickets**

`Needs to be authenticated`

- **[POST]** ➡ `/tickets`
- **[GET]** ➡ `/tickets`
- **[GET]** ➡ `/tickets/category/{category}`
- **[GET]** ➡ `/tickets/status/closed`
- **[GET]** ➡ `/tickets/status/open`
- **[GET]** ➡ `/tickets/{param}`
- **[GET]** ➡ `/tickets/filter/{title}`
- **[PATCH]** ➡ `/tickets/{id}`
- **[DELETE]** ➡ `/tickets/{id}`
