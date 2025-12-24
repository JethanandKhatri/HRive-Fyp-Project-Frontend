import { useState } from "react";
import { LineManagerLayout } from "@/components/layout/LineManagerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send,
  HelpCircle,
  FileText,
  Calendar,
  Users,
  Clock
} from "lucide-react";

const suggestedQuestions = [
  { icon: Calendar, question: "What is the leave approval process?" },
  { icon: Users, question: "How do I handle team performance issues?" },
  { icon: FileText, question: "What are the company expense policies?" },
  { icon: Clock, question: "How to manage overtime requests?" },
];

const initialMessages = [
  { 
    id: 1, 
    role: "assistant", 
    content: "Hello! I'm your HR Assistant. I can help you with HR policies, leave management, team guidelines, and more. How can I assist you today?" 
  }
];

export default function ManagerAskHR() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Thank you for your question. Based on company policy, I can provide the following guidance. For specific cases or exceptions, please reach out to your HR Manager directly."
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  return (
    <LineManagerLayout>
      <div className="space-y-6 h-[calc(100vh-8rem)]">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">AskHR</h1>
          <p className="text-muted-foreground mt-1">Get instant answers to HR policy questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-5rem)]">
          {/* Suggested Questions */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Suggested Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(item.question)}
                    className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground"
                  >
                    <div className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item.question}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Note:</span> This assistant provides general policy guidance. 
                  For sensitive matters, please contact HR directly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <Card className="lg:col-span-3 border-border flex flex-col h-full">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                HR Assistant
              </CardTitle>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your HR question..."
                  className="flex-1"
                />
                <Button onClick={handleSend} className="gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LineManagerLayout>
  );
}



