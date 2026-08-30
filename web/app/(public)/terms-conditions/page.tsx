/* eslint-disable react/no-unescaped-entities */
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-[#0a0a0a] text-neutral-400 min-h-screen antialiased selection:bg-primary/30 selection:text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-neutral-950 pb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Terms and Conditions
          </h1>
          <p className="text-xs md:text-sm text-neutral-600 uppercase tracking-widest font-medium">
            Last Updated: May 16, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed font-normal tracking-wide text-justify">
          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. By accessing and using this platform, you
              agree to be bound by these Terms and Conditions. If you do not
              agree with any part of these terms, you must not use our streaming
              services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              2. Account Registration & Security
            </h2>
            <p>
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. Users are responsible for maintaining the
              confidentiality of their account credentials, including passwords
              and access tokens. Any unauthorized activities under your account
              must be reported to our system administrators immediately.
            </p>
            <p>
              The generated Lorem Ipsum is therefore always free from
              repetition, injected humour, or non-characteristic words etc. We
              reserve the right to terminate accounts that violate our community
              layout standards or malicious streaming behaviors.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              3. Subscription Billing & Cancellations
            </h2>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Subscription fees for our premium
              packages are billed on a recurring monthly basis. You can cancel
              your subscription anytime through your checkout dashboard with a
              single click.
            </p>
            <p>
              No refunds will be provided for partial months or unused streaming
              credits unless explicitly stated under specific local
              jurisdictions. All transactional gateways are securely powered by
              industry-standard payment processors.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              4. Intellectual Property Rights
            </h2>
            <p>
              All cinematic contents, software modules, interface elements,
              logos, and digital streaming assets displayed on this platform are
              protected under global copyright protection regulations. You are
              granted a limited, non-exclusive, non-transferable license to
              access the content for personal, non-commercial entertainment
              purposes only.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              5. Limitation of Liability
            </h2>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. In no event shall the platform, its
              developers, or network providers be liable for any direct,
              indirect, or incidental performance latency arising from server
              outages.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              6. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              standard streaming compliance laws, without regard to its conflict
              of law provisions. Any legal actions or disputes must be resolved
              in authorized municipal courts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
