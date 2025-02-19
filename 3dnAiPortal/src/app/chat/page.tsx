"use client";

import dynamic from "next/dynamic";
import { Spin } from "antd";

const FullPageChat = dynamic(
  () => import("flowise-embed-react").then((mod) => mod.FullPageChat),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    ),
  }
);

export default function ChatPage() {
  return (
    <div
      style={{
        height: "calc(100vh - 10px)",
        overflow: "hidden",
        padding: "0 16px 16px 16px",
      }}
    >
      <FullPageChat
        chatflowid="6b4f84e7-03f7-4945-bdd4-f8521675461d"
        apiHost="http://localhost:3002"
        theme={{
          chatWindow: {
            showTitle: true,
            title: "TDN Assistant",
            welcomeMessage: "Hi there! How can I help you today?",
            backgroundColor: "#ffffff",
            fontSize: 16,
            botMessage: {
              backgroundColor: "#f7f8ff",
              textColor: "#303235",
              showAvatar: true,
            },
            userMessage: {
              backgroundColor: "#3B81F6",
              textColor: "#ffffff",
              showAvatar: true,
            },
            textInput: {
              placeholder: "Type your question",
              backgroundColor: "#ffffff",
              textColor: "#303235",
              sendButtonColor: "#3B81F6",
            },
            footer: {
              textColor: "#303235",
              text: "Powered by",
              company: "TDN",
              companyLink: "https://3degreesnorth.com.au",
            },
          },
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}
