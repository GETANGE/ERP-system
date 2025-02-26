import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number; // Auto-close duration in milliseconds
}

export default function Notification({ message, type = "success", onClose, duration = 3000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Wrap icons inside <span> for better styling
  const iconMap = {
    success: (
      <span className="text-green-500">
        <CheckCircle className="h-5 w-5" />
      </span>
    ),
    error: (
      <span className="text-red-500">
        <XCircle className="h-5 w-5" />
      </span>
    ),
    warning: (
      <span className="text-yellow-500">
        <AlertCircle className="h-5 w-5" />
      </span>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center w-full max-w-md p-4 rounded-lg shadow-lg 
        ${type === "success" ? "bg-green-100" : type === "error" ? "bg-red-100" : "bg-yellow-100"}`}
    >
      {iconMap[type]}
      <span className="ml-3 text-sm font-medium text-gray-900">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}
