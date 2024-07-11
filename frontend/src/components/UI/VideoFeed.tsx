import { FunctionComponent } from "react";

interface Props {
  mediaStream: MediaStream | null;
  isMuted?: boolean;
}

export const VideoFeed: FunctionComponent<Props> = ({
  mediaStream,
  isMuted = false,
}) => {
  if (!mediaStream) {
    return;
  }
  return (
    <video
      ref={(ref) => {
        if (ref) {
          ref.srcObject = mediaStream;
        }
      }}
      autoPlay={true}
      muted={isMuted}
    />
  );
};
