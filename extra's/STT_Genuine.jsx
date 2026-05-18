import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition from "react-speech-recognition"; // } //   useSpeechRecognition, // {
import ActionButton from "./ActionButton";
import axios from "axios";
import { NOTE_EDIT_URL, NOTE_UPDATE_URL } from "../utils/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useForm } from "react-hook-form";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { LuCircleArrowLeft } from "react-icons/lu";
import { FaMicrophone } from "react-icons/fa6";

const SpeechToText = (id) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listening, setListening] = useState(false);

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

  const [color, setColor] = useState("#FEC971");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const activeNoteCss = "border ";

  const noteClrs = ["#FEC971", "#FE9B72", "#E4EF8F", "#B391F9", "#0AB8DE"];

  const handleColor = (e, clr) => {
    e.preventDefault();
    setColor(clr);
  };

  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const response = await axios.get(NOTE_EDIT_URL + `/` + id.id);
        if (response.data.status == true) {
          console.log(response.data.note);
          setColor(response.data?.note?.color);
          console.log(color);
          //   return null;
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
    // console.log(data._id);
    // return null;
    try {
      const newData = {
        id: data._id,
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/notes/update/${id.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          content,
          color,
        }),
      });

      const data = await response.json();

      console.log(data);

      // CLEAR OLD VALUES
      setTitle("");
      setContent("");

      // RESET COLORS
      // setBgColor("#ffffff");
      setColor("#ffffff");

      alert("Note updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="underline font-bold">Voice Notes Editor</h2>
      <form onSubmit={handleSubmit(handleEditNote)}>
        <TextInput
          type="text"
          // hint="Title"
          className="w-full p[10px] mb[10px]"
          borderColor="#A27940"
          value={title}
          onFocus={() => (activeField.current = "title")}
          onChange={(e) => setTitle(e.target.value)}
          {...register("title")}
        />

        <TextArea
          // hint="Write your notes..."
          value={content}
          onFocus={() => (activeField.current = "content")}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          cols={3}
          className="w-full p[10px]"
          borderColor="#A27940"
          {...register("content")}
        />

        <div className="flex" style={{ marginTop: "15px" }}>
          {!listening ? (
            <button onClick={startListening}>
              {/* 🎤 Start Voice Typing */}
              <FaMicrophone />
            </button>
          ) : (
            <button onClick={stopListening}>⛔ Stop</button>
          )}

          <span className="flex gap-3">
            {noteClrs.map((clr) => {
              return (
                <button
                  style={{ backgroundColor: clr }}
                  onClick={(e) => handleColor(e, clr)}
                  className={`p-1 rounded focus:border focus:scale-125 ${color == clr && activeNoteCss}`}
                >
                  {clr}
                </button>
              );
            })}
          </span>

          <span className="flex flex-col justify-between">
            <ActionButton
              text="Update note"
              onClick={handleUpdate}
              // onClick={() => window.location.reload()}
            />
          </span>
        </div>
      </form>
    </div>
  );
};

export default SpeechToText;
