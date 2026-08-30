import { Suspense } from "react";
import { ResetPasswordForm } from "../_components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center py-10 text-zinc-400">
          Loading verification details...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
