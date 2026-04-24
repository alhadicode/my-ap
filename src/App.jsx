import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  /* =========================
     🔴 API URL
  ========================= */

  // ❌ LOCAL
  // const API = "http://localhost:4000";

  // ✔️ PRODUCTION (Render)
  const API = "https://backen-ugca.onrender.com";

  /* =========================
     LOAD DATA
  ========================= */
  const loadMessages = async () => {
    const res = await fetch(`${API}/messages`);
    const data = await res.json();
    setMessages(data);
  };

  /* =========================
     SEND DATA
  ========================= */
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

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="container">
  <h1>Contact App 🚀</h1>

  <form onSubmit={sendMessage}>
    <input
      placeholder="Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    <input
      placeholder="Email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <textarea
      placeholder="Message"
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
    />

    <button type="submit">Send</button>
  </form>

  <div className="messages">
    <h2>Messages</h2>

    {messages.map((m) => (
      <div className="message-card" key={m._id}>
        <p><b>{m.name}</b></p>
        <p>{m.email}</p>
        <p>{m.message}</p>
      </div>
    ))}
  </div>
</div>
  );
}

export default App;