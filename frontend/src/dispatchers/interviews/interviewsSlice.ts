import { InterviewQuestions, InterviewReview } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { askAiQuestion, askAiForReview } from './interviewsThunks';
import { RootState } from '../../app/store';
import extractArrayFromString from '../../utils/takeArrayFromString';

interface InterviewState {
    jobPosition: string;
    questions: InterviewQuestions[];
    postLoading: boolean;
    review: InterviewReview[];
}

const initialState: InterviewState = {
    jobPosition: '',
    questions: [],
    postLoading: false,
    review: [],
};

export const interviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {
        setJobPosition: (state, action: PayloadAction<string>) => {
            state.jobPosition = action.payload;
        },
        resetInterviewState: (state) => {
            state.jobPosition = '';
            state.questions = [];
            state.review = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(askAiQuestion.pending, (state) => {
            state.postLoading = true;
        });
        builder.addCase(
            askAiQuestion.fulfilled,
            (state, { payload: questions }) => {
                state.questions = extractArrayFromString(
                    questions
                ) as InterviewQuestions[];
                state.postLoading = false;
            }
        );
        builder.addCase(askAiQuestion.rejected, (state) => {
            state.postLoading = false;
        });

        builder.addCase(askAiForReview.pending, (state) => {
            state.postLoading = true;
        });
        builder.addCase(
            askAiForReview.fulfilled,
            (state, { payload: questions }) => {
                state.review = extractArrayFromString(
                    questions
                ) as InterviewReview[];
                state.postLoading = false;
            }
        );
        builder.addCase(askAiForReview.rejected, (state) => {
            state.postLoading = false;
        });
    },
});

export const interviewsReducer = interviewSlice.reducer;
export const { setJobPosition, resetInterviewState } = interviewSlice.actions;

export const selectJobPosition = (state: RootState) =>
    state.interviews.jobPosition;
export const selectJobQuestions = (state: RootState) =>
    state.interviews.questions;
export const selectInterviewReview = (state: RootState) =>
    state.interviews.review;
export const selectAiLoading = (state: RootState) =>
    state.interviews.postLoading;
