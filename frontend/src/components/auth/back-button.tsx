interface BackButtonProps {
  label?: string;
  link?: () => void;
}

const BackButton = ({ label, link }: BackButtonProps) => {
  return (
    <a className="text-neutral-500" onClick={link}>
      {label === "Sign in here" ? (
        <span className="hover:cursor-pointer bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Register here.
        </span>
      ) : label === "Create an account" ? (
        <span className="hover:cursor-pointer bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Login here.
        </span>
      ) : (
        <span></span>
      )}
    </a>
  );
};

export default BackButton;
