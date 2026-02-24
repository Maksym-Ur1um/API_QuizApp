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

export interface TestSummary {
    id: number
    subjectName: string
}

interface Answer {
    id: number
    answerText: string
}

interface Question {
    id: number
    questionText: string
    answers: Array<Answer>
}

export interface TestDetail {
    id: number
    title: string
    questions: Array<Question>
}