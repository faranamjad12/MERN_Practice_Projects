await fetch("http://localhost:5000/api/speech", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: transcript,
  }),
});


app.post("/api/speech", async (req, res) => {
  const { text } = req.body;

  console.log(text);

  res.json({
    success: true,
  });
});