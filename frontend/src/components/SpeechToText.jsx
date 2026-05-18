import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import ActionButton from "./ActionButton";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

import { NOTE_EDIT_URL, NOTE_UPDATE_URL } from "../utils/api";

import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";

const SpeechToText = ({ id }) => {
  const navigate = useNavigate();

  const [color, setColor] = useState("#FEC971");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const activeField = useRef("title");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // WATCH VALUES
  const title = watch("title");
  const content = watch("content");

  // COLORS
  const noteClrs = [
    "#FEC971",
    "#FE9B72",
    "#E4EF8F",
    "#B391F9",
    "#0AB8DE",
  ];

  // FETCH NOTE
  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const response = await axios.get(`${NOTE_EDIT_URL}/${id}`);

        if (response.data.status) {
          const note = response.data.note;

          setColor(note.color);

          reset({
            title: note.title,
            content: note.content,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load note");
      }
    };

    getSingleNote();
  }, [id,reset]);

  // START MIC
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

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

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          transcript +=
            event.results[i][0].transcript;
        }
      }

      transcript = transcript.trim();

      if (!transcript) return;

      // TITLE
      if (activeField.current === "title") {
        setValue(
          "title",
          `${title} ${transcript}`.trim()
        );
      }

      // CONTENT
      if (activeField.current === "content") {
        setValue(
          "content",
          `${content} ${transcript}`.trim()
        );
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  // STOP MIC
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current.abort();

      setListening(false);
    }
  };

  // UPDATE NOTE
  const handleEditNote = async (data) => {
    try {
      const response = await axios.patch(
        NOTE_UPDATE_URL,
        {
          id,
          title: data.title,
          content: data.content,
          color,
        }
      );

      if (response.data.status) {
        toast.success("Note updated");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error");
    }
  };

  return (
    <div className="p-5">
      <h2 className="font-bold underline mb-4">
        Voice Notes Editor
      </h2>

      <form
        onSubmit={handleSubmit(handleEditNote)}
        className="flex flex-col gap-4"
      >
        {/* TITLE */}
        <TextInput
          type="text"
          borderColor="#A27940"
          value={title}
          onFocus={() =>
            (activeField.current = "title")
          }
          onChange={(e) =>
            setValue("title", e.target.value)
          }
          {...register("title")}
        />

        {/* CONTENT */}
        <TextArea
          rows={6}
          borderColor="#A27940"
          value={content}
          onFocus={() =>
            (activeField.current = "content")
          }
          onChange={(e) =>
            setValue("content", e.target.value)
          }
          {...register("content")}
        />

        {/* ACTIONS */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* MIC BUTTON */}
          {!listening ? (
            <button
              type="button"
              onClick={startListening}
              className="text-xl"
            >
              <FaMicrophone />
            </button>
          ) : (
            <button
              type="button"
              onClick={stopListening}
              className="text-xl text-red-500"
            >
              <FaMicrophoneSlash />
            </button>
          )}

          {/* COLORS */}
          <div className="flex gap-2">
            {noteClrs.map((clr) => (
              <button
                key={clr}
                type="button"
                onClick={() => setColor(clr)}
                style={{
                  backgroundColor: clr,
                }}
                className={`
                  w-7 h-7 rounded-full border-2
                  ${
                    color === clr
                      ? "scale-125 border-black"
                      : "border-transparent"
                  }
                `}
              />
            ))}
          </div>

          {/* SUBMIT */}
          <ActionButton
            text="Update Note"
            type="submit"
            onClick={() => window.location.reload()}
          />
        </div>
      </form>
    </div>
  );
};

export default SpeechToText;