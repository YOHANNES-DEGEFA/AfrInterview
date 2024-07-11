import React from 'react';
import { InterviewReview } from '../../../../types';
import { Button, Typography } from 'antd';
import styles from './InterviewResult.module.css';

const { Title } = Typography;

interface Props {
    interviewResult: InterviewReview[];
    tryAgain: () => void;
}

const InterviewResult: React.FC<Props> = ({ interviewResult, tryAgain }) => {
    return (
        <div className={styles.wrapper}>
            <Title level={4} className={styles.title}>
                Your results from the interview:
            </Title>
            <div>
                {interviewResult.map((interview, index) => (
                    <div key={interview.id} className={styles.innerWrapper}>
                        <p>{index + 1}.</p>
                        <div>
                            <p className={styles.text}>
                                <span>Question: </span> {interview.question}
                            </p>
                            <p className={styles.text}>
                                <span>Answer: </span> {interview.answer}
                            </p>
                            <div className={styles.review}>
                                <p className={styles.text}>
                                    <span>Review:</span> {interview.review}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.tryAgainBlock}>
                <Title level={5}>Should you try the interview again?</Title>
                <Button
                    size="large"
                    onClick={tryAgain}
                    className={styles.button}
                >
                    Begin
                </Button>
            </div>
        </div>
    );
};

export default InterviewResult;
