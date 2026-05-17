import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function NotesEditor() {
  const [content, setContent] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <textarea
        value={content + transcript}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50}
      />

      <div>
        <button
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
            })
          }
        >
          Start
        </button>

        <button onClick={SpeechRecognition.stopListening}>
          Stop
        </button>

        <button onClick={resetTranscript}>
          Reset
        </button>
      </div>

      <p>{listening ? "Listening..." : "Stopped"}</p>
    </div>
  );
}