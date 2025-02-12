"use client";

import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const ServicesPage: React.FC = () => {
  const serviceCardStyle = {
    marginBottom: "16px",
    borderLeft: "4px solid #1890ff",
    backgroundColor: "#f5f5f5",
  };

  return (
    <Card>
      <Typography>
        <Title level={2}>TDN AI Build Framework Services</Title>

        <Title level={3}>Main Application</Title>
        <Card style={serviceCardStyle}>
          <Title level={4}>Next.js Application</Title>
          <Paragraph>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
            >
              Development Server
            </a>
          </Paragraph>
        </Card>

        <Title level={3}>Authentication</Title>
        <Card style={serviceCardStyle}>
          <Title level={4}>Keycloak Admin Console</Title>
          <Paragraph>
            <a
              href="http://localhost:8080"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:8080
            </a>
            <br />
            Username: admin
            <br />
            Password: ASlobdQ3ji
          </Paragraph>
        </Card>

        <Title level={3}>AI Services</Title>
        <Card style={serviceCardStyle}>
          <Title level={4}>Flowise AI Flow Builder</Title>
          <Paragraph>
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:3002
            </a>
            <br />
            Username: admin
            <br />
            Password: ASlobdQ3ji
          </Paragraph>
        </Card>

        <Title level={3}>Database Management</Title>
        <Card style={serviceCardStyle}>
          <Title level={4}>PGAdmin (PostgreSQL)</Title>
          <Paragraph>
            <a
              href="http://localhost:5050"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5050
            </a>
            <br />
            Email: admin@admin.com
            <br />
            Password: ASlobdQ3ji
          </Paragraph>
        </Card>
        <Card style={serviceCardStyle}>
          <Title level={4}>Mongo Express</Title>
          <Paragraph>
            <a
              href="http://localhost:8081"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:8081
            </a>
            <br />
            Username: admin
            <br />
            Password: ASlobdQ3ji
          </Paragraph>
        </Card>

        <Title level={3}>Database Connections</Title>
        <Card style={serviceCardStyle}>
          <Title level={4}>PostgreSQL</Title>
          <Paragraph>
            Host: localhost
            <br />
            Port: 5433
            <br />
            Database: appdb
            <br />
            Username: admin
            <br />
            Password: ASlobdQ3ji
          </Paragraph>
        </Card>
        <Card style={serviceCardStyle}>
          <Title level={4}>MongoDB</Title>
          <Paragraph>
            Host: localhost
            <br />
            Port: 27017
            <br />
            Database: appdb
            <br />
            Username: admin
            <br />
            Password: ASlobdQ3ji
          </Paragraph>
        </Card>
      </Typography>
    </Card>
  );
};

export default ServicesPage;
