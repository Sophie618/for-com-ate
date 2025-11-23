import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import ProfileModal from './components/ProfileModal';
import AuthModal from './components/AuthModal';

const LandingPage = () => {
  const [showProfileWizard, setShowProfileWizard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileSubmit = (profile: any) => {
    console.log('Profile submitted:', profile);
    setShowProfileWizard(false);
    navigate('/chat');
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    // After login, show profile wizard
    setShowProfileWizard(true);
  };

  return (
    <>
      <Navbar onLoginClick={() => setShowAuthModal(true)} />
      <main>
        <Hero onStartClick={() => setShowAuthModal(true)} />
        <Features />
        <Testimonials />
        <CTA onStartClick={() => setShowAuthModal(true)} />
      </main>
      <Footer />
      
      <ProfileModal 
        isOpen={showProfileWizard} 
        onClose={() => setShowProfileWizard(false)}
        onSubmit={handleProfileSubmit}
        mode="wizard"
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;