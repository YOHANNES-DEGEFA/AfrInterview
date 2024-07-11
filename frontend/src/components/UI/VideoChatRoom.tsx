import { VideoFeed } from "./VideoFeed";
import { FunctionComponent } from "react";
import { useChatConnection } from "../../hooks/useChatConnection.ts";
import { usePeerConnection } from "../../hooks/usePeerConnection.ts";

interface Props {
  localStream: MediaStream;
}

export const VideoChatRoom: FunctionComponent<Props> = ({ localStream }) => {
  const { peerConnection, guestStream } = usePeerConnection(localStream);
  useChatConnection(peerConnection);

  return (
    <div>
      <VideoFeed mediaStream={localStream} isMuted={true} />
      {guestStream && (
        <div>
          guest
          <VideoFeed mediaStream={guestStream} />
        </div>
      )}
    </div>
  );
};
