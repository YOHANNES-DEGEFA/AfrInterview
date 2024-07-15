import { useState } from "react";
import { Button, Typography } from "antd";
import {
  ANIMATION_VARIANTS,
  APP_NAV,
  JOBS_LIST,
  MESSAGE_ASK_QUESTIONS,
} from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import styles from "./JobList.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { askAiQuestion } from "../../../dispatchers/interviews/interviewsThunks";
import {
  selectAiLoading,
  setJobPosition,
} from "../../../dispatchers/interviews/interviewsSlice";
import Spinner from "../../UI/Spinner";
import { motion } from "framer-motion";

const JobList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAiLoading);
  const [isPositionSelected, setPositionSelected] = useState(false);
  const [inputPosition, setInputPosition] = useState("");

  const startInterview = async (position: string) => {
    setPositionSelected(true);
    const message = MESSAGE_ASK_QUESTIONS(position);
    await dispatch(setJobPosition(position));
    await dispatch(askAiQuestion(message))
      .unwrap()
      .then(() => {
        navigate(APP_NAV.interview);
      });
  };

  return (
    <>
      <div className="borderContainer">
        {loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS}
          >
            <Typography.Title level={4} className={styles.title}>
              We select interview questions <br /> to suit your needs direction
            </Typography.Title>
            <Spinner />
          </motion.div>
        )}
        {!isPositionSelected && !loading && (
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={ANIMATION_VARIANTS}
            >
              <Typography.Title level={3} className={styles.title}>
                Please select the direction you are going would like to take a
                test interview
              </Typography.Title>
              <div className={styles.list}>
                {JOBS_LIST.map((item) => (
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={() => startInterview(item.title)}
                    className={styles.button}
                    key={item.title}
                    size="large"
                    disabled={loading}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* let's create input field and button here down under on container to receive from job positoon form user */}
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter job position"
          className={styles.input}
          value={inputPosition}
          onChange={(e) => setInputPosition(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="button"
          className={styles.button}
          size="large"
          onClick={() => {
            if (!inputPosition) return;

            startInterview(inputPosition);
          }}
        >
          {/* html right Arrow */}
          &#8594;
        </Button>
      </div>
    </>
  );
};

export default JobList;
