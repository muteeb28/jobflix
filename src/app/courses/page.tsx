import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CourseList from "@/components/CourseList";
import CourseListBackend from "@/components/CourseListBackend";
import Footer from "@/components/Footer";

export default function CoursesHome() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <Navbar />
      <HeroSection />
      <CourseListBackend />
      <CourseList />
      <FeaturesSection />
<Footer />
    </div>
  );
}
