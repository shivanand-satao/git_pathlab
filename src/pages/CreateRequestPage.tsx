import { useState } from "react";
import { Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const reportTypes = [
  { label: "Blood Test Report", value: "blood-test" },
  { label: "MRI / CT Scan", value: "imaging" },
  { label: "Prescription Access", value: "prescription" },
  { label: "Discharge Summary", value: "discharge" },
  { label: "Others", value: "others" },
];

const recentRequests = [
  { patient: "Sunita Sharma", phone: "+91-9876543210", type: "Lab Report", status: "Approved", date: "2024-04-12" },
  { patient: "Vikram Malhotra", phone: "+91-9876543211", type: "DICOM", status: "Pending", date: "2024-04-11" },
  { patient: "Ananya Iyer", phone: "+91-9876543212", type: "Prescription", status: "Expired", date: "2024-04-09" },
];

const CreateRequestPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [otherReportType, setOtherReportType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

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

    if (!selectedTemplate) {
      setFormError("Please select a report type");
      return;
    }

    if (selectedTemplate === "others" && !otherReportType.trim()) {
      setFormError("Please specify the report type");
      return;
    }

    if (!purpose.trim()) {
      setFormError("Purpose of request is required");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPhoneNumber("");
      setPatientName("");
      setPurpose("");
      setSelectedTemplate("");
      setOtherReportType("");
    }, 3000);
  };

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dashboard › Create Request</p>
          <h1 className="text-2xl font-bold text-foreground">Initiate Consent Request</h1>
          <p className="text-sm text-muted-foreground mt-1">Request secure access to patient health records via OTP consent.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-xl p-6 space-y-6"
                >
                  {/* Form Title */}
                  <div className="border-b border-border pb-4">
                    <h2 className="text-lg font-semibold text-foreground">Patient Information</h2>
                    <p className="text-xs text-muted-foreground mt-1">Enter the patient details for consent request</p>
                  </div>

                  {/* Error Message */}
                  {formError && (
                    <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <p className="text-sm text-destructive">{formError}</p>
                    </div>
                  )}

                  {/* Patient Name */}
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Patient Name *</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Phone Number *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">📱</span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g., +91-9876543210"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">OTP will be sent to this number</p>
                  </div>

                  {/* Report Type Section */}
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Report Type *</label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                      required
                    >
                      <option value="">Select report type</option>
                      {reportTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Other Report Type Input */}
                  {selectedTemplate === "others" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <input
                        type="text"
                        value={otherReportType}
                        onChange={(e) => setOtherReportType(e.target.value)}
                        placeholder="Specify the report type"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                      />
                      <p className="text-xs text-muted-foreground mt-1.5">Please describe the type of report needed</p>
                    </motion.div>
                  )}

                  {/* Purpose Section */}
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Purpose of Request *</label>
                    <p className="text-xs text-muted-foreground mb-2">Describe the clinical reason for accessing records</p>
                    <textarea
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="E.g., Required for consultation, follow-up diagnosis, specialist opinion, etc."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                      required
                    />
                  </div>

                  {/* Submission Info */}
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-2">
                      <strong>Note:</strong> An OTP will be sent to the patient's registered phone number. They must verify it to grant access to their health records.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" /> Send Consent Request via OTP
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-xl p-12 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground">Request Sent Successfully</h3>
                  <p className="text-sm text-muted-foreground mt-2">OTP has been sent to <span className="font-semibold text-foreground">{phoneNumber}</span> for consent verification.</p>
                  <p className="text-xs text-muted-foreground mt-4">Patient has 24 hours to verify the request.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - recent */}
          <div className="bg-card border border-border rounded-xl p-5 h-fit">
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Requests</h3>
            <div className="space-y-3">
              {recentRequests.map((r, i) => {
                const statusColor = r.status === "Approved" ? "text-success" : r.status === "Pending" ? "text-warning" : "text-destructive";
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{r.patient}</p>
                      <p className="text-xs text-muted-foreground">{r.phone}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.type} · {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</p>
                      <p className={`text-xs font-medium mt-1 ${statusColor}`}>{r.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateRequestPage;
