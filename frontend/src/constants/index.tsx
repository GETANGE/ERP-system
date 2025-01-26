import { ShieldHalf, CalendarCheck, Database, DollarSign, Users, GlobeLock } from "lucide-react";


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
    image: "https://c1.wallpaperflare.com/preview/280/171/607/african-american-portrait-woman-female.jpg",
    text: "Bizedge ERP has completely transformed the way we manage our inventory and sales. The automation and reporting tools have saved us countless hours and improved our decision-making.",
  },
  {
    user: "Mark Otieno",
    company: "Nairobi Tech Solutions",
    image: "https://nextluxury.com/wp-content/uploads/Drop-Fade-_jjdavis93.jpg",
    text: "Implementing Bizedge was the best decision for our growing business. The user-friendly interface and robust features make daily operations seamless and efficient.",
  },
  {
    user: "Grace Mwangi",
    company: "Kisumu Agro Dealers",
    image: "https://i.pinimg.com/736x/93/0c/dc/930cdcc1b9672dc8f3e90294b72a88b8.jpg",
    text: "With Bizedge, we now have complete visibility over our supply chain. The analytics dashboard has been invaluable in tracking performance and identifying areas of improvement.",
  },
  {
    user: "Peter Kamau",
    company: "Mombasa Textiles",
    image: 'https://d.ibtimes.co.uk/en/full/1495181/africans-richest-people.jpg',
    text: "The support team at Bizedge is incredible! They guided us through the implementation process, ensuring minimal downtime. We’ve seen tremendous improvements in productivity since day one.",
  },
  {
    user: "Lucy Nyawira",
    company: "Eldoret Fresh Produce",
    image: "https://cdnb.artstation.com/p/assets/images/images/044/130/959/large/tomislav-drenjancevic-17-10-12.jpg?1639168487",
    text: "Bizedge ERP has streamlined our financial tracking and made compliance effortless. The integration features have also allowed us to connect with other tools we rely on daily.",
  },
  {
    user: "Daniel Njuguna",
    company: "Thika Home Essentials",
    image: "https://i.pinimg.com/originals/7b/e8/8f/7be88f4f62679bf6d8c98e26060afbe0.jpg",
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
