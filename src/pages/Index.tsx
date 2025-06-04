import { useState } from "react";
import { FAQSidebar } from "@/components/FAQSidebar";
import { FAQContent } from "@/components/FAQContent";

// Sample FAQ data
const faqData = [
  {
    id: "1",
    question: "How do I get started with the product?",
    category: "Getting Started",
    answer: `
      <p>Getting started is easy! Follow these simple steps:</p>
      <ol>
        <li><strong>Create your account</strong> - Sign up using your email address</li>
        <li><strong>Complete your profile</strong> - Add your basic information and preferences</li>
        <li><strong>Take the tour</strong> - Our interactive guide will walk you through key features</li>
        <li><strong>Import your data</strong> - Connect your existing tools or upload files</li>
        <li><strong>Invite your team</strong> - Add colleagues to collaborate on projects</li>
      </ol>
      <p>The whole process typically takes less than 10 minutes. If you get stuck, our support team is always ready to help!</p>
    `,
    images: ["/placeholder.svg"],
    lastUpdated: "December 3, 2024"
  },
  {
    id: "2",
    question: "What are the pricing plans available?",
    category: "Billing & Pricing",
    answer: `
      <p>We offer flexible pricing plans to suit different needs:</p>
      <h3>Free Plan</h3>
      <ul>
        <li>Up to 3 projects</li>
        <li>Basic features</li>
        <li>Community support</li>
      </ul>
      <h3>Professional Plan - $19/month</h3>
      <ul>
        <li>Unlimited projects</li>
        <li>Advanced features</li>
        <li>Priority support</li>
        <li>Team collaboration</li>
      </ul>
      <h3>Enterprise Plan - Custom pricing</h3>
      <ul>
        <li>Custom integrations</li>
        <li>Dedicated support</li>
        <li>SLA guarantees</li>
        <li>Advanced security</li>
      </ul>
      <p>All plans include a 14-day free trial with no credit card required.</p>
    `,
    lastUpdated: "December 1, 2024"
  },
  {
    id: "3",
    question: "How do I integrate with third-party tools?",
    category: "Integrations",
    answer: `
      <p>Our platform supports numerous integrations to streamline your workflow:</p>
      <h3>Available Integrations</h3>
      <ul>
        <li><strong>CRM Systems:</strong> Salesforce, HubSpot, Pipedrive</li>
        <li><strong>Communication:</strong> Slack, Microsoft Teams, Discord</li>
        <li><strong>Development:</strong> GitHub, GitLab, Jira</li>
        <li><strong>Analytics:</strong> Google Analytics, Mixpanel, Amplitude</li>
      </ul>
      <h3>Setting up an Integration</h3>
      <ol>
        <li>Go to Settings > Integrations</li>
        <li>Find your desired integration</li>
        <li>Click "Connect" and authorize access</li>
        <li>Configure your sync preferences</li>
      </ol>
      <p>Most integrations sync data in real-time, ensuring your information is always up-to-date.</p>
    `,
    images: ["/placeholder.svg"],
    lastUpdated: "November 28, 2024"
  },
  {
    id: "4",
    question: "Is my data secure and backed up?",
    category: "Security & Privacy",
    answer: `
      <p>Security is our top priority. Here's how we protect your data:</p>
      <h3>Security Measures</h3>
      <ul>
        <li><strong>Encryption:</strong> All data encrypted in transit and at rest using AES-256</li>
        <li><strong>Access Control:</strong> Role-based permissions and two-factor authentication</li>
        <li><strong>Compliance:</strong> SOC 2 Type II, GDPR, and CCPA compliant</li>
        <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
      </ul>
      <h3>Backup & Recovery</h3>
      <ul>
        <li>Automated daily backups</li>
        <li>99.9% uptime SLA</li>
        <li>Point-in-time recovery available</li>
        <li>Geographic redundancy across multiple data centers</li>
      </ul>
      <p>We also conduct regular security audits and penetration testing to ensure your data remains protected.</p>
    `,
    lastUpdated: "December 2, 2024"
  },
  {
    id: "5",
    question: "How do I troubleshoot common errors?",
    category: "Troubleshooting",
    answer: `
      <p>Here are solutions to the most common issues users encounter:</p>
      <h3>Login Problems</h3>
      <ul>
        <li>Clear your browser cache and cookies</li>
        <li>Try an incognito/private browser window</li>
        <li>Reset your password if needed</li>
        <li>Check if caps lock is on</li>
      </ul>
      <h3>Performance Issues</h3>
      <ul>
        <li>Close unnecessary browser tabs</li>
        <li>Disable browser extensions temporarily</li>
        <li>Check your internet connection</li>
        <li>Try a different browser</li>
      </ul>
      <h3>Data Sync Problems</h3>
      <ul>
        <li>Check integration connection status</li>
        <li>Verify API credentials are still valid</li>
        <li>Look for any service outages</li>
        <li>Force a manual sync if available</li>
      </ul>
      <p>If these steps don't resolve your issue, please contact our support team with details about what you were trying to do when the error occurred.</p>
    `,
    images: ["/placeholder.svg"],
    lastUpdated: "November 30, 2024"
  },
  {
    id: "6",
    question: "How can I customize my dashboard?",
    category: "Customization",
    answer: `
      <p>Make your dashboard work exactly how you want it:</p>
      <h3>Layout Options</h3>
      <ul>
        <li><strong>Widget Management:</strong> Add, remove, or rearrange dashboard widgets</li>
        <li><strong>Custom Views:</strong> Create different dashboard layouts for different workflows</li>
        <li><strong>Responsive Design:</strong> Optimized for desktop, tablet, and mobile viewing</li>
      </ul>
      <h3>Personalization Features</h3>
      <ul>
        <li>Choose from multiple themes and color schemes</li>
        <li>Set default filters and sorting preferences</li>
        <li>Configure notification preferences</li>
        <li>Create custom shortcuts and quick actions</li>
      </ul>
      <h3>Advanced Customization</h3>
      <ul>
        <li>Build custom reports and charts</li>
        <li>Set up automated workflows</li>
        <li>Create custom fields and data types</li>
        <li>Design branded templates</li>
      </ul>
      <p>All customizations are saved to your profile and sync across all your devices.</p>
    `,
    lastUpdated: "December 1, 2024"
  }
];

const Index = () => {
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);

  const selectedFaq = selectedFaqId 
    ? faqData.find(faq => faq.id === selectedFaqId) || null
    : null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <FAQSidebar
        faqs={faqData}
        selectedFaqId={selectedFaqId}
        onSelectFaq={setSelectedFaqId}
      />
      <FAQContent faq={selectedFaq} />
    </div>
  );
};

export default Index;
