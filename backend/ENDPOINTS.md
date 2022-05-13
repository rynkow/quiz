# `user`
```
GET   /user   can be used to get user data for the authenticated user   
POST  /user   used to reqister new user
```
# `quiz`
```
GET     /quiz                         get list of quizzes that are visible to the user
POST    /quiz                         create new quiz
PATCH   /quiz                         update existing quiz
GET     /quiz/{quizId}                try to get a quiz with specified id
DELETE  /quiz/{quizId}                delete quiz with a specified id
PATCH   /quiz/{quizId}/{questionId}   update quiz statistic for the question with questionId
```
