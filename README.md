# Project 2: Course Project II

## Online website 
https://wsd-course-project-2-7gea.onrender.com/
admin account: 
email: trueadmin@gmail.com
password: 123456789

## Contents
This application serves as a comprehensive learning tool, providing users with the ability to:

Create and manage topics: Users can generate topics of interest, add associated questions, and administer these topics.
Engage in quizzes: Users can participate in quizzes generated from the pool of questions available within each topic.
Register and log in: Users can create accounts, log in securely, and access personalized functionalities based on their role.

## Functionalities
Topic Management
- Listing Topics: Alphabetically organized list of available topics.
- Adding and Deleting Topics: Admins can add new topics and delete existing ones, managing associated questions effortlessly.
Question Administration
- Adding Questions: Users can append questions to specific topics, contributing to the learning content.
- Answer Option Management: Admins can include answer options, allowing users to interact with questions comprehensively.
Quiz Interaction
- Random Question Selection: Users can engage with random questions from chosen topics.
- Answer Validation: Immediate feedback on quiz responses, aiding learning and self-assessment.

## Starting and shutting down

The course project II is used with Docker Compose.
- First, you need to check if the folder has the project.env or not, if it doesn't have the project.env, include the project.env file in your
own project, and then in docker-compose.yml find the line database: container-name:and write your container's name in there.
- To start the course project II, open up the terminal in the folder that
  contains the `docker-compose.yml` file and type `docker compose up --build`.
- To stop the course project II, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker compose stop`.

## E2E Tests with playwright

The Shared shopping list comes also with 5 tests to check its functions.

To run E2E tests, launch the project using the following command:

```
docker rm $(docker ps -a -q)
docker rmi e2e-playwright
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```



