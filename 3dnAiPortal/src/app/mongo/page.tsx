"use client";

import React, { useEffect, useState } from "react";
import { Card, Table, Typography, Form, Input, Button, message } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

interface MongoDocument {
  collection: string;
  documents: any[];
}

export default function MongoPage() {
  const [data, setData] = useState<MongoDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/mongo");
      const result = await response.json();
      console.log("MongoDB Response:", result);
      if (Array.isArray(result)) {
        setData(result);
      } else if (result.error) {
        console.error("MongoDB Error:", result.error);
        setData([]);
      } else {
        console.error("Unexpected response format:", result);
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch MongoDB data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      setCreating(true);

      // Parse the JSON document
      let parsedDocument;
      try {
        parsedDocument = JSON.parse(values.document);
      } catch (e) {
        message.error("Invalid JSON format");
        return;
      }

      const response = await fetch("/api/mongo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName: values.collectionName,
          document: parsedDocument,
        }),
      });

      const result = await response.json();

      if (result.success) {
        message.success("Document created successfully");
        form.resetFields();
        // Refresh the data
        fetchData();
      } else {
        message.error(result.error || "Failed to create document");
      }
    } catch (error) {
      console.error("Failed to create document:", error);
      message.error("Failed to create document");
    } finally {
      setCreating(false);
    }
  };

  const renderDocuments = (collection: MongoDocument) => {
    if (!collection.documents.length) {
      return <p>No documents found in this collection.</p>;
    }

    // Create columns dynamically based on the first document
    const firstDoc = collection.documents[0];
    const columns = Object.keys(firstDoc).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      render: (value: any) => {
        if (typeof value === "object") {
          return JSON.stringify(value);
        }
        return value;
      },
    }));

    return (
      <Table
        dataSource={collection.documents}
        columns={columns}
        rowKey="_id"
        scroll={{ x: true }}
      />
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>MongoDB Collections</Title>

      <Card title="Create New Document" style={{ marginBottom: 24 }}>
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="collectionName"
            label="Collection Name"
            rules={[
              { required: true, message: "Please input the collection name" },
            ]}
          >
            <Input placeholder="Enter collection name" />
          </Form.Item>

          <Form.Item
            name="document"
            label="Document (JSON)"
            rules={[
              { required: true, message: "Please input the document JSON" },
              {
                validator: async (_, value) => {
                  if (value) {
                    try {
                      JSON.parse(value);
                    } catch (e) {
                      throw new Error("Invalid JSON format");
                    }
                  }
                },
              },
            ]}
          >
            <TextArea rows={4} placeholder='{"key": "value"}' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={creating}>
              Create Document
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((collection) => (
          <Card
            key={collection.collection}
            title={collection.collection}
            style={{ marginBottom: 16 }}
          >
            {renderDocuments(collection)}
          </Card>
        ))
      )}
    </div>
  );
}
