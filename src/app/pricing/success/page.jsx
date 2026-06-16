import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { CircleCheck, ArrowRight, Envelope, ShieldCheck, Copy } from '@gravity-ui/icons';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // Retrieve extended details from Stripe Session Object
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, customer_details, amount_total, currency, id } = session;
  const customerEmail = customer_details?.email;
  const planName = session.line_items?.data[0]?.description || "Premium Plan Access";

  // Format total amount natively
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'usd',
  }).format((amount_total || 0) / 100);

  if (status === 'open') {
    return redirect('/');
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-8 selection:bg-purple-500/30">
      <div className="max-w-xl w-full bg-[#121212] border border-neutral-850 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
        
        {/* Subtle background ambient glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* 1. Big Animated Central Success Mark Header */}
        <header className="flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/5 animate-pulse">
            <CircleCheck style={{ width: '36px', height: '36px' }} />
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full">
              Payment Authenticated
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-100">
              Thank you for your order!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Your tracking parameters have updated. Access credentials have been provisioned to your profile.
            </p>
          </div>
        </header>

        {/* 2. Transaction Parameters Receipt Grid Layout */}
        <section className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
          <h2 className="text-xs font-bold text-neutral-400 tracking-wider uppercase border-b border-neutral-900 pb-3">
            Transaction Details
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500">Tier Activated</span>
              <span className="font-semibold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-lg">
                {planName}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500">Amount Charged</span>
              <span className="font-bold text-neutral-200">{formattedAmount}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500">Customer Target</span>
              <span className="text-neutral-300 font-medium truncate max-w-[200px] sm:max-w-[260px]">
                {customerEmail}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pt-1.5 border-t border-neutral-900">
              <span className="text-neutral-500">Reference ID</span>
              <span className="text-[11px] text-neutral-400 font-mono tracking-tight bg-neutral-900 px-2 py-1 rounded border border-neutral-800 flex items-center gap-1.5 max-w-[180px] sm:max-w-[240px] truncate">
                {id.substring(0, 16)}...
              </span>
            </div>
          </div>
        </section>

        {/* 3. Communication Channel Warning Alerts Notification Info Banner */}
        <div className="bg-[#1A1A1A] border border-neutral-800/60 p-4 rounded-xl flex items-start gap-3">
          <Envelope className="text-neutral-500 w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            A confirmation receipt will be delivered shortly to <strong className="text-neutral-200">{customerEmail}</strong>. If processing takes longer than expected, contact our helpdesk at <a href="mailto:orders@example.com" className="text-purple-400 underline hover:text-purple-300 transition-colors">orders@example.com</a>.
          </p>
        </div>

        {/* 4. Navigation Actions Controllers Block */}
        <footer className="pt-2 border-t border-neutral-850 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/jobs"
            className="w-full bg-white hover:bg-neutral-200 text-black font-bold text-xs py-3.5 px-4 rounded-xl transition-all no-underline flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Go to Jobs Hub
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="w-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium text-xs py-3.5 px-4 rounded-xl transition-colors no-underline flex items-center justify-center gap-2"
          >
            Return to Dashboard
          </Link>
        </footer>

      </div>
    </div>
  );
}