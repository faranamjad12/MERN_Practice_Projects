import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import { TbMicrophoneOff } from "react-icons/tb";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { LuCircleArrowLeft } from "react-icons/lu";
import { FaMicrophone } from "react-icons/fa6";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

const SpeechToText = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [activeField, setActiveField] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startFieldListening = (fieldName) => {
    resetTranscript(); // Clear old transcript before starting new one
    setActiveField(fieldName);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // UPDATE ACTIVE FIELD ONLY
  useEffect(() => {
    if (transcript && activeField) {
      setFormData((prev) => ({
        ...prev,
        [activeField]: transcript,
      }));
    }
  }, [transcript, activeField]);

  // NORMAL INPUT CHANGE
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // CLEAR FIELD
  const clearField = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    resetTranscript();
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
          // fieldName="title"
          name="title"
          hint="New Title"
          // value={activeNote?.title || "No title"}
          // value={transcript}
          value={formData.title}
          className="text-2xl font-bold mb-4 outline-none"
          // borderColor="none"
          // onChange={handleChange}
        />

        <h2 style={{ margin: 0, width: 329 }}>(Speech To Text)</h2>

        <p style={{ margin: 0 }}>
          <strong>Mic:</strong> {listening ? "ON" : "OFF"}
        </p>

        <button onClick={() => startFieldListening("title")}>
          <FaMicrophone />
        </button>

        <button onClick={stopListening}>
          <FaMicrophoneSlash />
        </button>
        {/* <FaMicrophoneSlash /> */}
        {/* <ActionButton text="Stop" onClick={stopListening} /> */}

        <button onClick={() => clearField("title")}>
          <LuCircleArrowLeft />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* <TextInput
          type="text"
          name="content"
          hint="New Content"value={formData.content}
          className="text-2xl font-bold mb-4 outline-none"
          borderColor="none"
          onChange={handleChange}
        /> */}

        <TextArea
          name="content"
          rows={5}
          cols={23}
          hint="New Content"
          value={formData.content}
          className="text-2xl font-bold mb-4 outline-none"
          // borderColor="none"
          // onChange={handleChange}
          // width={400}
        />

        <h2 style={{ margin: 0 ,  width: 330 }}>(Speech To Text)</h2>

        <p style={{ margin: 0 }}>
          <strong>Mic:</strong> {listening ? "ON" : "OFF"}
        </p>

        <button onClick={() => startFieldListening("content")}>
          <FaMicrophone />
        </button>

        <button onClick={stopListening}>
          <FaMicrophoneSlash />
        </button>
        {/* <FaMicrophoneSlash /> */}
        {/* <ActionButton text="Stop" onClick={stopListening} /> */}

        <button onClick={() => clearField("content")}>
          <LuCircleArrowLeft />
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
