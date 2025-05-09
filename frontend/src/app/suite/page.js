'use client';

import { useState, useEffect } from 'react';
import '../../../styles/suite.css'
import { Sidebar } from '@/components/suite/Sidebar';
import { Header } from '@/components/suite/Header';
import { WelcomeSection } from '@/components/suite/WelcomeSection';
import { QuickActions } from '@/components/suite/QuickActions';
import { TelephonySection } from '@/components/suite/TelephonySection';
import { LightingSection } from '@/components/suite/LightingSection';
import { ClimateSection } from '@/components/suite/ClimateSection';
import { CallModal } from '@/components/suite/CallModal';
import Head from 'next/head';


export default function Suite() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isCallModalOpen, setCallModalOpen] = useState(false);
  const [callStatus, setCallStatus] = useState('');
  const [temperature, setTemperature] = useState(22);

  useEffect(() => {
  
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500;700&display=swap';
    document.head.appendChild(linkElement);
    
    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);
  
  // Função para atualizar o horário
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Função para controlar qual seção está ativa
  const handleNavigation = (section) => {
    setActiveSection(section);
  };
  
  // Função para controlar temperatura
  const handleTemperatureChange = (increment) => {
    setTemperature(prev => prev + increment);
  };
  
  // Simulação de chamada
  const handleCallAction = (target) => {
    setCallModalOpen(true);
    setCallStatus(`Chamando ${target}...`);
  };
  
  return (
    <>
      <Head>
        <title>Suíte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500;700&display=swap" />
      </Head>
      
      <audio id="localAudio" autoPlay muted></audio>
      <audio id="remoteAudio" autoPlay></audio>
      
      <Sidebar 
        activeSection={activeSection}
        onNavigate={handleNavigation}
        isOpen={isSidebarOpen}
      />
      
      <main className="content">
        <Header 
          title="Suíte Black"
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        
        <div className="content__container">
          {activeSection === 'home' && (
            <>
              <WelcomeSection />
              <QuickActions 
                temperature={temperature}
                onTemperatureChange={handleTemperatureChange}
              />
            </>
          )}
          
          {activeSection === 'telephony' && (
            <TelephonySection onCallAction={handleCallAction} />
          )}
          
          {activeSection === 'lights' && (
            <LightingSection />
          )}
          
          {activeSection === 'climate' && (
            <ClimateSection 
              temperature={temperature}
              onTemperatureChange={handleTemperatureChange}
            />
          )}
        </div>
      </main>
      
      <CallModal 
        isOpen={isCallModalOpen}
        status={callStatus}
        onClose={() => setCallModalOpen(false)}
      />
    </>
  );
}