// SpeechToText.jsx
import React, { useEffect, useRef, useState } from "react";

const SpeechToText = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [activeField, setActiveField] = useState("title");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  // keep final speech text separately
  const finalTranscriptRef = useRef({
    title: "",
    content: "",
  });

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
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        //   const
              transcript += event.results[i][0].transcript;

          
          
          
          
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // store only FINAL transcript permanently
      if (finalTranscript) {
        finalTranscriptRef.current[activeField] += finalTranscript;
      }

      // combine final + interim safely
      const updatedValue =
        finalTranscriptRef.current[activeField] + interimTranscript;

      setForm((prev) => ({
        ...prev,
        [activeField]: updatedValue,
      }));
    };

    recognition.onerror = (err) => {
      console.log("Speech Error:", err);
    };

    recognition.onend = () => {
      // restart only if listening enabled
      if (isListening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [activeField, isListening]);

  // keyboard typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    // sync speech buffer too
    finalTranscriptRef.current[name] = value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // switch active field safely
  const handleFocus = (field) => {
    setActiveField(field);
  };

  // start microphone
  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.log("Already started");
    }
  };

  // stop microphone
  const stopListening = () => {
    if (!recognitionRef.current) return;

    setIsListening(false);
    recognitionRef.current.stop();
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
          onFocus={() => handleFocus("title")}
          placeholder="Enter title..."
          style={{
            ...styles.input,
            border:
              activeField === "title"
                ? "2px solid #2563eb"
                : "1px solid #ccc",
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={styles.fieldBox}>
        <label style={styles.label}>Content</label>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          onFocus={() => handleFocus("content")}
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
      </div>

      {/* BUTTONS */}
      <div style={styles.buttonContainer}>
        <button onClick={startListening} style={styles.startBtn}>
          🎤 Start
        </button>

        <button onClick={stopListening} style={styles.stopBtn}>
          ⛔ Stop
        </button>
      </div>

      {/* STATUS */}
      <div style={{ marginTop: 10 }}>
        <strong>Active Field:</strong> {activeField}
      </div>

      <div>
        <strong>Mic:</strong>{" "}
        {isListening ? "Listening..." : "Stopped"}
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
};

export default SpeechToText;