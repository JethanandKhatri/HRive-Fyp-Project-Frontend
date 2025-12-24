import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Sparkles, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

const suggestedQuestions = [
  "How many employees joined this quarter?",
  "What's the average leave balance?",
  "Show me the payroll summary for December",
  "Who has pending leave requests?",
  "What's the attendance rate this month?",
];

const chatHistory = [
  {
    id: 1,
    role: "user",
    content: "How many employees are currently on leave?",
    time: "2 min ago",
  },
  {
    id: 2,
    role: "assistant",
    content: "Currently, 5 employees are on approved leave. Here's the breakdown:\n\n• 3 on Annual Leave\n• 1 on Sick Leave\n• 1 on Personal Leave\n\nWould you like me to show you the detailed list?",
    time: "2 min ago",
  },
  {
    id: 3,
    role: "user",
    content: "What's the attendance rate for December?",
    time: "1 min ago",
  },
  {
    id: 4,
    role: "assistant",
    content: "The attendance rate for December 2024 is **94%**, which is a 2% improvement compared to November (92%).\n\n**Key metrics:**\n• Total working days: 22\n• Average present: 152 employees/day\n• Average absent: 8 employees/day\n• Late arrivals: 12 avg/day\n\nThis is the highest attendance rate in the last 6 months!",
    time: "Just now",
  },
];

const AskHR = () => {
  const [message, setMessage] = useState("");

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight">AskHR</h1>
          <p className="text-muted-foreground">AI-powered HR assistant for instant answers</p>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Chat Area */}
          <Card className="flex flex-1 flex-col shadow-md animate-slide-up">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                HRive AI Assistant
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" ? (
                    <Avatar className="h-8 w-8 shrink-0">
                      <div className="flex h-full w-full items-center justify-center gradient-primary rounded-full">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{msg.content}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs opacity-70">{msg.time}</span>
                      {msg.role === "assistant" && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask anything about HR, employees, payroll..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button className="gap-2 gradient-primary border-0">
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>

          {/* Suggested Questions */}
          <Card className="w-80 shrink-0 shadow-md animate-slide-up hidden xl:block" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto w-full justify-start whitespace-normal p-3 text-left text-sm hover:bg-secondary"
                  onClick={() => setMessage(question)}
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 text-primary" />
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AskHR;



