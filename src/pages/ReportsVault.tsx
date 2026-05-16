import { useState, useMemo } from "react";
import { Search, Grid3X3, List, Calendar, Filter, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { FileCardGrid, FileRowList } from "@/components/FileItem";
import { mockFiles, FileRecord } from "@/data/mockFiles";

type ViewMode = "grid" | "list";
type SortOrder = "latest" | "oldest";
type CategoryFilter = "all" | "consent" | "non-consent";

const ReportsVault = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [dateFilter, setDateFilter] = useState("30");
  const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null);

  const filtered = useMemo(() => {
    let files = [...mockFiles];

    if (search) {
      const q = search.toLowerCase();
      files = files.filter(
        (f) => f.fileName.toLowerCase().includes(q) || f.user.name.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      files = files.filter((f) => f.category === categoryFilter);
    }

    files.sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        : new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
    );

    return files;
  }, [search, sortOrder, categoryFilter]);

  const stats = {
    total: mockFiles.length,
    consent: mockFiles.filter((f) => f.category === "consent").length,
    nonConsent: mockFiles.filter((f) => f.category === "non-consent").length,
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dashboard › Reports Vault</p>
            <h1 className="text-2xl font-bold text-foreground">Reports Vault</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage all internal clinical reports and external shared health records.</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity self-start">
            <SlidersHorizontal className="w-4 h-4" />
            Request Access
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Reports", value: stats.total, sub: "All uploaded files" },
            { label: "Consent Files", value: stats.consent, sub: "Patient approved" },
            { label: "Non-Consent Files", value: stats.nonConsent, sub: "Internal records" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by file name or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option value="all">All Files</option>
              <option value="consent">Consent Files</option>
              <option value="non-consent">Non-Consent</option>
            </select>

            {/* Date filter */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent focus:outline-none text-sm"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* View toggle */}
            <div className="flex items-center bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-card shadow-sm" : "hover:bg-card/50"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-card shadow-sm" : "hover:bg-card/50"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File display */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((file) => (
                <FileCardGrid
                  key={file.id}
                  file={file}
                  onClick={() => setSelectedFile(file)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-xl overflow-x-auto"
            >
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Patient</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Report Type</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Doctor</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((file) => (
                    <FileRowList
                      key={file.id}
                      file={file}
                      onClick={() => setSelectedFile(file)}
                    />
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No files match your filters.</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {mockFiles.length} reports
        </p>

        {/* File Preview Modal */}
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelectedFile(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">{selectedFile.fileName}</h2>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">ID:</span> <span className="text-foreground">{selectedFile.id}</span></p>
                <p><span className="text-muted-foreground">Type:</span> <span className="text-foreground">{selectedFile.fileType}</span></p>
                <p><span className="text-muted-foreground">Size:</span> <span className="text-foreground">{selectedFile.size}</span></p>
                <p><span className="text-muted-foreground">Doctor:</span> <span className="text-foreground">{selectedFile.doctor}</span></p>
                <p><span className="text-muted-foreground">Patient:</span> <span className="text-foreground">{selectedFile.user.name}</span></p>
                <p><span className="text-muted-foreground">Uploaded:</span> <span className="text-foreground">{new Date(selectedFile.uploadDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
              </div>
              <button onClick={() => setSelectedFile(null)} className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ReportsVault;
