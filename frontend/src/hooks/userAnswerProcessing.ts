import { useCallback } from "react";

export function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      peerConnection.setRemoteDescription(answer);
    },
    [peerConnection]
  );

  return {
    handleOfferAnswer,
  };
}
