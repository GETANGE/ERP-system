import { ShieldHalf, CalendarCheck, Database, DollarSign, Users, GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "Alice Wanjiku",
    company: "Juja Mart Supplies",
    image: user1,
    text: "Bizedge ERP has completely transformed the way we manage our inventory and sales. The automation and reporting tools have saved us countless hours and improved our decision-making.",
  },
  {
    user: "Mark Otieno",
    company: "Nairobi Tech Solutions",
    image: user2,
    text: "Implementing Bizedge was the best decision for our growing business. The user-friendly interface and robust features make daily operations seamless and efficient.",
  },
  {
    user: "Grace Mwangi",
    company: "Kisumu Agro Dealers",
    image: user3,
    text: "With Bizedge, we now have complete visibility over our supply chain. The analytics dashboard has been invaluable in tracking performance and identifying areas of improvement.",
  },
  {
    user: "Peter Kamau",
    company: "Mombasa Textiles",
    image: user4,
    text: "The support team at Bizedge is incredible! They guided us through the implementation process, ensuring minimal downtime. We’ve seen tremendous improvements in productivity since day one.",
  },
  {
    user: "Lucy Nyawira",
    company: "Eldoret Fresh Produce",
    image: user5,
    text: "Bizedge ERP has streamlined our financial tracking and made compliance effortless. The integration features have also allowed us to connect with other tools we rely on daily.",
  },
  {
    user: "Daniel Njuguna",
    company: "Thika Home Essentials",
    image: user6,
    text: "Thanks to Bizedge, managing multiple outlets is no longer a challenge. The system’s multi-location support and detailed reports have given us a competitive edge in the market.",
  },
];


export const features = [
  {
    icon: <Database />,
    text: "Centralized Data Management",
    description:
      "Easily access and manage all your business data from a single, unified platform, reducing redundancy and errors.",
  },
  {
    icon: <ShieldHalf />,
    text: "Advanced Reporting",
    description:
      "Generate detailed, customizable reports to gain insights into your business performance and make data-driven decisions.",
  },
  {
    icon: <Users />,
    text: "Role-Based Access Control",
    description:
      "Ensure data security by assigning specific roles and permissions to your team members based on their responsibilities.",
  },
  {
    icon: <CalendarCheck />,
    text: "Integrated Task Management",
    description:
      "Streamline workflows with built-in task management tools, allowing you to assign, track, and complete tasks efficiently.",
  },
  {
    icon: <GlobeLock/>,
    text: "Inventory & Order Tracking",
    description:
      "Track inventory levels and manage purchase orders with real-time updates to ensure smooth supply chain operations.",
  },
  {
    icon: <DollarSign />,
    text: "Financial Integration",
    description:
      "Manage accounts, invoices, and expenses seamlessly with integrated financial tools for complete transparency.",
  },
];


export const checklistItems = [
  {
    title: "Streamlined Inventory Management",
    description:
      "Easily track stock levels, manage inventory across locations, and reduce shortages or overstocking.",
  },
  {
    title: "Automated Financial Reporting",
    description:
      "Generate accurate financial reports with ease, ensuring compliance and saving valuable time.",
  },
  {
    title: "Seamless Team Collaboration",
    description:
      "Empower your team with tools to communicate, assign tasks, and track progress in real-time.",
  },
  {
    title: "Customizable Dashboards",
    description:
      "Access critical business insights at a glance with fully customizable and intuitive dashboards.",
  },
];

export const pricingOptions = [
  {
    title: "Starter",
    price: "Ksh. 0",
    features: [
      "Basic Inventory Management",
      "10 Product Entries",
      "Standard Reporting",
      "Community Support",
      "Basic User Management"
    ],
  },
  {
    title: "Pro",
    price: "Ksh. 1000",
    features: [
      "Advanced Inventory Management",
      "Unlimited Product Entries",
      "Customizable Reports",
      "Email Support",
      "Role-Based Access Control",
    ],
  },
  {
    title: "Enterprise",
    price: "Ksh. 5000",
    features: [
      "Full ERP Suite Access",
      "Unlimited Storage",
      "Advanced Analytics & Dashboards",
      "Dedicated Account Manager",
      "Priority 24/7 Support",
    ],
  },
];


export const resourcesLinks = [
  { href: "tel:+1234567890", text: "Call Us: +254 756745002" },
  { href: "mailto:support@bizedge.com", text: "Email Us: support@bizedge.com" },
  { href: "https://bizedge.com/contact", text: "Contact Form" },
  { href: "https://bizedge.com/faq", text: "FAQs" },
  { href: "https://bizedge.com/live-chat", text: "Live Chat Support" },
];

export const platformLinks = [
  { href: "#", text: "ERP Features" },
  { href: "#", text: "Supported Business Types" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Download ERP Demo" },
  { href: "#", text: "Version Updates" },
];

export const communityLinks = [
  { href: "#", text: "User Feedback Forum" },
  { href: "#", text: "BizEdge Webinars" },
  { href: "#", text: "Industry Conferences" },
  { href: "#", text: "Networking Events" },
  { href: "#", text: "Career Opportunities" },
];
