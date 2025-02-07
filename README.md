# Brain Buzzer Blitz

Brain Buzzer Blitz is a real-time online quiz competition platform that allows users to test their knowledge and challenge others in various academic streams and categories. This project utilizes a combination of technologies, including Spring Boot, ReactJS, Hibernate, Postman, and Websockets, to create an engaging and interactive quiz experience.

## Quiz Modes

- **Practice:** Test your knowledge with a graded quiz.
- **Compete with Stranger:** Challenge online users by sending all online users notifications with quiz details. Once they accept, engage in a real-time quiz battle.
- **Challenge Your Friend:** Create a secret buzzer code and invite friends to join a quiz competition using the code.

## Features

- **Real-time Gameplay:**
  - Utilizes Websockets for real-time notifications and synchronization.
  - Only one user gets to answer a question at a time.
  - Both players receive the same questions simultaneously.
  - Answer questions quickly to earn more points while being penalized for delays.

- **Quiz Modes:**
  - **Practice:** Test your knowledge with a graded quiz.
  - **Compete with Stranger:** Challenge online users by sending all online users notifications with quiz details. Once they accept, engage in a real-time quiz battle.
  - **Challenge Your Friend:** Create a secret buzzer code and invite friends to join a quiz competition using the code.

- **Stream and Category Selection:**
  - Choose from various academic streams and subcategories.
  - Customize the number of questions and difficulty level.

- **Ranking System:**
  - Rankings are determined using the **Elo algorithm**.
  - Track your global ranking and institution-level leaderboard.

## Tech Stack

Brain Buzzer Blitz leverages the following technologies:

- **Spring Boot:** Backend framework for building robust and scalable applications.
- **ReactJS:** Frontend library for creating interactive user interfaces.
- **Hibernate:** Object-relational mapping (ORM) for managing database interactions.
- **Postman:** Used for API development and testing.

### Microservices

Brain Buzzer Blitz utilizes three microservices for various purposes:

- **User Management Microservice**
- **Ranking and Leaderboard Microservice**
- **Buzzer Handling Microservice**

## Gameplay

Challenge your knowledge and compete with friends or strangers in a thrilling quiz competition. Get ready to experience Brain Buzzer Blitz!

