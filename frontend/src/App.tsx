import "./App.css";
import AppToolbar from "./components/UI/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import { useAppSelector } from "./app/hooks";
import {
  selectInterviewReview,
  selectJobPosition,
  selectJobQuestions,
} from "./dispatchers/interviews/interviewsSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Typography } from "antd";
import { APP_NAV } from "./utils/constants";
import Results from "./pages/Results";
import { useLocalCameraStream } from "./hooks/useLocalCamera";
import { VideoChatRoom } from "./components/UI/VideoChatRoom";
import WebRTCDemo from "./pages/WebRtc";
import NavBar from "./components/UI/Navigation";
import Welcome from "./pages/Welcome";

function App() {
  const jobQuestions = useAppSelector(selectJobQuestions);
  const jobPosition = useAppSelector(selectJobPosition);
  const interviewReview = useAppSelector(selectInterviewReview);
  const { localStream } = useLocalCameraStream();
  return (
    <>
      {/* <AppToolbar /> */}
      <NavBar />
      <main className="container">
        <Routes>
          <Route path={APP_NAV.home} element={<Welcome />} />
          <Route path="/webrtc" element={<WebRTCDemo />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="video-chat-room/:roomName"
            element={localStream && <VideoChatRoom localStream={localStream} />}
          />
          <Route
            path={APP_NAV.interview}
            element={
              <ProtectedRoute
                isAllowed={jobQuestions.length > 0 && jobPosition.length > 0}
              >
                <Interview />
              </ProtectedRoute>
            }
          />
          <Route
            path={APP_NAV.interviewResult}
            element={
              <ProtectedRoute isAllowed={interviewReview.length > 0}>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <Typography.Title level={2} style={{ textAlign: "center" }}>
                Oops! Page not found!
              </Typography.Title>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
