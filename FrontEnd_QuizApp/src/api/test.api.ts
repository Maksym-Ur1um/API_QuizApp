import apiClient from "./apiClient"
import type { TestSummary, TestDetail } from "../types/test.types";
import type { SubmitTestRequest,  TestResultResponse} from "../types/test.types";

export const getTests = async function(): Promise<TestSummary[]> {
    const response = await apiClient.get<TestSummary[]>('/test');
    return response.data;
}

export const getTestById = async function(testId: number): Promise<TestDetail> {
    const response = await apiClient.get<TestDetail>(`/test/${testId}`);
    return response.data;
}

export const submitTest = async function(testAnswers: SubmitTestRequest): Promise<TestResultResponse> {
    const response = await apiClient.post<TestResultResponse>('/result/submit', testAnswers);
    return response.data;
}