import { useState, useRef } from "react";
import { Send, Upload, CheckCircle2, FileText, Phone, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const reportCategories = [
  { label: "Lab Report", value: "lab" },
  { label: "Imaging / Scans", value: "imaging" },
  { label: "Prescription", value: "prescription" },
  { label: "Discharge Summary", value: "discharge" },
  { label: "Others", value: "others" },
];

const SendReportsPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reportType, setReportType] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const handleAddFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
    // Reset input so the same file can be selected again
    event.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!phoneNumber.trim()) {
      setFormError("Phone number is required");
      return;
    }

    if (!patientName.trim()) {
      setFormError("Patient name is required");
      return;
    }

    if (!reportType) {
      setFormError("Please select a report category");
      return;
    }

    if (reportType === "others" && !otherCategory.trim()) {
      setFormError("Please specify the report category");
      return;
    }

    if (files.length === 0) {
      setFormError("Please add at least one file");
      return;
    }

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setPhoneNumber("");
      setPatientName("");
      setReportType("");
      setOtherCategory("");
      setNotes("");
      setFiles([]);
    }, 3000);
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dashboard › Send Reports</p>
          <h1 className="text-2xl font-bold text-foreground">Send Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Share clinical reports with patients securely via phone number verification.</p>
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-8 w-full max-w-2xl space-y-6"
            >
              {/* Form Header */}
              <div className="border-b border-border pb-6">
                <h2 className="text-lg font-semibold text-foreground">Report Distribution Form</h2>
                <p className="text-xs text-muted-foreground mt-1">All fields marked with * are required</p>
              </div>

              {/* Error Message */}
              {formError && (
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{formError}</p>
                </div>
              )}

              {/* Patient Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Patient Information</h3>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Patient Name *</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient full name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., +91-9876543210"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Patient will receive the report link via SMS to this number</p>
                </div>
              </div>

              {/* Report Details Section */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground">Report Details</h3>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Report Category *</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    required
                  >
                    <option value="">Select report category</option>
                    {reportCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Other Category Input */}
                {reportType === "others" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      type="text"
                      value={otherCategory}
                      onChange={(e) => setOtherCategory(e.target.value)}
                      placeholder="Specify the report category"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">Please describe the type of report</p>
                  </motion.div>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Attached Files *</label>
                  <div className="space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{f.name}</span>
                          <span className="text-xs text-muted-foreground">({(f.size / 1024).toFixed(2)} KB)</span>
                        </div>
                        <button type="button" onClick={() => handleRemoveFile(i)} className="p-1.5 hover:bg-destructive/10 rounded transition-colors">
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ))}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    />
                    <button
                      type="button"
                      onClick={handleAddFile}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border text-sm font-medium text-muted-foreground hover:bg-secondary hover:border-primary/50 hover:text-foreground transition-all w-full justify-center"
                    >
                      <Upload className="w-4 h-4" /> Browse & Add Files
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Additional Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any special instructions or notes for the patient..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  />
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>Secure Transmission:</strong> All reports will be encrypted and securely transmitted to the patient. A link with verification code will be sent via SMS.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" /> Send Report Securely
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl p-12 w-full max-w-2xl text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground">Report Sent Successfully</h3>
              <p className="text-sm text-muted-foreground mt-2">The report has been securely shared with the patient at <span className="font-semibold text-foreground">{phoneNumber}</span>.</p>
              <p className="text-xs text-muted-foreground mt-4">Patient will receive the download link via SMS shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default SendReportsPage;
