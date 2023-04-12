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

Our Ticket API uses NestJS, Postgres (RDS AWS) and S3 Buckets to take advantage of Cloud Services like Amazon Web Services.

---

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

---

- 🗂️ **File-Management (S3)**
  - Using S3 Bucket to save images and then save the **S3 file url** in the database.

---
# Deployment

There are two ways to deploy the app:

- ## AWS (using terraform and a T2.Large EC2)

    ### Steps:
    1. Clone this repo
    ```
    git clone https://github.com/joaquinzxy/ticket-app-nest-final.git
    ```
    2. Install AWS CLI 
    ```
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
    ```
    3. Use:  `aws configure` to set your credentials or you can place it on  `~/.aws/configure`
    4. Install Terraform CLI: [Documentation]('https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
    5. Being in `./terraform` folder, execute:
    ```
    terraform init
    terraform plan
    terraform apply
    ```
    6. It will take a 1-2 minutes to be fully-deployed 
    7.  You will see the in the output the public IP where you can access to the API EC2

- ## Local (using Docker Compose)

    ### Steps:
    1. Clone this repo
    ```
    git clone https://github.com/joaquinzxy/ticket-app-nest-final.git
    ```
    2. Install AWS CLI 
    ```
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
    ```
    3. Use:  `aws configure` to set your credentials or you can place it on  `~/.aws/configure`
    4. Run `docker-compose up -d` to instance the API and DB
    5. Finally the API ENDPOINT will be `http://localhost:3000`

---

# Examples of usage

## REST API (CRUD)

### Check ```http://localhost:3000/api/docs``` or ```http://{ec2-publicip}:3000/api/docs``` to see Swagger Documentation

### **Authentication**

- **[POST]** ➡ `/auth/register`
- **[POST]** ➡ `/auth/login`

`Needs to be authenticated`

- **[POST]** ➡ `/auth/disable`
- **[POST]** ➡ `/auth/enable`
- **[GET]** ➡ `/auth/check-status`

### **Tickets**

`Needs to be authenticated`

- **[POST]** ➡ `/tickets`
- **[GET]** ➡ `/tickets`
- **[GET]** ➡ `/tickets?page={page}&limit={limit}`
- **[GET]** ➡ `/tickets/category/{category}`
- **[GET]** ➡ `/tickets/status/closed`
- **[GET]** ➡ `/tickets/status/open`
- **[GET]** ➡ `/tickets/{param}`
- **[GET]** ➡ `/tickets/filter/{title}`
- **[PATCH]** ➡ `/tickets/{id}`
- **[DELETE]** ➡ `/tickets/{id}`

---

## GRAPHQL (only Queries)

### Check ```http://localhost:3000/graphql``` or ```http://{ec2-publicip}:3000/graphql``` to use GraphQL Playground

- **[GET ALL TICKETS]** 
```
{
  tickets(limit: 10, page: 1){
    id
    ticketNumber
    title
    issue
    category
    orderDetail
    isClosed
    createdAt
    modifiedAt
    imageProductUrl
  }
}
```

- **[FIND ONE]** 
```
{
  ticket(id: "ea618b6b-74ed-478b-a1e8-403d1747b85f"){
    id
    ticketNumber
    title
    issue
    category
    orderDetail
    isClosed
    createdAt
    modifiedAt
    imageProductUrl
  }
}
```

- **[FILTER BY CATEGORY]** 
```
{
  filterByCategory(categoryName: "change"){
    id
    ticketNumber
    title
    issue
    category
    orderDetail
    isClosed
    createdAt
    modifiedAt
    imageProductUrl
  }
}
```

- **[FILTER BY TITLE]** 
```
{
  filterByTitle(titleParam: "printer"){
    id
    ticketNumber
    title
    issue
    category
    orderDetail
    isClosed
    createdAt
    modifiedAt
    imageProductUrl
  }
}
```

- **[GET CLOSED TICKETS]** 
```
{
  closedTickets(){
    id
    ticketNumber
    title
    issue
    category
    orderDetail
    isClosed
    createdAt
    modifiedAt
    imageProductUrl
  }
}
```

- **[GET OPEN TICKETS]** 
```
{
  openTickets(){
    id
    ticketNumber
    title
    issue
    category
    orderDetail
    isClosed
    createdAt
    modifiedAt
    imageProductUrl
  }
}
```
---
