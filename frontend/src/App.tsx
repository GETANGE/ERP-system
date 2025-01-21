import HeroSection from "./layouts/Landing page/Herosection";
import Navbar from "./layouts/Landing page/Navbar";
import Features from "./layouts/Landing page/Features";
import Workflow from "./layouts/Landing page/Workflow";

export default function App() {
  return (
    <>
      <Navbar/>
      <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection/>
          <Features/>
          <Workflow/>
      </div>
    </>
  )
}