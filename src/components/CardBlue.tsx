import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Phone, Mail, User, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

export default function CardBlue() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', query: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node definition for constellation effect
    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const points: Point[] = [];
    const pointCount = Math.min(45, Math.floor((width * height) / 12000));

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)'; // Tailwind sky-500 with low opacity
      ctx.lineWidth = 0.8;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (dist < 130) {
            // Fade line based on distance
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.25 * (1 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw points
      ctx.fillStyle = 'rgba(56, 189, 248, 0.6)'; // Tailwind sky-400
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move points
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset state after transition finishes
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', query: '' });
    }, 300);
  };

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-18 pb-12 mt-6 mb-0 px-10 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Container with premium backdrop shadow glow */}
      <div className="w-full max-w-6xl relative group">
        
        {/* Soft cyan glow behind the banner */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-10 blur-xl transition duration-1000 group-hover:opacity-25"></div>
        
        {/* Main Banner Block */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#003da5] via-[#0051cf] to-[#003087] border border-blue-500/20 shadow-xl">
          
          {/* Canvas animation layer */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
          />

          {/* Abstract vector shape accents */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Content Layout */}
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-14 md:px-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
            
            {/* Text Copy Section */}
            <div className="flex-1 space-y-3 sm:space-y-4 text-left">
              <span className="text-sm sm:text-base font-semibold text-cyan-300 tracking-wider uppercase drop-shadow-sm">
                Got more questions?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-white tracking-tight leading-none">
                Talk to our team directly.
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg max-w-xl font-medium antialiased">
                Our Academic Counsellor will get in touch with you shortly.
              </p>
            </div>

            {/* Action CTA Button */}
            <div className="flex-shrink-0 self-start md:self-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group/btn relative overflow-hidden flex items-center gap-3 bg-[#FF9400] hover:bg-[#FF8400] active:scale-95 text-white font-bold tracking-wider uppercase px-6 py-4 rounded-xl shadow-[0_4px_20px_rgba(255,148,0,0.35)] hover:shadow-[0_6px_24px_rgba(255,148,0,0.5)] transition-all duration-300"
              >
                {/* Micro-sparkle shine effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:animate-shine"></div>
                
                {/* SVG Telegram / Send icon matching design */}
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
                  <Send size={18} className="fill-current stroke-[1.5]" />
                </span>
                
                <span className="text-sm sm:text-base tracking-widest font-extrabold">
                  Contact Us
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={handleClose}
          />
          
          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 transform transition-all duration-300 scale-100">
            
            {/* Header decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9400] via-orange-500 to-yellow-400" />
            
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all duration-200"
            >
              <X size={20} />
            </button>

            {/* Inner Content */}
            <div className="p-6 sm:p-8">
              {!formSubmitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Connect with a Counselor</h3>
                    <p className="text-slate-400 text-sm">
                      Fill out the form below and a representative will reach out to schedule a live call.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                          <User size={18} />
                        </span>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="Jane Doe"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-[#FF9400] text-white pl-11 pr-4 py-3 rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF9400]/20"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                          <Mail size={18} />
                        </span>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          placeholder="jane@example.com"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-[#FF9400] text-white pl-11 pr-4 py-3 rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF9400]/20"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                          <Phone size={18} />
                        </span>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-[#FF9400] text-white pl-11 pr-4 py-3 rounded-xl outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF9400]/20"
                        />
                      </div>
                    </div>

                    {/* Quick Question / Query */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        What's your primary question? (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-slate-500">
                          <MessageSquare size={18} />
                        </span>
                        <textarea 
                          rows={3}
                          value={formData.query}
                          onChange={e => setFormData({...formData, query: e.target.value})}
                          placeholder="E.g., Which course fits my schedule best?"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-[#FF9400] text-white pl-11 pr-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-[#FF9400]/20"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#FF9400] hover:bg-[#FF8400] disabled:bg-slate-800 text-white font-bold uppercase tracking-wider text-sm py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-98 mt-2"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Request Received!</h3>
                  <p className="text-slate-400 max-w-sm mx-auto">
                    Thank you <span className="text-white font-semibold">{formData.name}</span>. An Academic Counselor has been notified and will call you at <span className="text-white font-semibold">{formData.phone}</span> shortly.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}