// VideoCall.js
"use client";
import React from "react";
import { useParams } from "next/navigation";
import LiveVideo from "@/components/LiveVideo";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";

export default function VideoCall() {
  const { channelName } = useParams();
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );

  return (
    <AgoraRTCProvider client={agoraClient}>
      <div>
        {("Channel name = ", channelName)}
        <LiveVideo channelName={channelName} />
      </div>
    </AgoraRTCProvider>
  );
}
