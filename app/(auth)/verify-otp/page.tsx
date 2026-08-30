import { Suspense } from "react";
import { VerifyOtpForm } from "../_components/verify-otp-form";

const VerifyOtpPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center py-10 text-zinc-400">
          Loading verification details...
        </div>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
};

export default VerifyOtpPage;