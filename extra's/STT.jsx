// SpeechToText.jsx
import React, { useEffect, useRef, useState } from "react";

const SpeechToText = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // currently active field for speech input
  const [activeField, setActiveField] = useState(null);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      if (!activeField) return;

      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setForm((prev) => ({
        ...prev,
        [activeField]:
          prev[activeField].replace(/\s+$/, "") + " " + transcript,
      }));
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [activeField]);

  // manual typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // activate field for microphone
  const activateField = (fieldName) => {
    setActiveField(fieldName);
  };

  // start mic
  const startListening = () => {
    if (!recognitionRef.current) return;

    if (!activeField) {
      alert("Select a field first.");
      return;
    }

    isListeningRef.current = true;
    recognitionRef.current.start();
  };

  // stop mic
  const stopListening = () => {
    isListeningRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Speech To Text</h2>

      {/* TITLE */}
      <div style={styles.fieldBox}>
        <label style={styles.label}>Title</label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          onFocus={() => activateField("title")}
          placeholder="Enter title..."
          style={{
            ...styles.input,
            border:
              activeField === "title"
                ? "2px solid #2563eb"
                : "1px solid #ccc",
          }}
        />

        {activeField === "title" && (
          <small style={styles.activeText}>
            🎤 Active microphone field
          </small>
        )}
      </div>

      {/* CONTENT */}
      <div style={styles.fieldBox}>
        <label style={styles.label}>Content</label>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          onFocus={() => activateField("content")}
          placeholder="Write content..."
          rows={8}
          style={{
            ...styles.textarea,
            border:
              activeField === "content"
                ? "2px solid #2563eb"
                : "1px solid #ccc",
          }}
        />

        {activeField === "content" && (
          <small style={styles.activeText}>
            🎤 Active microphone field
          </small>
        )}
      </div>

      {/* CONTROLS */}
      <div style={styles.buttonContainer}>
        <button onClick={startListening} style={styles.startBtn}>
          Start Mic
        </button>

        <button onClick={stopListening} style={styles.stopBtn}>
          Stop Mic
        </button>
      </div>

      {/* PREVIEW */}
      <div style={styles.preview}>
        <h3>Preview</h3>

        <p>
          <strong>Title:</strong> {form.title}
        </p>

        <p>
          <strong>Content:</strong> {form.content}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  fieldBox: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    outline: "none",
    fontSize: "16px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    outline: "none",
    fontSize: "16px",
    resize: "vertical",
  },

  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  startBtn: {
    padding: "10px 20px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  stopBtn: {
    padding: "10px 20px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  activeText: {
    color: "#2563eb",
    display: "block",
    marginTop: "6px",
  },

  preview: {
    marginTop: "30px",
    padding: "20px",
    background: "#f5f5f5",
    borderRadius: "10px",
  },
};

export default SpeechToText;