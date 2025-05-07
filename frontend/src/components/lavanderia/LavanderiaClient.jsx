'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardSummary from './DashboardSummary';
import ServiceRequests from './ServiceRequests';
import ServicesGrid from './ServicesGrid';
import InventoryTable from './InventoryTable';
import NewRequestModal from './modals/NewRequestModal';
import CallModal from './modals/CallModal';
import { SocketProvider } from './context/SocketContext';

export default function LavanderiaClient() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  const handleNewRequest = () => {
    setShowNewRequestModal(true);
  };
  
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowNewRequestModal(true);
  };
  
  return (
    <SocketProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar expanded={sidebarExpanded} />
        
        <main className="flex-1 overflow-auto">
          <Header 
            toggleSidebar={toggleSidebar} 
          />
          
          <div className="p-6">
            <DashboardSummary />
            
            <ServiceRequests 
              onNewRequest={handleNewRequest} 
            />
            
            <ServicesGrid 
              onServiceSelect={handleServiceSelect} 
            />
            
            <InventoryTable />
          </div>
        </main>
        
        <NewRequestModal 
          isOpen={showNewRequestModal} 
          onClose={() => setShowNewRequestModal(false)}
          selectedService={selectedService} 
        />
        
        <CallModal />
      </div>
    </SocketProvider>
  );
}