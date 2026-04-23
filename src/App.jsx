const API = "https://backen-xxxx.onrender.com";

const loadMessages = async () => {
  const res = await fetch(`${API}/messages`);
  const data = await res.json();
  setMessages(data);
};

const sendMessage = async (e) => {
  e.preventDefault();

  await fetch(`${API}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  setForm({ name: "", email: "", message: "" });
  loadMessages();
};