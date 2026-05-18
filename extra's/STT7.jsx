import React, { useRef, useState } from "react";

export default function NotesEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listening, setListening] = useState(false);

  // track which field is active
  const activeField = useRef("title");

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }

      transcript = transcript.trim();

      if (!transcript) return;

      // INPUT FIELD
      if (activeField.current === "title") {
        setTitle((prev) => {
          return (prev.trim() + " " + transcript).trim();
        });
      }

      // TEXTAREA FIELD
      if (activeField.current === "content") {
        setContent((prev) => {
          return (prev.trim() + " " + transcript).trim();
        });
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;

      recognitionRef.current.stop();
      recognitionRef.current.abort();

      setListening(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2>Voice Notes Editor</h2>

      {/* TITLE INPUT */}
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onFocus={() => (activeField.current = "title")}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          fontSize: "16px",
        }}
      />

      {/* CONTENT TEXTAREA */}
      <textarea
        placeholder="Write your note..."
        value={content}
        onFocus={() => (activeField.current = "content")}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          resize: "vertical",
        }}
      />

      {/* BUTTONS */}
      <div style={{ marginTop: "20px" }}>
        {!listening ? (
          <button
            onClick={startListening}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            🎤 Start Recording
          </button>
        ) : (
          <button
            onClick={stopListening}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            ⛔ Stop Recording
          </button>
        )}
      </div>

      <p style={{ marginTop: "10px" }}>
        {listening ? "Listening..." : "Mic Off"}
      </p>
    </div>
  );
}