"use client";

import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <Card>
      <Typography>
        <Title level={2}>About 3DN AI Portal</Title>

        <Paragraph>
          The 3DN AI Portal is a comprehensive development environment for
          building AI-powered applications. It combines modern web technologies
          with powerful AI capabilities to create a flexible and scalable
          platform.
        </Paragraph>

        <Title level={3}>Core Features</Title>
        <Paragraph>
          <ul>
            <li>
              Next.js frontend with Refine Framework for rapid development
            </li>
            <li>Keycloak authentication for secure access control</li>
            <li>PostgreSQL with pgvector for AI vector operations</li>
            <li>MongoDB for flexible document storage</li>
            <li>Flowise AI workflow builder for visual AI development</li>
          </ul>
        </Paragraph>

        <Title level={3}>Architecture</Title>
        <Paragraph>
          The platform is built on a microservices architecture using Docker
          containers:
          <ul>
            <li>Frontend: Next.js application for the user interface</li>
            <li>
              Authentication: Keycloak for user management and access control
            </li>
            <li>
              Databases:
              <ul>
                <li>
                  PostgreSQL with pgvector for vector operations and structured
                  data
                </li>
                <li>MongoDB for document storage and metadata</li>
              </ul>
            </li>
            <li>
              AI Services: Flowise for building and deploying AI workflows
            </li>
            <li>
              Management Tools: PGAdmin and Mongo Express for database
              administration
            </li>
          </ul>
        </Paragraph>

        <Title level={3}>Development</Title>
        <Paragraph>
          The platform is designed for extensibility and ease of development:
          <ul>
            <li>Hot-reloading development environment</li>
            <li>Containerized services for consistent development</li>
            <li>Integrated development tools and admin interfaces</li>
            <li>Comprehensive API support for custom integrations</li>
          </ul>
        </Paragraph>

        <Title level={3}>Using Cline to Add New Pages</Title>
        <Paragraph>
          This About page itself was created using Cline, our AI development
          assistant. Here's how to add a new page to the portal:
        </Paragraph>

        <Title level={4}>1. Create Page Structure</Title>
        <Paragraph>
          Cline will:
          <ul>
            <li>Create a new directory in src/app for your page</li>
            <li>Create page.tsx for the content</li>
            <li>Create layout.tsx to use ThemedLayoutV2</li>
          </ul>
        </Paragraph>

        <Title level={4}>2. Add Page Content</Title>
        <Paragraph>
          <ul>
            <li>
              Use Ant Design components (Card, Typography, etc.) for consistent
              styling
            </li>
            <li>Mark the page component with "use client" directive</li>
            <li>Export the component as default</li>
          </ul>
        </Paragraph>

        <Title level={4}>3. Configure Layout</Title>
        <Paragraph>
          The layout.tsx file will:
          <ul>
            <li>Import ThemedLayoutV2 from @refinedev/antd</li>
            <li>Use the shared Header component</li>
            <li>Include authentication check</li>
            <li>Wrap the page content in ThemedLayoutV2</li>
          </ul>
        </Paragraph>

        <Title level={4}>4. Add to Navigation</Title>
        <Paragraph>
          In _refine_context.tsx, add the page to resources:
          <pre
            style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            {`{
  name: "your_page",
  list: "/your-page",
  meta: {
    label: "Your Page",
  },
}`}
          </pre>
        </Paragraph>

        <Title level={4}>Example Commands</Title>
        <Paragraph>
          To create a new page using Cline:
          <ol>
            <li>Ask Cline to "create a new page called X"</li>
            <li>Cline will create the necessary files and structure</li>
            <li>Review the changes and request any adjustments</li>
            <li>Test the new page in the portal</li>
          </ol>
        </Paragraph>

        <Paragraph>
          Cline handles all the boilerplate code, ensuring consistency with the
          portal's architecture and styling.
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default AboutPage;
