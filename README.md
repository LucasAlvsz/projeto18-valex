<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Get the card statement
-   Creates cards
-   Activate / Block / Unblock a card
-   Recharges a card
-   Make card payments

</br>

## API Reference

### Get card statements

```http
  GET /card/statements
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**. user full name       |
| `number`         | `string` | **Required**. card number          |
| `expirationDate` | `string` | **Required**. card expiration date |

`Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"`

#

### Create a card

```http
  POST /card/create/${emploeeId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `emploeeId` | `integer` | **Required**. user Id |

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body   | Type       | Description             |
| :----- | :--------- | :---------------------- |
| `type` | `[string]` | **Required**. card type |

`Valid types: [groceries, restaurant, transport, education, health]`

</br>

#### Response:

```json
{
	"number": "1111 1111 1111 1111",
	"cardholderName": "NAME N NAME",
	"securityCode": "111",
	"expirationDate": "01/27",
	"isVirtual": false,
	"isBlocked": false,
	"type": "card type",
	"cvc": "111"
}
```

#

### Activate a card

```http
  PUT /card/activate
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**. user full name       |
| `number`         | `string` | **Required**. card number          |
| `expirationDate` | `string` | **Required**. card expiration date |
| `password`       | `string` | **Required**. card password        |
| `cvc`            | `string` | **Required**. card cvc             |

`Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"`

`Password max length: 4`

`Cvc max length: 3`

#

### Block a card

```http
  PUT /card/block
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**. user full name       |
| `number`         | `string` | **Required**. card number          |
| `expirationDate` | `string` | **Required**. card expiration date |
| `password`       | `string` | **Required**. card password        |

`Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"`

#

### Unblock a card

```http
  PUT /card/unblock
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**. user full name       |
| `number`         | `string` | **Required**. card number          |
| `expirationDate` | `string` | **Required**. card expiration date |
| `password`       | `string` | **Required**. card password        |

`Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"`

#

### Recharge a card

```http
  POST /card/recharge
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `name`           | `string`  | **Required**. user full name       |
| `number`         | `string`  | **Required**. card number          |
| `expirationDate` | `string`  | **Required**. card expiration date |
| `amount`         | `integer` | **Required**. recharge amount      |

`Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"`

#

### Card payment

```http
  POST /card/payment/POS/${businessId}
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Params       | Type      | Description               |
| :----------- | :-------- | :------------------------ |
| `businessId` | `integer` | **Required**. business Id |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `name`           | `string`  | **Required**. user full name       |
| `number`         | `string`  | **Required**. card number          |
| `expirationDate` | `string`  | **Required**. card expiration date |
| `password`       | `string`  | **Required**. card password        |
| `amount`         | `integer` | **Required**. payment amount       |

`Number Format: "1111 1111 1111 1111"`

`Expiration Date Format: "MM/YY"`

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`PROD_MODE = boolean #recommended:false`

`SECRET_KEY = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/LucasAlvsz/projeto18-valex
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript

</br>

## Acknowledgements

-   [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
-   [Awesome README](https://github.com/matiassingers/awesome-readme)
-   [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   [@LucasAlvsz](https://www.github.com/LucasAlvsz) 🪐
