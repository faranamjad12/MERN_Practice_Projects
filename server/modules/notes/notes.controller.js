import Note from "./notes.model.js";

export const list = async (req, res) => {
  try {
    const notes = await Note.find({});

    return res.send({
      status: true,
      notes,
    });
  } catch (error) {
    console.log("ERR:", error);
  }
};

export const add = async (req, res) => {
  const { color, title, content } = req.body;

  try {
    const createNote = await Note.create({
      color: color,
      title: title,
      content: content,
    });
    if (createNote) {
      return res.send({
        status: true,
        message: "Data has been created",
      });
    } else {
      return res.send({
        status: false,
        message: "Failed to save data",
      });
    }
  } catch (error) {
    console.log("ERR:", error);
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteNote = await Note.findByIdAndDelete(id);
    if (deleteNote) {
      return res.send({
        status: true,
        message: "Data has been deleted",
      });
    } else {
      return res.send({
        status: false,
        message: "Failed to delete data",
      });
    }
  } catch (error) {
    console.log("ERR:", error);
  }
};

export const editNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById({ _id: id });
    if (!note) {
      return res.send({
        status: false,
        message: "Note not found!",
      });
    }

    return res.send({
      status: true,
      note,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (req, res) => {
  const { id, color, title, content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
      { _id: id },
      { color, title, content },
      { new: true },
    );
    if (!note) {
      return res.send({
        status: false,
        message: "Note not found!",
      });
    }

    return res.send({
      status: true,
      message: "Note has been updated",
    });
  } catch (error) {
    console.log(error);
  }
};
