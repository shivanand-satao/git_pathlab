import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loginSuccessAnim from "@/assets/login-success.json";
import { Microscope, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";

type Step = "id" | "otp" | "success";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("id");
  const [pathlabId, setPathlabId] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pathlabId.trim()) {
      setError("Please enter your PathLab ID");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setError("");
    setStep("success");
    setTimeout(() => navigate("/overview"), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(207_90%_64%/0.4),transparent_60%)]" />
        <div className="relative z-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto">
            <Microscope className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground">PathLab Hub</h1>
          <p className="text-primary-foreground/80 text-lg max-w-sm mx-auto">
            Secure Dashboard for managing patient reports, consents, and clinical data.
          </p>
          <div className="flex items-center gap-3 justify-center text-primary-foreground/60 text-sm">
            <span>🔒 End-to-end Encrypted</span>
            <span>·</span>
            <span>ABHA Compliant</span>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Microscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">PathLab Hub</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "id" && (
              <motion.div
                key="id"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-1">PathLab Sign In</h2>
                <p className="text-sm text-muted-foreground mb-8">Enter your PathLab ID to receive an OTP</p>

                <form onSubmit={handleIdSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">PathLab ID</label>
                    <div className="relative">
                      <Microscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={pathlabId}
                        onChange={(e) => setPathlabId(e.target.value)}
                        placeholder="e.g., PL-MH-12345"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
                        autoFocus
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Send OTP <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-xs text-muted-foreground mt-6 text-center">
                  Only registered pathlabs can access this portal.
                </p>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-1">OTP Verification</h2>
                <p className="text-sm text-muted-foreground mb-1">
                  Enter the 6-digit code sent to the registered contact for
                </p>
                <p className="text-sm font-semibold text-primary mb-8">{pathlabId}</p>

                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <div className="flex items-center justify-center gap-2">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/, ""))}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-lg font-bold rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>

                  {error && <p className="text-sm text-destructive text-center">{error}</p>}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <KeyRound className="w-4 h-4" /> Verify & Login
                  </button>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <button type="button" onClick={() => setStep("id")} className="hover:text-foreground transition-colors">
                      ← Change PathLab ID
                    </button>
                    <button type="button" className="hover:text-foreground transition-colors">
                      Resend OTP
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Lottie animationData={loginSuccessAnim} loop={false} style={{ width: 120, height: 120, margin: "0 auto" }} />
                <h2 className="text-xl font-bold text-foreground mt-4">Login Successful</h2>
                <p className="text-sm text-muted-foreground mt-1">Redirecting to dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;
