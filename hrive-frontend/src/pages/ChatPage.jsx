import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import ChatWidget from "../components/ui/ChatWidget";
import { portalKeys, portalMeta } from "../data/portalData";
import { useAuth } from "../context/AuthContext";

function ChatPage() {
  const { portalId } = useParams();
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!portalId || !portalKeys.includes(portalId)) {
    return <Navigate to={`/portal/${role || "hr"}`} replace />;
  }

  const title = "Chat with HR";
  const subtitle = "Direct line to HR for requests, updates, and follow-ups.";

  return (
    <DashboardShell portal={portalId} onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">
          {portalMeta[portalId]?.label} Portal
        </span>
      </div>
      <div className="hero-banner">
        <div>
          <p className="tag">{portalMeta[portalId]?.label} / Chat</p>
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
        </div>
        <div className="hero-quick">
          <span className="pill strong">Live</span>
          <span className="pill soft">HR online</span>
          <span className="pill soft">Fast replies</span>
        </div>
      </div>

      <div className="content-grid">
        <div className="chat-card">
          <div className="chat-card-header">
            <div>
              <p className="tag">Conversation</p>
              <h3>Messages with HR</h3>
              <p className="muted small">
                Use this channel to ask HR about leave, payroll, onboarding, or
                policies.
              </p>
            </div>
            <div className="pill-row">
              <span className="pill soft">Private</span>
              <span className="pill soft">Secure</span>
            </div>
          </div>
          <ChatWidget portal={portalId} />
        </div>
      </div>
    </DashboardShell>
  );
}

export default ChatPage;
