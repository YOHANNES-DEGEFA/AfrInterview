import { useCallback } from "react";
import { socket } from "../utils/socket";
import { useParams } from "react-router-dom";

export function useOffersListening(peerConnection: RTCPeerConnection) {
  const { roomName } = useParams();

  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit("answer", { answer, roomName });
    },
    [roomName]
  );

  return {
    handleConnectionOffer,
  };
}
