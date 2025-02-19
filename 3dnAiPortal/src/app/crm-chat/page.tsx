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

export default function CRMChatPage() {
  return (
    <div
      style={{
        height: "calc(100vh - 10px)",
        overflow: "hidden",
        padding: "0 16px 16px 16px",
      }}
    >
      <FullPageChat
        chatflowid="e57eb924-ab07-4d60-ac1d-904da59ed906"
        apiHost="http://localhost:3002"
        theme={{
          chatWindow: {
            showTitle: true,
            title: "CRM Assistant",
            welcomeMessage:
              "Hi there! How can I help you with CRM-related questions?",
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
