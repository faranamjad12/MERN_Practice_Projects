const SpeechToText = () => {
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
      <div>
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start
        </button>

        <button onClick={SpeechRecognition.stopListening}>Stop</button>

        <button onClick={resetTranscript}>Reset</button>
      </div>

      <p>Mic: {listening ? "ON" : "OFF"}</p>

      <textarea value={transcript} rows={10} cols={50} />
    </div>
  );
};