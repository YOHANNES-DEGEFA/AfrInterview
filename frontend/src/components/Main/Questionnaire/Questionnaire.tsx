import React, { useEffect, useState } from "react";
import useSpeechRecognition from "../../../hooks/useSpeechRecognitionHook";
import { Button, notification, Tooltip, Typography } from "antd";
import {
  AudioMutedOutlined,
  AudioOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { InterviewAnswers, InterviewQuestions } from "../../../../types";
import styles from "./Questionnaire.module.css";
import Spinner from "../../UI/Spinner";
import TextArea from "antd/es/input/TextArea";
import { ANIMATION_VARIANTS } from "../../../utils/constants";
import { motion } from "framer-motion";
import useTextToSpeech from "../../../hooks/useTextToSpeech";

interface Props {
  onSubmit: (interview: InterviewAnswers[]) => void;
  questions: InterviewQuestions[];
  loading: boolean;
}

const { Title, Text } = Typography;

const Questionnaire: React.FC<Props> = ({ onSubmit, questions, loading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswers[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [changeAnswer, setChangeAnswer] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const { text, setText, isListening, startListening, stopListening } =
    useSpeechRecognition();
  const { speakText, isPlaying } = useTextToSpeech();

  useEffect(() => {
    const openNotification = () => {
      api.open({
        message: "Voice recognition can make mistakes",
        description:
          "You can always correct and/or add to your answer manually after completing the recording.",
        duration: 10,
        placement: "bottomRight",
      });
    };
    openNotification();
  }, [api]);

  const handleNextQuestion = () => {
    if (text.trim()) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = {
        question: questions[currentQuestionIndex].question,
        answer: text,
      };
      setAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setChangeAnswer(false);
    }
  };

  const startRecording = () => {
    startListening();
    setShowAnswer(true);
  };

  const startAgain = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const playQuestionToText = (question: string) => {
    speakText(question);
  };

  const renderButton = (
    onClick: () => void,
    icon: React.ReactNode,
    label: string,
    tooltip: string,
    disable?: boolean,
    background?: string
  ) => (
    <Tooltip
      title={tooltip}
      placement="right"
      color="white"
      overlayInnerStyle={{
        color: "black",
      }}
    >
      <Button
        type="primary"
        onClick={onClick}
        icon={icon}
        block
        shape="round"
        size="large"
        disabled={disable || false}
        style={{ background: background || "" }}
      >
        {label}
      </Button>
    </Tooltip>
  );

  const renderQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      return (
        <>
          <Title level={4} className={styles.title}>
            Question {currentQuestionIndex + 1}
          </Title>
          <div className={styles.questionWrapper}>
            <Text className={styles.text}>
              {questions[currentQuestionIndex].question}
            </Text>
            <Tooltip
              title="Play question"
              placement="right"
              color="white"
              overlayInnerStyle={{
                color: "black",
              }}
            >
              <Button
                icon={
                  <PlayCircleOutlined
                    style={{
                      color: "#1677ff",
                      fontSize: "22px",
                    }}
                  />
                }
                loading={isPlaying}
                onClick={() =>
                  playQuestionToText(questions[currentQuestionIndex].question)
                }
                shape="circle"
                type="text"
              />
            </Tooltip>
          </div>

          <div className={styles.btnWrapper}>
            {isListening
              ? renderButton(
                  stopListening,
                  <AudioMutedOutlined />,
                  "Stop recording",
                  "Stop recording",
                  false,
                  "#c24827"
                )
              : renderButton(
                  startRecording,
                  <AudioOutlined />,
                  showAnswer ? "Record again" : "Start recording",
                  showAnswer
                    ? "Try writing your answer again"
                    : "You can rewrite your answer before moving on to the next question"
                )}
            {renderButton(
              handleNextQuestion,
              null,
              currentQuestionIndex + 1 === questions.length
                ? "Complete"
                : "Next question",
              isListening || !showAnswer
                ? ""
                : currentQuestionIndex + 1 === questions.length
                ? "This was the last question, complete the interview"
                : "Do you still have a question to answer?",
              isListening || !showAnswer
            )}
          </div>
        </>
      );
    } else if (loading) {
      return (
        <>
          <Title level={4} className={styles.title}>
            Artificial intelligence checks your answers, <br /> This may take
            some time
          </Title>
          <Spinner />
        </>
      );
    } else {
      return (
        <>
          <Title level={4} className={styles.title}>
            Thank you! You have answered all the questions!
          </Title>
          <div className={styles.btnWrapper}>
            {renderButton(
              startAgain,
              null,
              "come back",
              "Try again to answer all questions",
              false,
              "#c24827"
            )}
            {renderButton(
              () => onSubmit(answers),
              null,
              "Submit for review",
              "Submit your answers for review",
              loading,
              "#156c90"
            )}
          </div>
        </>
      );
    }
  };

  const renderAnswerSection = () => {
    if (showAnswer && !isListening) {
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS}
          className="borderContainer"
        >
          <Title level={4} className={styles.title}>
            Your Answer:
          </Title>
          <Text className={styles.text} defaultValue={text}>
            {text}
          </Text>
          {changeAnswer ? (
            <TextArea
              rows={4}
              maxLength={400}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.answerInput}
            />
          ) : (
            <Tooltip
              title="You can correct the recorded voice response manually"
              placement="bottom"
            >
              <Button
                size="large"
                className={styles.changeAnswerButton}
                shape="round"
                onClick={() => setChangeAnswer(true)}
              >
                Change answer
              </Button>
            </Tooltip>
          )}
        </motion.div>
      );
    } else if (isListening) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={ANIMATION_VARIANTS}
      className={styles.wrapper}
    >
      <div className="borderContainer">{renderQuestion()}</div>
      {renderAnswerSection()}
      {contextHolder}
    </motion.div>
  );
};

export default Questionnaire;
