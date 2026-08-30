/* eslint-disable react/no-unescaped-entities */
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0a0a0a] text-neutral-400 min-h-screen antialiased selection:bg-primary/30 selection:text-white">
      <div className="container mx-auto px-4 py-16 md:py-24  space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-neutral-950 pt-10 ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs md:text-sm text-neutral-600 uppercase tracking-widest font-medium">
            Last Updated: May 16, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed font-normal tracking-wide text-justify">
          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              1. Information We Collect
            </h2>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              2. How We Use Your Data
            </h2>
            <p>
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or
              non-characteristic words etc. There are many variations of
              passages of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words.
            </p>
            <p>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything embarrassing hidden in the middle of
              text. All the Lorem Ipsum generators on the Internet tend to
              repeat predefined chunks as necessary, making this the first true
              generator.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              3. Data Security & Storage
            </h2>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
            <p>
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
              Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
              written in 45 BC. This book is a treatise on the theory of ethics,
              very popular during the Renaissance.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              5. Third-Party Disclosures
            </h2>
            <p>
              The generated Lorem Ipsum is therefore always free from
              repetition, injected humour, or non-characteristic words etc.
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
              6. Contact Information
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please feel
              free to reach out to us at our official channels or email our
              support desk directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
