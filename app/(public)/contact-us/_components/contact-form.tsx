"use client"; // <--- Add this line right at the very top

import { Button } from "@/components/ui/button";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define strict data types for the form fields
interface ContactFormData {
  fullName: string;
  email: string;
  subject: "Technical Support" | "General Inquiry" | "Billing";
  message: string;
}

export default function ContactForm() {
  // Initialize react-hook-form with the ContactFormData interface
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "Technical Support",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="min-h-screen bg-black mt-10 text-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Header Section */}
      <div className="text-center max-w-xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Whether you have questions about our premium cinematic catalog or need
          technical support, our dedicated team is here to assist you 24/7.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xl bg-[#121212] border border-zinc-800 rounded-lg p-8 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("fullName", { required: "Name is required" })}
              className="w-full bg-[#2a2a2a] border border-transparent focus:border-zinc-700 text-zinc-200 placeholder-zinc-500 rounded px-4 py-3 outline-none transition text-sm"
            />
            {errors.fullName && (
              <p className="text-primary text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-[#2a2a2a] border border-transparent focus:border-zinc-700 text-zinc-200 placeholder-zinc-500 rounded px-4 py-3 outline-none transition text-sm"
            />
            {errors.email && (
              <p className="text-primary text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Subject
            </label>
            <div className="relative">
              <select
                {...register("subject")}
                className="w-full bg-[#2a2a2a] border border-transparent focus:border-zinc-700 text-zinc-200 rounded px-4 py-3 outline-none transition text-sm appearance-none cursor-pointer"
              >
                <option value="Technical Support">Technical Support</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Billing">Billing / Account</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              {...register("message", { required: "Message cannot be empty" })}
              className="w-full bg-[#2a2a2a] border border-transparent focus:border-zinc-700 text-zinc-200 placeholder-zinc-500 rounded px-4 py-3 outline-none transition text-sm resize-none"
            />
            {errors.message && (
              <p className="text-primary text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-[#b20710] text-white font-semibold py-5.5 rounded transition duration-200 text-base shadow-md active:scale-[0.99]"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
