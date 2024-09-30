// LiveVideo.js
"use client";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useRouter } from "next/navigation";
import { useState, useReducer } from "react";

const initialState = {
  activeConnection: true,
  micOn: true,
  cameraOn: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MIC":
      return { ...state, micOn: !state.micOn };
    case "TOGGLE_CAMERA":
      return { ...state, cameraOn: !state.cameraOn };
    case "TOGGLE_CONNECTION":
      return { ...state, activeConnection: !state.activeConnection };
    default:
      return state;
  }
};

const LiveVideo = ({ channelName }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack({
    enabled: state.micOn,
    cameraId: "default",
  });
  const { localCameraTrack } = useLocalCameraTrack({
    enabled: state.cameraOn,
    cameraId: "default",
  });

  useJoin(
    { appid: process.env.NEXT_PUBLIC_APPID, channel: channelName, token: null },
    state.activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  if (audioTracks) audioTracks?.forEach((track) => track.play());

  return (
    <>
      <div id="remoteVideoGrid">
        {remoteUsers?.map((user) => (
          <div key={user.uid} className="remote-video-container">
            <RemoteUser user={user} />
          </div>
        ))}
      </div>
      <div id="localVideo">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={state.cameraOn}
          micOn={state.micOn}
          playAudio={state.micOn}
          playVideo={state.cameraOn}
          className=""
        />
        <div id="controlsToolbar">
          {/* media-controls toolbar component - UI controling mic, camera, & connection state  */}
          <div id="mediaControls">
            <button
              className="btn"
              onClick={() => dispatch({ type: "TOGGLE_MIC" })}
            >
              Mic
            </button>
            <button
              className="btn"
              onClick={() => dispatch({ type: "TOGGLE_CAMERA" })}
            >
              Camera
            </button>
          </div>
          <button
            id="endConnection"
            className=""
            onClick={() => {
              dispatch({ type: "TOGGLE_CONNECTION" });
              router.push("/");
            }}
          >
            {" "}
            Disconnect{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveVideo;
