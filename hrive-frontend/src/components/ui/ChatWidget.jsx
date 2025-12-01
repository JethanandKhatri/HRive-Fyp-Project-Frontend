import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function ChatWidget({ portal }) {
  const { email, role } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [target, setTarget] = useState('hr@hrive.com')
  const [contacts, setContacts] = useState([])

  const canChat = portal === 'hr' || portal === 'employee' || portal === 'manager'
  const isHR = portal === 'hr'
  const counterpart = useMemo(() => {
    return target
  }, [target])

  const senderEmail = email || `${portal || 'user'}@hrive.com`
  const hrContacts = ['hr@hrive.com', 'people@hrive.com', 'payroll@hrive.com']

  useEffect(() => {
    if (!canChat) {
      setMessages([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    const mockHistory = [
      { id: 1, sender: counterpart, body: 'Hi there! How can I help today?' },
      { id: 2, sender: senderEmail, body: 'Just testing chat without backend.' },
    ]
    setMessages(mockHistory)
    setLoading(false)
  }, [senderEmail, counterpart, canChat, portal, role])

  useEffect(() => {
    if (!isHR) {
      setContacts(hrContacts)
      setTarget(hrContacts[0])
      return
    }
    const mockContacts = ['employee@hrive.com', 'manager@hrive.com', 'teamlead@hrive.com']
    setContacts(mockContacts)
    if (mockContacts.length && !mockContacts.includes(target)) {
      setTarget(mockContacts[0])
    }
  }, [isHR, senderEmail, target])

  const sendMessage = () => {
    if (!canChat || !input.trim()) return
    const body = input.trim()
    setInput('')
    setError('')
    const outgoing = { id: Date.now(), sender: senderEmail, body }
    const reply = { id: Date.now() + 1, sender: counterpart, body: 'Noted. Backend connection is offline, using mock chat.' }
    setMessages((prev) => [...prev, outgoing, reply])
  }

  return (
    <div className="chat-widget">
      <div className="chat-target">
        <label>
          {isHR ? 'Choose a conversation' : 'Choose HR contact'}
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            {(isHR ? contacts : hrContacts).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="chat-thread">
        {loading ? <div className="muted">Loading chat...</div> : null}
        {error ? <div className="muted">{error}</div> : null}
        {!canChat ? <div className="chat-disabled">Chat is enabled for HR, Employee, and Manager portals.</div> : null}
        {messages.map((msg) => (
          <div
            key={msg.id || `${msg.sender}-${msg.created_at || msg.body}`}
            className={msg.sender === senderEmail ? 'chat-bubble user' : 'chat-bubble bot'}
          >
            <strong className="chat-from">{msg.sender}:</strong> {msg.body}
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={canChat ? `Message ${counterpart}` : 'Chat locked'}
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
