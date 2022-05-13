# QuizzApp
Web app that allows users to create, store, acces and solve quizzes (quizzes consist of arbitrary ammount of multiple-choice questions). Logged users sore their anser statistics on the server and can tag questions as memorized/nedds-to-review.

## Technology Stack

### Data Base
Mongo.db and Spring Data <br>
[detailed collecion descriptions](quiz/backend/COLLECTIONS.md)

#### Collections 

#### `users`
stores user data.

#### `quizzes`
stores quiz data. <br>
(title, description, author, visibility, questions with answers)

#### `quizstatistics`
stores quiz statistics for a single quiz. <br> 
(tag, numbber of correct and wrong answers for every question in the quiz)

### Server
Java Spring Boot <br>
rest api server - [Endpoinds Documentation](quiz/backend/ENDPOINTS.md)

### Frontend
React.js (in typescript) <br>

## Features
### Authentication
Users can create accounts by providing unique username and password. <br>
App uses Basic Htttp Authorizaton and stateless sessions - authorization data has to be sent in every authorized request.
<br> Users without accounts can:
 * browse public quizzes
 * solve public quizzes - statisctis will still be gathered and displayed, but not presisted.
 * login/signup

![image](readmeResources/quiz_login.gif)

### Quiz creation and modification
Authenticated user can create end edit quizzes via interactive forms.
![image](readmeResources/quiz_create_and_edit.gif)

### Private quizzes
Users can make a quiz private to hide it from other users.
![image](readmeResources/quiz_private.gif)

### Solving quizes ond statistics
Users can solve quizzes and see their statistics.
![image](readmeResources/quiz_solve_and_statistics.gif)



