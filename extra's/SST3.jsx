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

  // active field ref (IMPORTANT)
  const activeFieldRef = useRef("title");

  // permanent speech storage
  const transcriptStore = useRef({
    title: "",
    content: "",
  });

  // CREATE RECOGNITION ONLY ONCE
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
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const currentField = activeFieldRef.current;

      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += text + " ";
        } else {
          interimTranscript += text;
        }
      }

      // save final speech permanently
      if (finalTranscript) {
        finalTranscriptRef.current[activeField] += finalTranscript;
      }

      // show final + interim
      const updatedValue =
        finalTranscriptRef.current[activeField] + interimTranscript;

      setForm((prev) => ({
        ...prev,
        [activeField]: updatedValue,
      }));
    };

    recognition.onerror = (event) => {
      console.log("Speech Error:", event.error);

      if (event.error === "no-speech") return;

      if (event.error === "not-allowed") {
        alert("Microphone permission denied");
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (err) {}
        }, 500);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [activeField, isListening]);

  // keep latest listening state
  useEffect(() => {
    recognitionRef.current &&
      (recognitionRef.current.onend = () => {
        if (isListening) {
          setTimeout(() => {
            try {
              recognitionRef.current.start();
            } catch (err) {}
          }, 500);
        }
      });
  }, [isListening]);

  // keyboard typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    transcriptStore.current[name] = value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // field focus
  const handleFocus = (field) => {
    setActiveField(field);
    activeFieldRef.current = field;
  };

  // start mic
  const startListening = () => {
    if (!recognitionRef.current) return;
    // prevent duplicate starts
    if (isListening) return;
    // try {
    //   recognitionRef.current.start();
    //   setIsListening(true);
    // } catch (err) {
    //   console.log("Already listening");
    // }
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.log("Mic already active");
    }
  };

  // stop mic
  const stopListening = () => {
    setIsListening(false);

    try {
      recognitionRef.current.stop();
    } catch (err) {}
  };

  return (
    <div style={styles.container}>
      <h2>Speech To Text</h2>

      {/* TITLE */}
      <div style={styles.fieldBox}>
        <label>Title</label>

        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Enter title..."
          onChange={handleChange}
          onFocus={() => handleFocus("title")}
          style={{
            ...styles.input,
            border:
              activeField === "title" ? "2px solid blue" : "1px solid #ccc",
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={styles.fieldBox}>
        <label>Content</label>

        <textarea
          name="content"
          value={form.content}
          placeholder="Write content..."
          onChange={handleChange}
          onFocus={() => handleFocus("content")}
          rows={8}
          style={{
            ...styles.textarea,
            border:
              activeField === "content" ? "2px solid blue" : "1px solid #ccc",
          }}
        />
      </div>

      {/* BUTTONS */}
      <div style={styles.buttons}>
        <button onClick={startListening} style={styles.startBtn}>
          🎤 Start
        </button>

        <button onClick={stopListening} style={styles.stopBtn}>
          ⛔ Stop
        </button>
      </div>

      <p>
        Active Field: <b>{activeField}</b>
      </p>

      <p>
        Mic Status: <b>{isListening ? "Listening..." : "Stopped"}</b>
      </p>
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

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    resize: "vertical",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  startBtn: {
    padding: "10px 20px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  stopBtn: {
    padding: "10px 20px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default SpeechToText;
