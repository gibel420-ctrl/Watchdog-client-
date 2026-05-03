import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import type { FormEvent } from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Lock,
  Radio,
  Car,
  CheckCircle2
} from "lucide-react";

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
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-brand-red" />
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

        {/* Decorative elements (No stock media) */}
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
                  <MapPin className="h-8 w-8 text-brand-orange" />
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
                icon: Radio,
                desc: "State-of-the-art surveillance and rapid response systems monitored around the clock."
              },
              {
                title: "Patrols",
                icon: Car,
                desc: "Visible, local patrol units providing a constant presence and deterrent in your neighborhood."
              },
              {
                title: "Alarms",
                icon: Lock,
                desc: "Custom alarm installations designed specifically for the unique needs of local homes and businesses."
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group rounded-[15px] border-2 border-brand-black/5 bg-brand-cream p-10 hover:border-brand-orange transition-all hover:shadow-2xl hover:shadow-brand-orange/5"
              >
                <service.icon className="mb-6 h-12 w-12 text-brand-orange group-hover:scale-110 transition-transform" />
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
                      <Phone className="h-6 w-6 text-brand-cream" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-brand-cream/40">Call Us</p>
                      <p className="text-2xl font-bold">(02) 4816 1943</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="rounded-full bg-brand-orange p-4 group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-brand-cream" />
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
                    <CheckCircle2 className="mb-4 h-16 w-16 text-brand-orange" />
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
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-brand-red" />
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
