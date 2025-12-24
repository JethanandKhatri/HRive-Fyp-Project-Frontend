import { useState } from "react";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, Clock, Calendar, Receipt, HelpCircle } from "lucide-react";

const suggestedQuestions = [
  { icon: Calendar, text: "What is the leave policy?" },
  { icon: Clock, text: "What are the working hours?" },
  { icon: Receipt, text: "When is payday?" },
  { icon: HelpCircle, text: "How do I request leave?" },
];

const initialMessages = [
  {
    id: 1,
    type: "bot",
    message: "Hello! I'm your HR assistant. I can help you with questions about company policies, leave, attendance, and more. How can I assist you today?",
  },
];

export default function EmployeeAskHR() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (text) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: messageText,
    };

    // Simulate bot response
    const botResponse = {
      id: messages.length + 2,
      type: "bot",
      message: getBotResponse(messageText),
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue("");
  };

  const getBotResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("leave policy") || lowerQuestion.includes("leave")) {
      return "Our leave policy includes:\n\n• Annual Leave: 20 days per year\n• Sick Leave: 10 days per year\n• Casual Leave: 5 days per year\n\nLeave requests should be submitted at least 3 days in advance for planned leave. For sick leave, please inform your manager as soon as possible.";
    }

    if (lowerQuestion.includes("working hours") || lowerQuestion.includes("work hours")) {
      return "Standard working hours are Monday to Friday, 9:00 AM to 6:00 PM, with a 1-hour lunch break. Flexible timing is available with manager approval. Core hours are 10:00 AM to 4:00 PM when all team members should be available.";
    }

    if (lowerQuestion.includes("payday") || lowerQuestion.includes("salary") || lowerQuestion.includes("pay")) {
      return "Salaries are paid on the last working day of each month. Payslips are available in the Payslips section of your employee portal. If you have any discrepancies, please contact HR within 5 working days.";
    }

    if (lowerQuestion.includes("request leave") || lowerQuestion.includes("apply leave")) {
      return "To request leave:\n\n1. Go to the Leave section in your portal\n2. Click 'Request Leave'\n3. Select leave type and dates\n4. Add a reason (optional)\n5. Submit for approval\n\nYour manager will review and approve/reject your request.";
    }

    return "Thank you for your question. For specific policy details, please refer to the employee handbook or contact HR directly at hr@company.com. Is there anything else I can help you with?";
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in h-[calc(100vh-10rem)]">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">AskHR</h1>
          <p className="text-muted-foreground">Get instant answers to HR questions</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100%-4rem)]">
          {/* Chat Window */}
          <Card className="lg:col-span-3 shadow-card flex flex-col h-full">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">HR Assistant</CardTitle>
                  <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${
                        msg.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-3"
                >
                  <Input
                    placeholder="Type your question..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="gradient-primary border-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card className="shadow-card h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 text-left"
                  onClick={() => handleSendMessage(question.text)}
                >
                  <question.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">{question.text}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </EmployeeLayout>
  );
}



