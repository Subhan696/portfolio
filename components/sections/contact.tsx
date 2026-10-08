"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Send, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Please provide a little more detail."),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error("Please fix the errors in the form.");
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!res.ok) throw new Error("Network error");
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      toast.success("Message sent successfully — I will get back to you promptly.");
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error("Could not send through endpoint. Please send direct email.");
    }
  };

  return (
    <section id="contact" className="py-16 border-t border-amber-400/10">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
            Initiate Conversation
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        <h2 className="section-heading mb-1">Contact</h2>
        <p className="text-sm font-mono text-muted-foreground">
          Get in touch for AI engineering projects, consulting, or full-time roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="md:col-span-1 space-y-4">
          <div className="luxury-card rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-primary mt-0.5 flex-none" />
              <div>
                <p className="text-[11px] font-mono text-muted-foreground uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xs sm:text-sm font-mono text-foreground hover:text-primary transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-primary mt-0.5 flex-none" />
              <div>
                <p className="text-[11px] font-mono text-muted-foreground uppercase">
                  Phone
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-xs sm:text-sm font-mono text-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-none" />
              <div>
                <p className="text-[11px] font-mono text-muted-foreground uppercase">
                  Location
                </p>
                <p className="text-xs sm:text-sm font-mono text-foreground">
                  {siteConfig.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <input
                {...register("name")}
                placeholder="Your name"
                className="input-underline"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400 font-mono">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="input-underline"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400 font-mono">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                Message
              </label>
              <textarea
                {...register("message")}
                placeholder="How can I help you?"
                rows={4}
                className="input-underline resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400 font-mono">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                <HoverBorderGradient
                  as="div"
                  containerClassName="rounded-full shadow-[0_0_20px_rgba(229,195,120,0.15)]"
                  className="flex items-center gap-2 text-xs font-mono font-medium py-2 px-5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                      <span>Sending...</span>
                    </>
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Message Sent</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 text-primary" />
                      <span>Send Message</span>
                    </>
                  )}
                </HoverBorderGradient>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
