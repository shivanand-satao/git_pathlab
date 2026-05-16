import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Phone, Calendar, User, Stethoscope, CheckCircle2, Clock, XCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import UserAvatar from "@/components/UserAvatar";
import { useNavigate } from "react-router-dom";
import { mockFiles } from "@/data/mockFiles";

const uniqueUsers = Array.from(
  new Map(mockFiles.map((f) => [f.user.id, { ...f.user, doctor: f.doctor, lastReport: f.uploadDate }])).values()
);

const doctors = ["All", "Dr. Mehta", "Dr. Khanna", "Dr. Iyer", "Dr. Sharma"];

const PatientsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "name" | "phone" | "doctor" | "status" | "date">("all");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Granted" | "Awaiting" | "Expired">("All");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    let users = [...uniqueUsers];

    // Apply search query with type filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      users = users.filter((u) => {
        switch (searchType) {
          case "name":
            return u.name.toLowerCase().includes(q);
          case "phone":
            return u.phone.includes(q);
          case "doctor":
            return u.doctor.toLowerCase().includes(q);
          case "date":
            return u.registrationDate.includes(q);
          case "status":
            return u.consentStatus.toLowerCase().includes(q);
          case "all":
          default:
            return (
              u.name.toLowerCase().includes(q) ||
              u.email.toLowerCase().includes(q) ||
              u.phone.includes(q) ||
              u.doctor.toLowerCase().includes(q) ||
              u.consentStatus.toLowerCase().includes(q)
            );
        }
      });
    }

    // Apply doctor filter
    if (selectedDoctor !== "All") {
      users = users.filter((u) => u.doctor === selectedDoctor);
    }

    // Apply status filter
    if (selectedStatus !== "All") {
      users = users.filter((u) => u.consentStatus === selectedStatus);
    }

    return users;
  }, [searchQuery, searchType, selectedDoctor, selectedStatus]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Granted":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "Awaiting":
        return <Clock className="w-4 h-4 text-warning" />;
      case "Expired":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dashboard › Patients</p>
          <h1 className="text-2xl font-bold text-foreground">Patient Database</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage all registered patients.</p>
        </div>

        {/* Advanced Search Section */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Search</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={`Search by ${searchType === "all" ? "name, phone, doctor, status" : searchType}...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Search Type</p>
              <select
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value as any);
                  setSearchQuery("");
                  setPage(1);
                }}
                className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                <option value="all">All Fields</option>
                <option value="name">Name</option>
                <option value="phone">Phone</option>
                <option value="doctor">Doctor</option>
                <option value="status">Consent Status</option>
                <option value="date">Registration Date</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Filter by</p>
              <div className="flex gap-2 flex-wrap">
                {doctors.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDoctor(d);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      selectedDoctor === d ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Stethoscope className="w-3 h-3" />
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Consent Status</p>
              <div className="flex gap-2 flex-wrap">
                {["All", "Granted", "Awaiting", "Expired"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status as any);
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      selectedStatus === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {getStatusIcon(status)}
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          {(searchQuery || selectedDoctor !== "All" || selectedStatus !== "All") && (
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              Found {filtered.length} patient{filtered.length !== 1 ? "s" : ""} matching your criteria
            </div>
          )}
        </div>

        {/* Patients Table */}
        <div className="bg-card border border-border rounded-xl overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Doctor</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Reg. Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Consent</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Last Report</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/user/${user.id}`)}
                    className="cursor-pointer hover:bg-accent/50 transition-colors border-b border-border last:border-b-0"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={user} onNavigate={() => navigate(`/user/${user.id}`)} />
                        <span className="text-sm font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.doctor}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(user.registrationDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.consentStatus)}
                        <span className={`text-sm font-medium ${user.consentStatus === "Granted" ? "text-success" : user.consentStatus === "Awaiting" ? "text-warning" : "text-destructive"}`}>
                          {user.consentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(user.lastReport).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-sm text-muted-foreground">
                    No patients found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} patients
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    p === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default PatientsPage;
