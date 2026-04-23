import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadMessages = async () => {
    const res = await fetch("https://your-backend.onrender.com/messages");
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await fetch("https://your-backend.onrender.com/contact", {
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
    <div>
      <form onSubmit={sendMessage}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <textarea name="message" value={form.message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            {msg.name} - {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;