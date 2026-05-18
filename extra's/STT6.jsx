import React, { useRef, useState } from "react";

export default function VoiceEditor() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = true;

    // IMPORTANT
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

      // remove extra spaces
      transcript = transcript.trim();

      if (transcript) {
        setText((prev) => {
          // prevent double spaces
          return prev.trim() + " " + transcript;
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

      // fully stop
      recognitionRef.current.stop();

      recognitionRef.current.abort();

      setListening(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <div style={{ marginTop: 10 }}>
        {!listening ? (
          <button onClick={startListening}>
            🎤 Start
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