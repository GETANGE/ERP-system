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
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
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
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
