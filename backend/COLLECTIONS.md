# MongoDB collections
## `users`
### Defining Class and Document example
#### Defining Class
```java
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String password;    //hashed
    private AuthRole role;      // "USER" | "ADMIN"
    private Boolean enabled;
    
  ....
}
```
#### Document Example
```javascript
{
  _id: ObjectId("627d6a11c1df5c7d5d71c724"),
  name: 'user',
  password: '$2a$10$YAwBuIvQReTZv9mNh/MWMOgsyDm1maLVafhUtana5VHNXY0FxEjae',
  role: 'USER',
  enabled: true,
  _class: 'com.rynkow.quiz.model.user.User'
},

```

## `quizzes`
## `users`
### Defining Class and Document example
#### Defining Class
```java
@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;
    private String title;
    private String description;
    private String authorId;
    private Boolean isPublic;
    private List<Question> questions;
  ....
}

public class Question {
    private String id;
    private String question;
    private Map<String, Boolean> answers;
    private Boolean isMultipleChoice;
  ....
}
```
#### Document Example
```javascript
{
  _id: ObjectId("627d6b47c1df5c7d5d71c72a"),
  title: 'Earth quiz',
  description: 'Quiz about Earth',
  authorId: '627d6a11c1df5c7d5d71c724',
  isPublic: true,
  questions: [
    {
      _id: ObjectId("627d6b47c1df5c7d5d71c728"),
      question: 'Is Earth flat?',
      answers: { no: true, yes: false },
      isMultipleChoice: true
    },
    {
      _id: ObjectId("627d6b47c1df5c7d5d71c729"),
      question: 'What is Earth diameter?',
      answers: {
        '12 742 km': true,
        '12 7426 km': false,
        '1 274 267 km': false
      },
      isMultipleChoice: true
    }
  ],
  _class: 'com.rynkow.quiz.model.quiz.Quiz'
},

```

## `quizstatistics`
### Defining Class and Document example
#### Defining Class
```java
@Document(collection = "quizstatistics")
public class QuizStatistics {
    @Id
    private String id;
    private String userId;
    private String quizId;
    private Map<String, QuestionStatistics> questionsStatistics;
  ....
}

public class QuestionStatistics {
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Boolean needsReview;
  ....
}
```
#### Document Example
```javascript
{
  _id: ObjectId("627d6b4cc1df5c7d5d71c733"),
  userId: '627d6a11c1df5c7d5d71c724',
  quizId: '627d6b47c1df5c7d5d71c72a',
  questionsStatistics: {
    '627d6b47c1df5c7d5d71c728': { correctAnswers: 4, wrongAnswers: 4, needsReview: false },
    '627d6b47c1df5c7d5d71c729': { correctAnswers: 3, wrongAnswers: 3, needsReview: false }
  },
  _class: 'com.rynkow.quiz.model.quiz.QuizStatistics'
},
```
