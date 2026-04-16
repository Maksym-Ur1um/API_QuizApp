# QuizApp Platform

A full-stack educational testing application. This project implements a secure, personalized quiz delivery and automated grading system on the backend using ASP.NET Core and Entity Framework Core.

## Features

- Secure JWT-based authentication and stateless authorization.
- Personalized test feeds preventing IDOR (Insecure Direct Object Reference) vulnerabilities.
- Relational database architecture with strictly mapped entities and DTOs to prevent data leaks.
- Automated server-side grading and secure score calculation.
- Modern component-based frontend architecture with global state management.
- Backend business logic covered by xUnit tests.

## Technology Stack

- Backend: C#, .NET, ASP.NET Core Web API, Entity Framework Core, SQL Server
- Testing: xUnit, FluentAssertions, EF Core In-Memory
- Frontend: React, TypeScript, Redux Toolkit (RTK), Axios

## Architecture Overview

The application workflow is processed securely in three steps:
1. Authentication: Users receive a JSON Web Token (JWT) upon login, which dictates their data access rights.
2. Data Fetching: The backend validates the user's ID against a relational assignment table (`AssignedTests`) to return only permitted quizzes.
3. Evaluation: Submitted answers are strictly validated against database records on the server to calculate the final score securely.

## How to Run

### 1. Backend API
1. Open the backend project directory in your terminal.
2. Update the `DefaultConnection` string and `JwtSettings:SecretKey` (min 32 characters) in `appsettings.json`.
3. Apply database migrations using the .NET CLI:
   dotnet ef database update
4. Build and run the project:
   dotnet run
5. The API will start and Swagger UI will be available (default: https://localhost:7196/swagger).

### 2. Frontend Web App
1. Open the frontend directory in your terminal.
2. Install dependencies via npm:
   npm install
3. Start the local development server:
   npm start
4. Ensure the API base URL in your Axios/RTK Query configuration matches your local backend address.

## API Endpoints

### POST /api/Result/submit
Evaluates submitted test answers and returns the calculated score.

Request Header: 
Authorization: Bearer <your_jwt_token>

Request body (JSON):
{
  "testId": 1,
  "answers": [
    {
      "questionId": 1,
      "selectedAnswerId": 3
    }
  ]
}

Response (200 OK):
{
  "testTitle": "C# Basics",
  "correctAnswers": 1,
  "totalQuestions": 1
}