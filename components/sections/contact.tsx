"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";
import { useEmail } from "@/lib/use-email";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "What's this about?"),
  message: z.string().min(10, "Add a little more detail."),
});

type FormData = z.infer<typeof schema>;

const socials = [
  { Icon: Github, href: siteConfig.github, label: "GitHub" },
  { Icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { compose } = useEmail();
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
        await new Promise((r) => setTimeout(r, 900));
      }
      toast.success("Message sent — I'll get back to you soon.");
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error("Something went wrong. Try email instead.");
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={
        <>
          Let's build <span className="gradient-text">something</span> together
        </>
      }
      description="Open to freelance, full-time, and research collaborations. Drop a message or reach out directly."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-4"
        >
          <ContactCard
            icon={Mail}
            label="Email"
            value={siteConfig.email}
            onClick={() => compose()}
            hint="Open in Gmail"
          />
          <ContactCard
            icon={MapPin}
            label="Location"
            value={siteConfig.location}
          />
          <div className="rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-widest text-ivory/45">
              Social
            </p>
            <div className="mt-3 flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ivory/10 bg-ivory/[0.03] text-ivory/70 hover:text-ivory hover:border-wine-600/40 hover:bg-wine-600/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-ivory/[0.08] bg-gradient-to-br from-wine-600/10 via-transparent to-wine-300/10 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-widest text-wine-600">
              Quick response
            </p>
            <p className="mt-2 text-sm text-ivory/75">
              I usually reply within 24 hours. For urgent work, mention "URGENT"
              in the subject.
            </p>
          </div>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <Input placeholder="Your name" {...register("name")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input
                placeholder="you@email.com"
                type="email"
                {...register("email")}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Subject" error={errors.subject?.message}>
              <Input
                placeholder="What's this about?"
                {...register("subject")}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Message" error={errors.message?.message}>
              <Textarea
                placeholder="Tell me about your project or idea..."
                rows={6}
                {...register("message")}
              />
            </Field>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-ivory/45">
              Or email me at{" "}
              <button
                type="button"
                onClick={() => compose()}
                className="text-wine-300 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-wine-400 rounded"
              >
                {siteConfig.email}
              </button>
            </p>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  onClick,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onClick?: () => void;
  hint?: string;
}) {
  const inner = (
    <div className="group flex items-center gap-4 rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-4 backdrop-blur-xl transition-all hover:border-wine-600/30 text-left w-full">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-wine-300 to-wine-600 text-ivory">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-widest text-ivory/45">{label}</p>
        <p className="truncate text-sm text-ivory/85">{value}</p>
      </div>
      {hint && (
        <span className="hidden sm:inline-block flex-none text-[10px] uppercase tracking-widest text-ivory/35 group-hover:text-wine-300 transition-colors">
          {hint}
        </span>
      )}
    </div>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className="w-full">
      {inner}
    </button>
  ) : (
    inner
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-ivory/55">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      )}
    </label>
  );
}
