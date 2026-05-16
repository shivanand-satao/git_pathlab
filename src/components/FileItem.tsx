import { FileRecord } from "@/data/mockFiles";
import { FileText, Image, FileSpreadsheet, Pill, Eye, Download, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

const fileTypeIcon = (type: FileRecord["fileType"]) => {
  switch (type) {
    case "PDF": return <FileText className="w-5 h-5 text-destructive" />;
    case "Image":
    case "DICOM": return <Image className="w-5 h-5 text-primary" />;
    case "Prescription": return <Pill className="w-5 h-5 text-success" />;
    default: return <FileSpreadsheet className="w-5 h-5 text-warning" />;
  }
};

const statusBadge = (status: FileRecord["status"]) => {
  const styles = {
    Final: "bg-success/10 text-success",
    Pending: "bg-warning/10 text-warning",
    Processing: "bg-primary/10 text-primary",
  };
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", styles[status])}>
      {status}
    </span>
  );
};

interface Props {
  file: FileRecord;
  onClick: () => void;
}

export const FileCardGrid = ({ file, onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={onClick}
      className="group relative bg-card border border-border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {fileTypeIcon(file.fileType)}
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{file.fileType}</span>
          </div>
          {statusBadge(file.status)}
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">{file.fileName}</h3>
        <p className="text-xs text-muted-foreground mb-3">{file.id} · {file.size}</p>

        <div className="flex items-center justify-between">
          <UserAvatar user={file.user} onNavigate={() => navigate(`/user/${file.user.id}`)} />
          <span className="text-xs text-muted-foreground">
            {new Date(file.uploadDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200" title="View">
            <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
          <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Download">
            <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
          <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 ml-auto" title="More">
            <MoreVertical className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FileRowList = ({ file, onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <tr
      onClick={onClick}
      className="group cursor-pointer hover:bg-primary/5 transition-all duration-300 border-b border-border hover:border-primary/30 last:border-b-0"
    >
      <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap group-hover:text-foreground transition-colors">
        {new Date(file.uploadDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
      </td>
      <td className="py-3 px-4">
        <UserAvatar user={file.user} onNavigate={() => navigate(`/user/${file.user.id}`)} />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          {fileTypeIcon(file.fileType)}
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{file.fileName}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell group-hover:text-foreground transition-colors">{file.doctor}</td>
      <td className="py-3 px-4 hidden sm:table-cell">{statusBadge(file.status)}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200" title="View" onClick={(e) => e.stopPropagation()}>
            <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
          <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Download" onClick={(e) => e.stopPropagation()}>
            <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
          <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200" title="More" onClick={(e) => e.stopPropagation()}>
            <MoreVertical className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>
        </div>
      </td>
    </tr>
  );
};
