interface SubmitAnswer {
    questionId: number;
    selectedAnswerId: number;
}
export interface SubmitTestRequest {
  testId: number;
  answers: Array<SubmitAnswer>;
}
export interface TestResultResponse {
    testTitle: string;
    totalQuestions: number;
    correctAnswers: number;
}
