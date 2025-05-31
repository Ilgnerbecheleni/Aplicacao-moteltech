
let localStream: MediaStream | null = null;

export const getLocalStream = async (): Promise<MediaStream> => {
  if (!localStream) {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  }
  return localStream;
};

export const stopLocalStream = (): void => {
  if (localStream) {
    localStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    localStream = null;
  }
};
