import React from "react";
import mongoose from "mongoose";

const speech_to_text_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const speechText = mongoose.model("speechText", speech_to_text_Schema);

export default speechText;
