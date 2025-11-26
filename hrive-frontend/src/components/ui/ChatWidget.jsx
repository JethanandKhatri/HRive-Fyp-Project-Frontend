import React, { useState } from 'react'
import { chatSeeds } from '../../data/portalData'

function ChatWidget({ portal }) {
  const [messages, setMessages] = useState(chatSeeds[portal] ?? [])
  const [input, setInput] = useState('')
  const canChat = portal === 'hr' || portal === 'employee' || portal === 'manager'
  const counterpart = portal === 'manager' ? 'employee' : portal === 'employee' ? 'manager' : 'bot'

  const sendMessage = () => {
    if (!canChat || !input.trim()) return
    const sender = portal === 'hr' ? 'hr' : portal
    const userMessage = { from: sender, text: input.trim() }
    const autoReply =
      counterpart === 'bot'
        ? { from: 'bot', text: `Logged your request: "${input.trim()}". I will prepare the summary.` }
        : { from: counterpart, text: `Got it. "${input.trim()}" noted.` }
    setMessages((prev) => [...prev, userMessage, autoReply])
    setInput('')
  }

  return (
    <div className="chat-widget">
      <div className="chat-thread">
        {messages.map((msg, idx) => (
          <div key={`${msg.text}-${idx}`} className={msg.from === 'employee' || msg.from === 'user' ? 'chat-bubble user' : 'chat-bubble bot'}>
            <strong className="chat-from">{msg.from.toUpperCase()}:</strong> {msg.text}
          </div>
        ))}
        {!canChat ? (
          <div className="chat-disabled">Chat is enabled for HR and Employee portals. Switch above to try it.</div>
        ) : null}
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={canChat ? 'Type a question about leave, payroll, hiring...' : 'Chat locked'}
          disabled={!canChat}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage()
          }}
        />
        <button onClick={sendMessage} disabled={!canChat}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWidget
