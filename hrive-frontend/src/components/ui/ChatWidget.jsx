import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function ChatWidget({ portal }) {
  const { email, apiUrl, role } = useAuth()
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
    let active = true
    setLoading(true)
    setError('')
    fetch(`${apiUrl}/api/chat/history?userA=${encodeURIComponent(senderEmail)}&userB=${encodeURIComponent(counterpart)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        setMessages(data?.messages || [])
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setError('Unable to load chat')
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [apiUrl, senderEmail, counterpart, canChat, portal, role])

  useEffect(() => {
    if (!isHR) {
      setContacts(hrContacts)
      setTarget(hrContacts[0])
      return
    }
    let active = true
    fetch(`${apiUrl}/api/chat/contacts?user=${encodeURIComponent(senderEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        const list = data?.contacts || []
        setContacts(list)
        if (list.length && !list.includes(target)) {
          setTarget(list[0])
        }
      })
      .catch(() => {
        if (!active) return
        setContacts([])
      })
    return () => {
      active = false
    }
  }, [apiUrl, isHR, senderEmail])

  const sendMessage = () => {
    if (!canChat || !input.trim()) return
    const body = input.trim()
    setInput('')
    fetch(`${apiUrl}/api/chat/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: senderEmail, recipient: counterpart, body }),
    })
      .then((res) => res.json())
      .then((msg) => {
        setMessages((prev) => [...prev, msg])
      })
      .catch(() => {
        setError('Failed to send')
      })
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
