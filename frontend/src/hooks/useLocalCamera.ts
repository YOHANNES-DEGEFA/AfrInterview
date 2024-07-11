import { useEffect, useState } from "react";

export function useLocalCameraStream() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      });
  }, []);

  return {
    localStream,
  };
}
