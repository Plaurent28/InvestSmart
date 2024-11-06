import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu,
  Plus,
  Settings,
  LogOut,
  Bell,
  X,
  Wallet,
  TrendingUp,
  Bank,
  FileText
} from 'lucide-react';

const DashboardMobile = () => {
  const navigate = useNavigate();  
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleAddInvestment = () => {
    navigate('/connections/banks');
  };

  // Fonction de navigation
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Menu latéral avec les options correctes
  const SideMenu = () => (
    <div 
      className={`fixed inset-y-0 left-0 w-64 bg-white transform ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out z-50`}
    >
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Menu</h2>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Menu items avec navigation */}
        <nav className="space-y-2">
          {[
            { icon: Wallet, label: 'Dashboard', path: '/' },
            { icon: FileText, label: 'Premium', path: '/premium' },
            { icon: Bank, label: 'Banques', path: '/banks' },
            { icon: FileText, label: 'Rapports', path: '/reports' },
            { icon: Settings, label: 'Paramètres', path: '/account/settings' },
            { icon: LogOut, label: 'Déconnexion', path: '/logout' }
          ].map((item, index) => (
            <button 
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
            >
              <item.icon size={20} className="text-gray-600" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-lg mx-auto">
        {/* En-tête avec logo, menu et bouton d'ajout */}
        <div className="flex flex-col p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMenuOpen(true)}
                className="p-2 bg-white/90 rounded-full hover:bg-white"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">InvestSmart</h1>
            </div>
            <button 
              onClick={handleAddInvestment}
              className="p-2 bg-white/90 rounded-full hover:bg-white"
            >
              <Plus size={24} />
            </button>
          </div>
          <h2 className="text-xl text-white">Mon Portfolio</h2>
        </div>

        {/* ... Reste du contenu identique ... */}

        {/* Menu raccourcis avec les nouveaux libellés et navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-lg mx-auto px-4 py-2">
            <div className="flex justify-around">
              {[
                { icon: Wallet, label: 'Dashboard', path: '/' },
                { icon: FileText, label: 'Premium', path: '/premium' },
                { icon: Bank, label: 'Banques', path: '/banks' },
                { icon: FileText, label: 'Rapports', path: '/reports' }
              ].map((item, index) => (
                <button 
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="flex flex-col items-center p-2"
                >
                  <item.icon size={24} className="text-gray-600" />
                  <span className="text-xs text-gray-600 mt-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ... Reste du composant identique ... */}
      </div>

      <SideMenu />
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardMobile;