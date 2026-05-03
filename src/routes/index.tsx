import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import type { FormEvent } from "react";

// Inline icons to avoid lucide-react dependency issues in this environment
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const RadioIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>
);
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const submitQuote = useMutation(api.quotes.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitQuote({
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
      });
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black selection:bg-brand-orange selection:text-brand-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-brand-black/10 bg-brand-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight uppercase">
              Watchdog Security
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm font-medium hover:text-brand-red transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-brand-red transition-colors">About Us</a>
            <a href="#contact" className="text-sm font-medium hover:text-brand-red transition-colors">Contact</a>
            <button className="rounded-[15px] bg-brand-red px-6 py-2.5 text-sm font-bold text-brand-cream hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20 active:scale-95">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32 md:pt-40 md:pb-52">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-brand-black md:text-8xl uppercase">
            Locals Protecting <br />
            <span className="text-brand-red">Locals</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-brand-black/70 md:text-2xl">
            Your trusted partners in security for over 15 years.
            Dedicated protection for the Southern Tablelands.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="w-full rounded-[15px] bg-brand-red px-10 py-5 text-lg font-bold text-brand-cream hover:bg-brand-red/90 transition-all shadow-xl shadow-brand-red/20 active:scale-95 sm:w-auto">
              Book Now
            </button>
            <button className="w-full rounded-[15px] border-2 border-brand-black px-10 py-5 text-lg font-bold hover:bg-brand-black hover:text-brand-cream transition-all active:scale-95 sm:w-auto">
              Our Services
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full border-[40px] border-brand-orange/5" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full border-[60px] border-brand-red/5" />
      </section>

      {/* Legacy/About Section */}
      <section id="about" className="bg-brand-black py-24 text-brand-cream">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-8 text-4xl font-bold uppercase tracking-tight md:text-5xl leading-tight">
                Cornerstone of the <br />
                <span className="text-brand-orange tracking-widest">Goulburn Region</span>
              </h2>
              <p className="text-xl leading-relaxed text-brand-cream/80">
                As a cornerstone of the Goulburn community, Watchdog Security combines local knowledge with elite protection. We aren&apos;t just a security company; we&apos;re your neighbors, dedicated to keeping our town safe 24/7.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[15px] bg-brand-orange/10 p-8 border border-brand-orange/20">
                <p className="mb-2 text-5xl font-black text-brand-orange">15+</p>
                <p className="text-sm font-bold uppercase tracking-wider text-brand-orange/60">Years of Service</p>
              </div>
              <div className="rounded-[15px] bg-brand-red/10 p-8 border border-brand-red/20">
                <p className="mb-2 text-5xl font-black text-brand-red">24/7</p>
                <p className="text-sm font-bold uppercase tracking-wider text-brand-red/60">Local Protection</p>
              </div>
              <div className="col-span-2 rounded-[15px] bg-brand-cream/5 p-8 border border-brand-cream/10">
                <div className="flex items-center gap-4">
                  <span className="text-brand-orange"><MapPinIcon /></span>
                  <div>
                    <p className="text-lg font-bold">Southern Tablelands</p>
                    <p className="text-sm text-brand-cream/60">Goulburn, Marulan, Crookwell, Tarago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tight md:text-5xl">Our Elite Services</h2>
            <div className="mx-auto h-1.5 w-24 bg-brand-orange rounded-full" />
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Monitoring",
                icon: RadioIcon,
                desc: "State-of-the-art surveillance and rapid response systems monitored around the clock."
              },
              {
                title: "Patrols",
                icon: CarIcon,
                desc: "Visible, local patrol units providing a constant presence and deterrent in your neighborhood."
              },
              {
                title: "Alarms",
                icon: LockIcon,
                desc: "Custom alarm installations designed specifically for the unique needs of local homes and businesses."
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group rounded-[15px] border-2 border-brand-black/5 bg-brand-cream p-10 hover:border-brand-orange transition-all hover:shadow-2xl hover:shadow-brand-orange/5"
              >
                <span className="mb-6 block text-brand-orange group-hover:scale-110 transition-transform"><service.icon /></span>
                <h3 className="mb-4 text-2xl font-bold uppercase">{service.title}</h3>
                <p className="text-brand-black/60 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-brand-cream border-t border-brand-black/5 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="mb-10 text-sm font-black uppercase tracking-[0.2em] text-brand-black/40">Serving the Communities of</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xl font-bold uppercase tracking-tight md:text-2xl opacity-60">
            <span>Goulburn</span>
            <span>Marulan</span>
            <span>Crookwell</span>
            <span>Tarago</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[30px] bg-brand-black p-8 md:p-20 text-brand-cream overflow-hidden relative">
            <div className="relative z-10 grid gap-16 md:grid-cols-2">
              <div>
                <h2 className="mb-8 text-4xl font-bold uppercase md:text-5xl leading-tight">Ready to <br /><span className="text-brand-red">Secure</span> Your Space?</h2>
                <p className="mb-12 text-xl text-brand-cream/70 leading-relaxed max-w-md">
                  Contact Goulburn&apos;s most trusted security team today for a confidential consultation.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="rounded-full bg-brand-red p-4 group-hover:scale-110 transition-transform">
                      <span className="text-brand-cream"><PhoneIcon /></span>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-brand-cream/40">Call Us</p>
                      <p className="text-2xl font-bold">(02) 4816 1943</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="rounded-full bg-brand-orange p-4 group-hover:scale-110 transition-transform">
                      <span className="text-brand-cream"><MapPinIcon /></span>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-brand-cream/40">Visit Us</p>
                      <p className="text-xl font-bold leading-tight">Unit 3, 378 Auburn St, <br />Goulburn NSW 2580</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[15px] bg-brand-cream p-8 text-brand-black">
                {isSubmitted ? (
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                    <span className="mb-4 text-brand-orange"><CheckIcon /></span>
                    <h3 className="mb-2 text-2xl font-bold uppercase">Request Received</h3>
                    <p className="text-brand-black/60">
                      Thank you for trusting Watchdog Security. <br />
                      A local representative will be in touch shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 font-bold uppercase tracking-widest text-brand-red hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase tracking-widest text-brand-black/40">Full Name</label>
                      <input name="name" required type="text" className="w-full rounded-[10px] border border-brand-black/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-red transition-colors" placeholder="John Citizen" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase tracking-widest text-brand-black/40">Phone Number</label>
                      <input name="phone" required type="tel" className="w-full rounded-[10px] border border-brand-black/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-red transition-colors" placeholder="(02) 4816 1943" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase tracking-widest text-brand-black/40">Message</label>
                      <textarea name="message" required className="h-32 w-full rounded-[10px] border border-brand-black/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-red transition-colors resize-none" placeholder="How can we help?"></textarea>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full rounded-[15px] bg-brand-red py-4 text-lg font-bold text-brand-cream hover:bg-brand-red/90 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Request Quote"}
                    </button>
                  </form>
                )}
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 h-full w-1/3 bg-brand-red/5 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-black/5 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <span className="font-bold tracking-tight uppercase">Watchdog Security</span>
          </div>
          <p className="text-sm text-brand-black/40 font-medium">
            © {new Date().getFullYear()} Watchdog Security. All rights reserved. Master License #409054700.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors">Privacy</a>
            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
