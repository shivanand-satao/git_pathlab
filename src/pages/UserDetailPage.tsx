import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck, FileText, Calendar, Download } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { mockFiles } from "@/data/mockFiles";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userFiles = mockFiles.filter((f) => f.user.id === id);
  const user = userFiles[0]?.user;

  const handleDownload = (fileName: string) => {
    // Create a mock download by creating a blob and triggering download
    const element = document.createElement("a");
    const file = new Blob(["Mock file content for: " + fileName], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };


  if (!user) {
    return (
      <AppLayout>
        <div className="p-4 lg:p-6 animate-fade-in">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <p className="text-muted-foreground">User not found.</p>
        </div>
      </AppLayout>
    );
  }

  const consentColors = { Granted: "text-success bg-success/10", Awaiting: "text-warning bg-warning/10", Expired: "text-destructive bg-destructive/10" };
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Profile header */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {user.email}</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> ID: {user.id}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${consentColors[user.consentStatus]}`}>
            Consent: {user.consentStatus}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold text-foreground mt-1">{userFiles.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Consent Files</p>
            <p className="text-2xl font-bold text-foreground mt-1">{userFiles.filter((f) => f.category === "consent").length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Latest Report</p>
            <p className="text-sm font-medium text-foreground mt-1">
              {new Date(userFiles[0]?.uploadDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Files table */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Associated Reports</h2>
          <div className="bg-card border border-border rounded-xl overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Report</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {userFiles.map((file) => {
                  const statusStyles = { Final: "text-success", Pending: "text-warning", Processing: "text-primary" };
                  return (
                    <tr key={file.id} className="border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{file.fileName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{file.fileType}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(file.uploadDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className={`py-3 px-4 text-sm font-medium ${statusStyles[file.status]}`}>{file.status}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDownload(file.fileName)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserDetailPage;
