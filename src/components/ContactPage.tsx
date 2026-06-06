import React, { useState } from "react";
import { Send, CheckCircle2, ShieldAlert, Sparkles, Building, Mail } from "lucide-react";

interface ContactPageProps {
  onBackToHub: () => void;
}

export default function ContactPage({ onBackToHub }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("All core fields (Name, Email, and Message) must be filled out prior to transmission.");
      return;
    }

    setIsSubmitting(true);

    // Simulate server ingestion
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-6 animate-fade-in">
      
      {/* Editorial Navigation Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-[#3C3A36]/40 pb-4">
        <button 
          onClick={onBackToHub}
          className="font-mono text-[10px] tracking-wider text-[#B85C38] hover:text-white uppercase font-bold"
        >
          &larr; Back to Platform Hub
        </button>
        <span className="font-mono text-[10px] text-[#8C8678]">&bull;</span>
        <span className="font-mono text-[10px] text-[#8C8678] uppercase">Submit Inquiry</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#B85C38]" />
          <span className="font-mono text-[9px] tracking-widest text-[#B85C38] uppercase font-bold">Information Ingestion desk</span>
        </div>
        <h2 className="font-serif italic text-4xl sm:text-5xl text-[#E8E1D2] font-light leading-tight">
          Pitch a product, propose an edit, or partner with us.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#8C8678] leading-relaxed max-w-xl">
          Are you an educational software developer, a student with a study-trick optimization proposal, or a professor concerned with academic integrity standards? Drop us a prompt.
        </p>
      </div>

      {/* Interactive Form Section */}
      {hasSubmitted ? (
        <div className="border border-[#B85C38] bg-[#1a1816]/80 p-8 text-center space-y-5 animate-scale-up">
          <div className="w-12 h-12 rounded-full bg-[#B85C38]/20 flex items-center justify-center mx-auto border border-[#B85C38]">
            <CheckCircle2 className="w-6 h-6 text-[#B85C38]" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-2xl text-[#E8E1D2] font-light">Transmission Received Successfully</h4>
            <p className="font-sans text-xs text-[#8C8678] leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-[#ECE9E2]">{formData.name}</strong>. Your academic inquiry has been logged as an active dispatch in our PrairieSignal queue. Sarah Jenkins and our editorial testing staff will inspect your pitch and follow up inside 48 business hours.
            </p>
          </div>
          <button
            onClick={() => {
              setFormData({ name: "", email: "", role: "Student", subject: "", message: "" });
              setHasSubmitted(false);
            }}
            className="px-5 py-2.5 bg-[#B85C38] hover:bg-[#ECE9E2] text-white hover:text-[#1F1D1A] font-mono text-[10px] tracking-wider uppercase border-0 rounded-none transition-all duration-150 font-bold"
          >
            Submit Another Dispensation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 border border-[#3C3A36] p-6 sm:p-8 bg-[#1a1816]/40">
          <div className="border-b border-[#3C3A36]/40 pb-4 mb-4">
            <h4 className="font-mono text-[11px] text-[#E8E1D2] uppercase tracking-wider font-bold">Transmission Dispatch Parameters</h4>
            <span className="font-sans text-[10px] text-[#8C8678]">All fields marked with an asterisk (*) must be fully declared prior to sending.</span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-300 font-sans text-xs rounded-none">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#E8E1D2] uppercase font-bold">Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Alex Carter"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#1F1D1A] border border-[#3C3A36] focus:border-[#B85C38] outline-none p-3 font-sans text-xs text-[#ECE9E2]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#E8E1D2] uppercase font-bold">Your Email *</label>
              <input
                type="email"
                placeholder="e.g. alex@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#1F1D1A] border border-[#3C3A36] focus:border-[#B85C38] outline-none p-3 font-sans text-xs text-[#ECE9E2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#E8E1D2] uppercase font-bold">Academic Persona</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#1F1D1A] border border-[#3C3A36] focus:border-[#B85C38] outline-none p-3 font-mono text-[10px] text-[#ECE9E2] uppercase"
              >
                <option value="Student">Undergrad / College Student</option>
                <option value="Graduate">Grad Student / Scholar</option>
                <option value="Educator">Educator / Professor</option>
                <option value="Developer">EdTech Software Developer</option>
                <option value="Other">External Partner</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#E8E1D2] uppercase font-bold">Subject Line</label>
              <input
                type="text"
                placeholder="e.g. Software review proposal"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#1F1D1A] border border-[#3C3A36] focus:border-[#B85C38] outline-none p-3 font-sans text-xs text-[#ECE9E2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-mono text-[#E8E1D2] uppercase font-bold">Your Message *</label>
            <textarea
              rows={5}
              placeholder="Please frame your message with as much technical context or product specifications as available. We respect depth."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#1F1D1A] border border-[#3C3A36] focus:border-[#B85C38] outline-none p-3 font-sans text-xs text-[#ECE9E2] leading-relaxed resize-none"
            />
          </div>

          <div className="pt-4 border-t border-[#3C3A36]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#8C8678]">
              <ShieldAlert className="w-4 h-4 text-[#B85C38]" />
              <span>We never sell details or lease your address data.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#B85C38] hover:bg-[#ECE9E2] disabled:bg-[#3C3A36] text-white hover:text-[#1F1D1A] disabled:text-[#8C8678] font-mono text-[10px] tracking-wider uppercase border-0 rounded-none transition-all duration-150 font-bold flex items-center gap-2"
            >
              <Send className="w-3 h-3" />
              {isSubmitting ? "Transmitting..." : "Send Message"}
            </button>
          </div>
        </form>
      )}

      {/* Manual details info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-[#3C3A36] p-5 flex items-start gap-4">
          <Mail className="w-5 h-5 text-[#B85C38] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-serif text-sm font-light text-[#E8E1D2]">Direct Ingestion Desk</h5>
            <span className="font-mono text-[11px] text-[#8C8678] block">editorial@studentai.org</span>
            <p className="font-sans text-[11px] text-[#8C8678] leading-relaxed">Skip the contact container and dump documents or attachments straight to our editorial mailbox.</p>
          </div>
        </div>

        <div className="border border-[#3C3A36] p-5 flex items-start gap-4">
          <Building className="w-5 h-5 text-[#B85C38] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-serif text-sm font-light text-[#E8E1D2]">PrairieSignal Field Lab</h5>
            <span className="font-mono text-[11px] text-[#8C8678] block">Block 4, Stanford Research Park</span>
            <p className="font-sans text-[11px] text-[#8C8678] leading-relaxed">Palo Alto Testing Hub, CA 94304. Visiting hours require confirmed schedules.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
