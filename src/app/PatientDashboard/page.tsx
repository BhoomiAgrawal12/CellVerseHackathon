'use client';
import PageContainer from '@/app/PatientDashboard/components/container/PageContainer';
import HealthOverview from '@/app/PatientDashboard/components/dashboard/HealthOverview';
import BMI from '@/app/PatientDashboard/components/dashboard/BMI';
import RecentTransactions from '@/app/PatientDashboard/components/dashboard/RecentTransactions';
import Remainder from '@/app/PatientDashboard/components/dashboard/Remainder';
import Statistics from '@/app/PatientDashboard/components/dashboard/Statistics';
import Activity from '@/app/PatientDashboard/components/dashboard/Activity';
import Medicine from '@/app/PatientDashboard/components/dashboard/Medicine';

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <div className="p-6 space-y-6">
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HealthOverview />
          </div>
          <div className="space-y-6">
            <BMI />
            <Activity />
          </div>
        </div>
        
        {/* Statistics Section */}
        <Statistics />
        
        {/* Transactions & Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <Remainder />
        </div>
        
        {/* Medicine Section */}
        <Medicine />
      </div>
    </PageContainer>
  );
}
