export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    console.error("OpenAI API error:", err);
    return res.status(500).json({ error: "ChatGPT API error", detail: err });
  }

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "No response";

  res.status(200).json({ reply });
}
