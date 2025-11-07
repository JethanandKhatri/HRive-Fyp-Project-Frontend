import { useState } from "react";

export default function AskHR() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! Ask me HR policy or payroll questions." },
  ]);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { role: "user", text: draft }, { role: "assistant", text: "(Mock) I'll fetch leave balance from DB and summarize here." }]);
    setDraft("");
  };

  return (
    <div className="grid grid-rows-[1fr_auto] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl h-[70vh] md:h-[520px]">
      <div className="p-4 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={"max-w-[70%] px-3 py-2 rounded-xl text-sm " + (m.role === "user" ? "ml-auto bg-sky-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100")}>{m.text}</div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-400/40 placeholder:text-slate-400 dark:placeholder:text-slate-400"
          placeholder="e.g., Show my leave balance"
        />
        <button onClick={send} className="px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm">Send</button>
      </div>
    </div>
  );
}

