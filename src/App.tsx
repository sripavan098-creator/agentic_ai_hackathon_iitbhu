import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Architecture from './components/Architecture';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import CodeShowcase from './components/CodeShowcase';
import Repository from './components/Repository';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Architecture />
      <HowItWorks />
      <Impact />
      <CodeShowcase />
      <Repository />
      <Footer />
    </div>
  );
}
