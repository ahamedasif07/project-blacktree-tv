import React from 'react';

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Checkout</h1>
      <p className="text-sm md:text-lg text-zinc-400 leading-relaxed max-w-[400px] text-center mt-4 mx-auto font-medium">
        Complete your premium subscription checkout here.
      </p>
    </div>
  );
}
