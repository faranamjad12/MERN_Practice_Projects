import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ActionButton from "./ActionButton";
import axios from "axios";
import { NOTE_EDIT_URL, NOTE_UPDATE_URL } from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useForm } from "react-hook-form";

const SpeechToText = (id) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listening, setListening] = useState(false);
  const { transcript, finalTranscript } = useSpeechRecognition();

    useEffect(() => {
  if (finalTranscript) {
    setContent((prev) => prev + " " + finalTranscript);
  }
}, [finalTranscript]);
    

    
  const activeField = useRef("content");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
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

  const [color, setColor] = useState("#FEC971");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  //   const params = useParams();

  const activeNoteCss = "border border-2";

  const noteClrs = ["#FEC971", "#FE9B72", "#E4EF8F", "#B391F9", "#0AB8DE"];

  const handleColor = (e, clr) => {
    e.preventDefault();
    setColor(clr);
    // console.log(clr);
  };

  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const response = await axios.get(NOTE_EDIT_URL + `/` + id);
        if (response.data.status == true) {
          console.log(response.data.note);
          setColor(response.data?.note?.color);
          reset(response.data.note);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Internal server error");
        console.log("ERR: ", error);
      }
    };
    getSingleNote();
  }, [id]);

  const handleEditNote = async (data) => {
    try {
      const newData = {
        id: id,
        color: color,
        title: data.title,
        content: data.content,
      };

      const response = await axios.patch(NOTE_UPDATE_URL, newData);
      if (response.data.status == true) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Network error");
      console.log("ERR: ", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="underline font-bold">Voice Notes Editor</h2>

      <TextInput
        type="text"
        hint="Title"
        className="w-full p[10px] mb[10px]"
        boderColor="none"
        value={title}
        onFocus={() => (activeField.current = "title")}
        onChange={(e) => setTitle(e.target.value)}
        // style={{
        //   width: "100%",
        //   padding: "10px",
        //   marginBottom: "10px",
        // }}
      />

      <TextArea
        hint="Write your notes..."
        value={content}
        onFocus={() => (activeField.current = "content")}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        cols={3}
        className="w-full p[10px]"
        // style={{
        //   width: "100%",
        //   padding: "10px",
        // }}
      />

      <div style={{ marginTop: "15px" }}>
        {!listening ? (
          <button onClick={startListening}>🎤 Start Voice Typing</button>
        ) : (
          <button onClick={stopListening}>⛔ Stop</button>
        )}
      
      <span className="flex flex-col justify-between">
        <ActionButton text="Update note" />
              </span>
              </div>
    </div>
  );
};

export default SpeechToText;
