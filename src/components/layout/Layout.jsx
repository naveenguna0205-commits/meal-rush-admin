import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toast } from '../common/Toast';
import { useAdmin } from '../../context/AdminContext';
import { DashboardModule } from '../modules/dashboard/DashboardModule';
import { OrderManagementModule } from '../modules/orders/OrderManagementModule';
import { RestaurantManagementModule } from '../modules/restaurants/RestaurantManagementModule';
import { DeliveryPartnerModule } from '../modules/riders/DeliveryPartnerModule';
import { CustomerManagementModule } from '../modules/customers/CustomerManagementModule';
import { PaymentsFinanceModule } from '../modules/finance/PaymentsFinanceModule';
import { OffersPromotionsModule } from '../modules/offers/OffersPromotionsModule';
import { SupportReportsModule } from '../modules/support/SupportReportsModule';
import { SettingsModule } from '../modules/settings/SettingsModule';

export const Layout = () => {
  const { activeModule } = useAdmin();
  const mainContentRef = React.useRef(null);

  // Automatically scroll to the top when navigating between modules so the next module always starts from the top
  React.useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      mainContentRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeModule]);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'orders':
        return <OrderManagementModule />;
      case 'restaurants':
        return <RestaurantManagementModule />;
      case 'riders':
        return <DeliveryPartnerModule />;
      case 'customers':
        return <CustomerManagementModule />;
      case 'finance':
      case 'payments':
        return <PaymentsFinanceModule />;
      case 'offers':
      case 'promotions':
        return <OffersPromotionsModule />;
      case 'support':
      case 'reports':
        return <SupportReportsModule />;
      case 'settings':
        return <SettingsModule />;
      case 'dashboard':
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased overflow-hidden">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable Main Content Container */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-6 lg:p-8 scroll-smooth">
          <div key={activeModule} className="max-w-7xl mx-auto animate-fadeInDown">
            {renderActiveModule()}
          </div>
        </main>
      </div>

      {/* Floating Action Notifications */}
      <Toast />
    </div>
  );
};
