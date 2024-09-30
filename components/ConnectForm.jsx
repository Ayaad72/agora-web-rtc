// ConnectForm.js
import { useState } from "react";

const ConnectForm = ({ connectToVideo }) => {
  const [channelName, setChannelName] = useState("");
  const [invalidInputMsg, setInvalidInputMsg] = useState("");

  const handleConnect = (ev) => {
    ev.preventDefault();
    const trimmedChannelName = channelName.trim();

    if (!trimmedChannelName) {
      setInvalidInputMsg("Channel name can't be empty.");
      setChannelName("");
      return;
    }
    connectToVideo(channelName);
  };

  return (
    <form onSubmit={handleConnect}>
      <h1>{channelName ? `Channel ${channelName}` : "Channel name"}</h1>
      <div className="card flex flex-col gap-2">
        <input
          type="text"
          name="channelName"
          id="channelName"
          placeholder="channelName"
          value={channelName}
          className="p-3 text-black bg-slate-100"
          onChange={(c) => {
            setChannelName(c.target.value);
            setInvalidInputMsg("");
          }}
        />
        {invalidInputMsg && <p style={{ color: "red" }}>{invalidInputMsg}</p>}
        <button className="p-3 bg-green-600">Connect</button>
      </div>
    </form>
  );
};

export default ConnectForm;
