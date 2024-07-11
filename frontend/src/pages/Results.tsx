import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    resetInterviewState,
    selectInterviewReview,
} from '../dispatchers/interviews/interviewsSlice';
import { useNavigate } from 'react-router-dom';
import InterviewResult from '../components/Main/InterviewResult/InterviewResult';
import { APP_NAV } from '../utils/constants';

const Results = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const interviewResult = useAppSelector(selectInterviewReview);
    const startAgain = () => {
        dispatch(resetInterviewState());
        navigate(APP_NAV.home);
    };
    return (
        <InterviewResult
            interviewResult={interviewResult}
            tryAgain={startAgain}
        />
    );
};

export default Results;
