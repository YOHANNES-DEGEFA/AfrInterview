import React from 'react';
import Questionnaire from '../components/Main/Questionnaire/Questionnaire';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { InterviewAnswers } from '../../types';
import {
    selectAiLoading,
    selectJobPosition,
    selectJobQuestions,
} from '../dispatchers/interviews/interviewsSlice';
import { APP_NAV, MESSAGE_ASK_REVIEW } from '../utils/constants';
import { askAiForReview } from '../dispatchers/interviews/interviewsThunks';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const position = useAppSelector(selectJobPosition);
    const questions = useAppSelector(selectJobQuestions);
    const loading = useAppSelector(selectAiLoading);
    const sendForReview = async (interview: InterviewAnswers[]) => {
        const jsonInterview = JSON.stringify(interview);
        const message = MESSAGE_ASK_REVIEW(position, jsonInterview);
        await dispatch(askAiForReview(message))
            .unwrap()
            .then(() => {
                navigate(APP_NAV.interviewResult);
            });
    };

    return (
        <Questionnaire
            onSubmit={sendForReview}
            questions={questions}
            loading={loading}
        />
    );
};

export default Interview;
