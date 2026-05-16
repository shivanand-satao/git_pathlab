import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { ChevronLeft, ChevronRight, BarChart3, Users, FileText, HardDrive } from "lucide-react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface AnalyticsData {
  newUsers: number;
  newReports: number;
  consentsPending: number;
  storageUsed: string;
  successfulShares: number;
  pendingConsents: number;
}

// Mock analytics data for each month
const analyticsDataByMonth: Record<number, AnalyticsData> = {
  0: { newUsers: 48, newReports: 127, consentsPending: 12, storageUsed: "1.2 TB", successfulShares: 119, pendingConsents: 8 },
  1: { newUsers: 62, newReports: 156, consentsPending: 18, storageUsed: "1.4 TB", successfulShares: 148, pendingConsents: 12 },
  2: { newUsers: 55, newReports: 134, consentsPending: 14, storageUsed: "1.3 TB", successfulShares: 127, pendingConsents: 10 },
  3: { newUsers: 71, newReports: 178, consentsPending: 16, storageUsed: "1.6 TB", successfulShares: 168, pendingConsents: 14 },
};

const totalStorageCapacityTb = 2;

const getStorageUsedPercent = (storageUsed: string) => {
  const match = storageUsed.match(/([\d.]+)/);
  const used = match ? Number.parseFloat(match[1]) : 0;

  return Math.min(100, Math.max(0, (used / totalStorageCapacityTb) * 100));
};

const getStorageToneClass = (percent: number) => {
  if (percent >= 80) return "text-destructive";
  if (percent <= 30) return "text-success";
  return "text-warning";
};

const getStorageFillClass = (percent: number) => {
  if (percent >= 80) return "bg-destructive";
  if (percent <= 30) return "bg-success";
  return "bg-warning";
};

const Overview = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const analyticsData = analyticsDataByMonth[selectedMonth] || analyticsDataByMonth[3];
  const storageUsedPercent = getStorageUsedPercent(analyticsData.storageUsed);
  const storageToneClass = getStorageToneClass(storageUsedPercent);
  const storageFillClass = getStorageFillClass(storageUsedPercent);

  // Calculate year-to-date metrics
  const yearToDateMetrics = useMemo(() => {
    let totalNewUsers = 0;
    let totalReports = 0;

    for (let i = 0; i <= selectedMonth; i++) {
      if (analyticsDataByMonth[i]) {
        totalNewUsers += analyticsDataByMonth[i].newUsers;
        totalReports += analyticsDataByMonth[i].newReports;
      }
    }

    return { totalNewUsers, totalReports };
  }, [selectedMonth]);

  const monthsToDisplay = selectedMonth + 1;

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">PathLab Dashboard</h1>
          <p className="text-sm text-primary mt-1">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Month Selector with Calendar */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Analytics by Month</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
                disabled={selectedMonth === 0}
                className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="min-w-[200px] text-center">
                <p className="text-sm font-semibold text-foreground">{monthNames[selectedMonth]} {currentYear}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedMonth === currentMonth ? "Current Month" : "Selected Month"}
                </p>
              </div>
              <button
                onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
                disabled={selectedMonth === 11}
                className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
            {monthNames.map((month, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMonth(idx)}
                disabled={idx > currentMonth}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  selectedMonth === idx
                    ? "bg-primary text-primary-foreground"
                    : idx > currentMonth
                      ? "bg-secondary/30 text-muted-foreground cursor-not-allowed opacity-50"
                      : "bg-secondary border border-border hover:border-primary/50 text-foreground hover:bg-secondary/80"
                }`}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>

          {/* Summary Info */}
          <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Year-to-Date Summary (January to {monthNames[selectedMonth]})</p>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="font-semibold text-foreground">{yearToDateMetrics.totalNewUsers}</p>
                <p className="text-xs text-muted-foreground">Total New Users</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{yearToDateMetrics.totalReports}</p>
                <p className="text-xs text-muted-foreground">Total Reports Sent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">New Users</p>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analyticsData.newUsers}</p>
            <p className="text-xs text-success mt-2">In {monthNames[selectedMonth]}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Reports Sent</p>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analyticsData.newReports}</p>
            <p className="text-xs text-success mt-2">{analyticsData.successfulShares} successfully shared</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Storage Used</p>
              <HardDrive className={`w-4 h-4 ${storageToneClass}`} />
            </div>
            <p className={`text-3xl font-bold ${storageToneClass}`}>{analyticsData.storageUsed}</p>
            <div className="mt-3 h-2 rounded-full bg-border overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${storageFillClass}`}
                style={{ width: `${storageUsedPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Total capacity: 2.0 TB</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Pending Consents</p>
              <BarChart3 className="w-4 h-4 text-warning" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analyticsData.pendingConsents}</p>
            <p className="text-xs text-warning mt-2">Awaiting OTP verification</p>
          </div>
        </div>

        {/* Detailed Analytics Card */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Detailed Metrics for {monthNames[selectedMonth]} {currentYear}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">New Patient Registrations</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData.newUsers}</p>
              <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(analyticsData.newUsers / 100) * 100}%` }} />
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Reports Successfully Shared</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData.successfulShares}</p>
              <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: `${(analyticsData.successfulShares / analyticsData.newReports) * 100}%` }} />
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Failed/Pending Shares</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData.newReports - analyticsData.successfulShares}</p>
              <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-warning" style={{ width: `${((analyticsData.newReports - analyticsData.successfulShares) / analyticsData.newReports) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Overview;
