import React, { useState, useRef } from "react";

export default function VoiceNoteEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listening, setListening] = useState(false);

  const activeField = useRef("content");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  const startListening = () => {
    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      if (activeField.current === "title") {
        setTitle((prev) => prev + " " + transcript);
      } else {
        setContent((prev) => prev + " " + transcript);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const stopListening = () => {
    recognition.stop();
    setListening(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voice Notes Editor</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onFocus={() => (activeField.current = "title")}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Write your notes..."
        value={content}
        onFocus={() => (activeField.current = "content")}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <div style={{ marginTop: "15px" }}>
        {!listening ? (
          <button onClick={startListening}>
            🎤 Start Voice Typing
          </button>
        ) : (
          <button onClick={stopListening}>
            ⛔ Stop
          </button>
        )}
      </div>
    </div>
  );
}