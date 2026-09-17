"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Add a little more detail."),
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
      toast.success("Message sent — I'll get back to you soon.");
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error("Something went wrong. Try email instead.");
    }
  };

  return (
    <section id="contact" className="py-12">
      <div className="hairline mb-8" />
      <h2 className="section-heading">Contact</h2>
      <p className="text-sm text-muted-foreground mb-8">Get in touch</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <input
            {...register("name")}
            placeholder="Your name"
            className="input-underline"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="input-underline"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            {...register("message")}
            placeholder="How can I help you?"
            rows={5}
            className="input-underline resize-none"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Or email me at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Sending...
              </>
            ) : sent ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Sent
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Send
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
