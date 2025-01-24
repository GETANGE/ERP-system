import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"; 
import AuthHeader from "./auth-header";
import BackButton from "./back-button"; 

interface CardWrapperProps {
  label: string;
  title: string;
  backButtonHref: () => void; // Function to handle navigation
  backButtonLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({ label, title, backButtonHref, backButtonLabel, children }: CardWrapperProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="lg:w-1/4 sm:w-1/2 shadow-md bg-white border border-none">
        <CardHeader>
          <AuthHeader label={label} title={title} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-center">
          <BackButton label={backButtonLabel} link={backButtonHref} />
        </CardFooter>
      </Card>
    </div>
  );
};
export default CardWrapper;