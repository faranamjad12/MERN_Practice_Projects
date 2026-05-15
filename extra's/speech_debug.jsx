import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import { TbMicrophoneOff } from "react-icons/tb";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { LuCircleArrowLeft } from "react-icons/lu";
import { FaMicrophone } from "react-icons/fa6";
import TextInput from "./TextInput";
import ActionButton from "./ActionButton";

const SpeechToText = () => {
  const [activeField, setActiveField] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const startFieldListening = (fieldName) => {
    resetTranscript(); // Clear old transcript before starting new one
    setActiveField(fieldName);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  return (
    <div style={{ padding: "0px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextInput
          type="text"
          fieldName="title"
          name="title"
          id="title"
          hint={"New title"}
          // value={activeNote?.title || "No title"}
          // value={transcript}
          className="text-2xl font-bold mb-4 outline-none"
          borderColor="#50ABE1"
        />

        <h2 style={{ margin: 0 }}>Speech To Text</h2>

        <p style={{ margin: 0 }}>
          <strong>Mic:</strong> {listening ? "ON" : "OFF"}
        </p>

        <button onClick={startFieldListening("title")}>
          <FaMicrophone />
        </button>

        {/* <button onClick={stopListening}>
          <FaMicrophoneSlash />
        </button> */}
        <FaMicrophoneSlash />
        <ActionButton text="Stop" onClick={stopListening} />

        <button onClick={resetTranscript}>
          <LuCircleArrowLeft />
        </button>
      </div>
      <div>
        <TextInput
          type="text"
          fieldName="title"
          name="title"
          id="title"
          hint={"New title"}
          // value={activeNote?.title || "No title"}
          // value={transcript}
          className="text-2xl font-bold mb-4 outline-none"
          borderColor="#50ABE1"
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2 style={{ margin: 0 }}>Speech To Text</h2>

        <p style={{ margin: 0 }}>
          <strong>Mic:</strong> {listening ? "ON" : "OFF"}
        </p>

        <button onClick={startListening}>
          <FaMicrophone />
        </button>

        <button onClick={stopListening}>
          <FaMicrophoneSlash />
        </button>

        <button onClick={resetTranscript}>
          <LuCircleArrowLeft />
        </button>
      </div>

      <TextInput
        type="text"
        hint={"New Content"}
        // value={activeNote?.title || "No title"}
        // value={transcript}
        className="text-2xl font-bold mb-4 outline-none"
        borderColor="#50ABE1"
      />

      {/* <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        {transcript}
      </div> */}
    </div>
  );
};

export default SpeechToText;
