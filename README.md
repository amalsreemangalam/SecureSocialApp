# SecureSocialApp
SecureSocialApp is a robust web application built with Node.js, featuring secure user authentication, CRUD operations for social media posts, likes, comments, and optional data encryption.

## Features
- User Registration: Register with email, password, and username.
- User Login: Authenticate using username and password.
- Password Recovery: Reset password via email.
- Social Media Functionality: CRUD operations for posts, like and comment APIs.
- JWT Authentication: Secure all APIs with JSON Web Tokens.
- Optional Data Encryption: Enhance security with encrypted data storage.
## Available for Work
I am actively seeking opportunities and available for freelance or full-time work. Feel free to reach out for collaborations or inquiries.

## Technologies Used
- Frontend: None
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT
- Eamil sender - nodemailer
- Encryption : bcrypt.js
## Deployment:` https://sumit-backend-notebook.glitch.me `
## Get Started
- Clone the repository: `git clone [https://github.com/yourusername/SecureSocialApp.git](https://github.com/sumo47/SecureSocialApp.git)`
- Install dependencies: `npm install`
- Run the development server: `npm start`
## Contribution
Contributions are welcome! Fork the repository, make your changes, and submit a pull request. Let's build something great together.


## API Reference

#### Create User {`POST`}

```http
  /createUser
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `JSON` | **Required**, **Unique**. username  |
| `email`| `JSON` | **Required**, **Unique**. Email of user |
| `password`| `JSON` | **Required**. create password |

#### Login User {GET}

```http
  /login 
```
| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `JSON` | **Required**, **Unique**.|
| `password`| `JSON` | **Required**.  |


#### Forget password {POST}

```http
  /forget
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`| `JSON` | **Required**. Reset password link will be send to Email |

#### Reset password {GET}

```http
  /reset
```

| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`| `string` | **Required**. Ex- http://localhost:4000/reset?token=Feny3yZqIF1qMDqu7OBioWLYVF2sRMWD , token will be Feny3yZqIF1qMDqu7OBioWLYVF2sRMWD |

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`| `JSON` | **Required**. New password|



