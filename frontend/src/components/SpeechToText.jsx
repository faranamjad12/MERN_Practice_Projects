import React, { useEffect, useState, useRef } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { TbMicrophoneOff } from "react-icons/tb";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { LuCircleArrowLeft } from "react-icons/lu";
import { FaMicrophone } from "react-icons/fa6";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { NOTE_EDIT_URL, NOTE_UPDATE_URL } from "../utils/api";
import ActionButton from "./ActionButton";

const SpeechToText = (id) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // currently active field for speech input
  const [activeField, setActiveField] = useState("title");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  // const isListeningRef = useRef(false);

  // active field ref (IMPORTANT)
  const activeFieldRef = useRef("title");

  // keep final speech text separately
  // const finalTranscriptRef = useRef({
  //   title: "",
  //   content: "",
  // });

  const transcriptStore = useRef({
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
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      // if (!activeField) return;
      let interimTranscript = "";
      let finalTranscript = "";

      // let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        // transcript += event.results[i][0].transcript;
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += text + " ";
        } else {
          interimTranscript += Text;
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

    // recognition.onerror = (err) => {
    //       console.log("Speech Error:", err);
    //     };

    recognition.onerror = (event) => {
      console.log("Speech Error:", event.error);

      // ignore harmless no-speech error
      if (event.error === "no-speech") {
        // console.log("No speech detected...");
        return;
      }
      // microphone permission denied
      if (event.error === "not-allowed") {
        alert("Microphone permission denied");
        setIsListening(false);
      }

      // microphone not found
      if (event.error === "audio-capture") {
        alert("No microphone detected.");
        setIsListening(false);
      }
    };

    // setForm((prev) => ({
    //   ...prev,
    //   [activeField]: prev[activeField].replace(/\s+$/, "") + " " + transcript,
    // }));
    // };

    // recognition.onend = () => {
    //   if (isListening) {
    //     recognition.start();
    //   }
    // };
    recognition.onend = () => {
      // restart safely only if mic should remain active
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



  // manual typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    // sync speech buffer too
    // finalTranscriptRef.current[name] = value;
    transcriptStore.current[name] = value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // activate field for microphone
  // const handleFocus = (field) => {
  //   setActiveField(field);
  // };

  // field focus
  const handleFocus = (field) => {
    setActiveField(field);
    activeFieldRef.current = field;
  };

  // start mic
  // const startListening = () => {
  //   if (!recognitionRef.current) return;

  //   try {
  //     recognitionRef.current.start();
  //     setIsListening(true);
  //   } catch (err) {
  //     console.log("Already started");
  //   }
  // };

  const startListening = () => {
    if (!recognitionRef.current) return;

    // prevent duplicate starts
    if (isListening) return;

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.log("Mic already active");
    }
  };

  // stop mic
  // const stopListening = () => {
  //   if (!recognitionRef.current) return;

  //   setIsListening(false);
  //   recognitionRef.current.stop();
  // };

  // const stopListening = () => {
  //   if (!recognitionRef.current) return;

  //   setIsListening(false);

  //   try {
  //     recognitionRef.current.stop();
  //   } catch (err) {
  //     console.log("Mic already stopped");
  //   }
  // };

  // stop mic
  const stopListening = () => {
    setIsListening(false);

    try {
      recognitionRef.current.stop();
    } catch (err) {}
  };

  const [color, setColor] = useState("#FEC971");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  // const params = useParams();
  const activeNoteCss = "border border-2";

  const noteClrs = ["#FEC971", "#FE9B72", "#E4EF8F", "#B391F9", "#0AB8DE"];
  const handleColor = (e, clr) => {
    e.preventDefault();
    setColor(clr);
  };

  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const response = await axios.get(NOTE_EDIT_URL + `/` + id);
        if (response.data.status == true) {
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

  //CHATGPT_STARTS
  // const [text, setText] = useState("");

  // const {
  //   transcript,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <p>Browser does not support speech recognition</p>;
  // }

  // const startListening = () =>
  //   SpeechRecognition.startListening({ continuous: true });

  // const stopListening = () =>
  //   SpeechRecognition.stopListening();

  // const clearAll = () => {
  //   resetTranscript();
  //   setText("");
  // };
  //CHATGPT_ENDS

  // const [formData, setFormData] = useState({
  //   title: "",
  //   content: "",
  // });

  // const [activeField, setActiveField] = useState("");

  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  // const startFieldListening = (fieldName) => {
  //   setActiveField(fieldName);
  //   resetTranscript(); // Clear old transcript before starting new one

  //   SpeechRecognition.startListening({
  //     continuous: true,
  //     language: "en-US",
  //   });
  // };

  // const stopListening = () => {
  //   SpeechRecognition.stopListening();

  //   setFormData((prev) => ({
  //     ...prev,
  //     [activeField]: transcript,
  //   }));

  //   setActiveField("");
  // };

  // const stopListening = () => {
  //   SpeechRecognition.stopListening();
  // };

  // CLEAR FIELD
  // const clearField = (fieldName) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [fieldName]: "",
  //   }));

  //   resetTranscript();
  // };

  // const [speechText, setSpeechText] = useState("");

  // useEffect(() => {
  //   setSpeechText(transcript);
  // }, [transcript]);

  // const stopListening = () => {
  //   SpeechRecognition.stopListening();

  //   if (activeField) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [activeField]: speechText,
  //     }));
  //   }
  // }

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  //last_config
  // useEffect(() => {
  //   if (transcript && activeField) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [activeField]:
  //         prev[activeField] + " " + transcript
  //     }));
  //   }
  // }, [transcript]);

  // useEffect(() => {
  //   if (transcript && activeField) {
  //     setFormData((prev) => {
  //       // prevent unnecessary updates
  //       if (prev[activeField] === transcript) {
  //         return prev;
  //       }

  //       return {
  //         ...prev,
  //         [activeField]: transcript,
  //       };
  //     });
  //   }
  // }, [transcript]);

  // UPDATE ACTIVE FIELD ONLY
  // useEffect(() => {
  //   if (transcript && activeField) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [activeField]: transcript,
  //     }));
  //   }
  // }, [transcript, activeField]);

  // NORMAL INPUT CHANGE
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [ name ]: value,
  //   }));
  // };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  //   };

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }));
  // };

  // const handleChange = (e) => {
  //   stopListening();

  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleChange = (e) => {
  //   stopListening(); // IMPORTANT

  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));

  //   setActiveField(""); // release speech control
  // };

  return (
    <form onSubmit={handleSubmit(handleEditNote)}>
      <div style={{ padding: "0px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextInput
            // type="text"
            name="title"
            {...register("title")}
            value={form.title}
            onChange={handleChange}
            onFocus={() => handleFocus("title")}
            hint="Enter title..."
            className="text-2xl font-bold mb-4 outline-none"
            // borderColor="#A27940"
            style={{
            // ...styles.input,
            border:
              activeField === "title" ? "2px solid blue" : "1px solid #ccc",
          }}

          />

          <h2 style={{ margin: 0, width: 329 }}>(Speech To Text)</h2>

          {/* <p style={{ margin: 0 }}>
            <strong>Mic:</strong> {listening ? "ON" : "OFF"}
          </p> */}

          <button
            // onClick={() => startFieldListening("title")}
            onClick={startListening}
          >
            <FaMicrophone />
          </button>

          <button
            // onClick={stopListening}
            onClick={stopListening}
          >
            <FaMicrophoneSlash />
          </button>
          {/* <FaMicrophoneSlash /> */}
          {/* <ActionButton text="Stop" onClick={stopListening} /> */}

          <button
            // onClick={() => clearField("title")}
            // onClick={()=>clearAll}
            disabled
          >
            <LuCircleArrowLeft />
          </button>
          <p>
        Active Field: <b>{activeField}</b>
          </p>
          

          <p>
        Mic Status:{" "}
        <b>{isListening ? "Listening..." : "Stopped"}</b>
      </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* <TextInput
          type="text"
          name="content"
          hint="New Content"value={formData.content}
          className="text-2xl font-bold mb-4 outline-none"
          borderColor="none"
          onChange={handleChange}
        /> */}

          <TextArea
            name="content"
            {...register("content")}
            value={form.content}
            onChange={handleChange}
            onFocus={() => handleFocus("content")}
            rows={5}
            cols={27}
            hint="Write content..."
            className="text-2xl font-bold mb-4 outline-none"
            // borderColor="#A27940"
            style={{
            // ...styles.textarea,
            border:
              activeField === "content" ? "2px solid blue" : "1px solid #ccc",
          }}
          />

          <h2 style={{ margin: 0, width: 330 }}>(Speech To Text)</h2>

          {/* <p style={{ margin: 0 }}>
            <strong>Mic:</strong> {listening ? "ON" : "OFF"}
          </p> */}

          

          <button
            // onClick={() => startFieldListening("content")}
            onClick={startListening}
          >
            <FaMicrophone />
          </button>

          <button
            // onClick={stopListening}
            onClick={stopListening}
          >
            <FaMicrophoneSlash />
          </button>
          {/* <FaMicrophoneSlash /> */}
          {/* <ActionButton text="Stop" onClick={stopListening} /> */}

          <button
            // onClick={() => clearField("content")}
            disabled
          >
            <LuCircleArrowLeft />
          </button>
<p>
        Active Field: <b>{activeField}</b>
          </p>
          {/* <div>
            <strong>Mic:</strong> {isListening ? "Listening..." : "Stopped"}
          </div> */}

          <p>
        Mic Status:{" "}
            <b>{isListening ? "Listening..." : "Stopped"}</b>
            

      </p>
        </div>
      </div>
      <div>
        {noteClrs.map((clr) => {
          return (
            <button
              // style={{ backgroundColor: clr }}
              // onClick={(e) => handleColor(e, clr)}
              // className="p-1 rounded focus:border focus:scale-125"
              style={{ backgroundColor: clr }}
              onClick={(e) => handleColor(e, clr)}
              className={`p-1 rounded focus:border focus:scale-125 ${color == clr && activeNoteCss}`}
            >
              {clr}
            </button>
          );
        })}
      </div>

      {/* <button className="bg-gray-900 text-white py-4 px-6 rounded-lg shadow font-bold">
          Update note
        </button> */}
      <div className="pt-[50px]">
        <ActionButton text="Update Note" />
      </div>
    </form>
  );
};

export default SpeechToText;
