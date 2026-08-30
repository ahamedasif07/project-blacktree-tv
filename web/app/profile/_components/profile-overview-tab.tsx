"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import {
  AlertTriangle,
  AtSign,
  Camera,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

const ProfileOverview = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();

  // Zustand Store bindings
  const {
    profile,
    editName,
    editEmail,
    editPhone,
    editUsername,
    countdownText,
    setProfile,
    setEditFields,
    setCountdownText,
    savePersonalDetails,
    initializeForm,
  } = useUserProfileStore();

  const hasActiveSubscription = !!profile?.membershipTier;

  // Password fields state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Form edit status
  const [isSavingDetails, setIsSavingDetails] = useState(false);

  // Initialize form fields on component mount
  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  // Handle Expiration Live Countdown
  useEffect(() => {
    if (!hasActiveSubscription || !profile.expirationDate) return;

    const updateCountdown = () => {
      const difference = +new Date(profile.expirationDate) - +new Date();

      if (difference <= 0) {
        setCountdownText("Expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdownText(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [profile.expirationDate, hasActiveSubscription, setCountdownText]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setProfile({ avatar: localUrl });
      toast.success("Avatar preview updated. Save details to persist.");
    }
  };

  const handleSaveDetails = async () => {
    setIsSavingDetails(true);
    try {
      // Execute local store save
      savePersonalDetails();

      // If backend user API exists, trigger update request
      if (user?.id) {
        await api.patch(`/user/profile/${user.id}`, {
          name: editName,
          displayName: editUsername,
          email: editEmail,
          phone: editPhone,
        });
      }
      toast.success("Profile details updated successfully!");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Saved locally, but failed to sync online."));
    } finally {
      setIsSavingDetails(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    setIsUpdatingPassword(true);
    try {
      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      if (response.data.success) {
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "An error occurred while changing password."));
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm.");
      return;
    }
    if (!user?.id) {
      toast.error("User session not found.");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await api.delete(`/user/user/${user.id}`);
      if (response.data.success) {
        toast.success("Your account has been deleted permanently.");
        logout();
      } else {
        toast.error(response.data.message || "Failed to delete account.");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "An error occurred while deleting your account."));
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 container mx-auto pb-10">
      {/* HEADER SECTION */}
      <div className="space-y-1.5 pb-2">
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent font-sans sm:text-4xl">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans tracking-wide">
          Manage your personal identifiers, subscription plan details, billing,
          and system credentials.
        </p>
      </div>

      {/* SECTION 1: MEMBERSHIP & BILLING (Netflix Style Row) */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-t border-neutral-900/60 pt-6 gap-6 md:gap-4">
        {/* Left Column: Row Title */}
        <div className="md:col-span-3 space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-sans">
            Membership & Billing
          </h2>
          <p className="text-[10px] text-neutral-400 hidden md:block">
            Subscription cycles and renewal details.
          </p>
        </div>

        {/* Right Column: Row Action Card */}
        <div className="md:col-span-9 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 p-5 rounded-2xl space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_20px_rgba(220,38,38,0.02)] hover:border-red-500/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.8),0_0_25px_rgba(220,38,38,0.06)] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900/60 pb-3 gap-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-sans text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              hasActiveSubscription 
                ? "text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]" 
                : "text-neutral-400 bg-neutral-900/30 border-neutral-800"
            }`}>
              <Zap size={13} className={hasActiveSubscription ? "text-amber-400 animate-pulse" : "text-neutral-400"} />
              <span>
                {hasActiveSubscription
                  ? profile.membershipTier
                  : "No Active Plan"}
              </span>
            </div>
            {hasActiveSubscription && (
              <span className="text-[10px] font-mono text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.05)]">
                Next renewal: June 12, 2026 ({countdownText} left)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            {/* Price Item */}
            <div className="space-y-1 p-3.5 bg-neutral-900/20 border border-neutral-900/60 rounded-xl hover:border-neutral-850 hover:bg-neutral-900/30 transition-all duration-300 shadow-inner">
              <span className="text-[9px] uppercase tracking-wider text-neutral-450 block font-semibold">
                Plan Cost
              </span>
              <span className="text-white font-extrabold text-sm tracking-wide">
                {hasActiveSubscription ? "$14.99 / Month" : "$0.00"}
              </span>
            </div>

            {/* Screen Capacity */}
            <div className="space-y-1 p-3.5 bg-neutral-900/20 border border-neutral-900/60 rounded-xl hover:border-neutral-850 hover:bg-neutral-900/30 transition-all duration-300 shadow-inner">
              <span className="text-[9px] uppercase tracking-wider text-neutral-455 block font-semibold">
                Concurrent Screens
              </span>
              <span className="text-white font-extrabold text-sm tracking-wide">
                {hasActiveSubscription
                  ? "4 Screens Simultaneously"
                  : "0 Screens Available"}
              </span>
            </div>

            {/* Payment Method */}
            <div className="space-y-1 p-3.5 bg-neutral-900/20 border border-neutral-900/60 rounded-xl hover:border-neutral-850 hover:bg-neutral-900/30 transition-all duration-300 shadow-inner flex items-center justify-between sm:justify-start gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-450 block font-semibold">
                  Payment Method
                </span>
                <span className="text-white font-extrabold text-sm tracking-wide flex items-center gap-1.5">
                  <CreditCard size={13} className="text-rose-500" />
                  {hasActiveSubscription
                    ? "Visa •••• 4242"
                    : "No payment method"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PERSONAL PROFILE DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-t border-neutral-900/60 pt-6 gap-6 md:gap-4">
        {/* Left Column: Row Title */}
        <div className="md:col-span-3 space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-sans">
            Personal Profile
          </h2>
          <p className="text-[10px] text-neutral-400 hidden md:block">
            Identity variables and public avatar.
          </p>
        </div>

        {/* Right Column: Row Action Card */}
        <div className="md:col-span-9 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 p-5 rounded-2xl space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_20px_rgba(220,38,38,0.02)] hover:border-red-500/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.8),0_0_25px_rgba(220,38,38,0.06)] transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 pb-2 border-b border-neutral-900/60">
            {/* Avatar block */}
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center border border-neutral-800 group-hover:border-red-500/30 p-1 group shadow-inner hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300">
              <div className="relative w-full h-full bg-neutral-950 rounded-full overflow-hidden">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt="Avatar"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-400">
                    <User size={28} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <Camera size={14} className="mb-0.5 text-red-500" />
                  <span className="text-[8px] font-extrabold text-white uppercase tracking-widest">
                    Edit
                  </span>
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="text-center sm:text-left space-y-0.5">
              <h3 className="text-sm font-bold text-white tracking-wide">
                {editName || "Asif Hosen"}
              </h3>
              <p className={`text-[10px] uppercase tracking-widest font-mono font-semibold transition-colors duration-300 ${
                hasActiveSubscription ? "text-amber-400" : "text-neutral-400"
              }`}>
                {hasActiveSubscription
                  ? profile.membershipTier
                  : "Standard Tier"}
              </p>
            </div>
          </div>

          {/* Form details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Field: Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-wider pl-0.5">
                Full Name
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                  <User size={14} />
                </span>
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditFields({ editName: e.target.value })}
                  className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-9 rounded-xl transition-all duration-300 shadow-inner"
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            {/* Field: Username */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-455 uppercase tracking-wider pl-0.5">
                Username
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                  <AtSign size={14} />
                </span>
                <Input
                  type="text"
                  value={editUsername || ""}
                  onChange={(e) =>
                    setEditFields({ editUsername: e.target.value })
                  }
                  className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-9 rounded-xl transition-all duration-300 shadow-inner"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-wider pl-0.5">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                  <Mail size={14} />
                </span>
                <Input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditFields({ editEmail: e.target.value })}
                  className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-9 rounded-xl transition-all duration-300 shadow-inner"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Field: Phone */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-455 uppercase tracking-wider pl-0.5">
                Phone Number
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                  <Phone size={14} />
                </span>
                <Input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditFields({ editPhone: e.target.value })}
                  className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-9 rounded-xl transition-all duration-300 shadow-inner"
                  placeholder="+8801700000000"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSaveDetails}
              disabled={isSavingDetails}
              className="bg-linear-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-500 hover:via-rose-500 hover:to-rose-600 text-white font-extrabold text-xs px-6 py-4.5 rounded-xl tracking-wider uppercase shadow-[0_4px_15px_rgba(220,38,38,0.15)] hover:shadow-[0_4px_25px_rgba(220,38,38,0.35)] transition-all duration-300 cursor-pointer border border-red-500/20"
            >
              {isSavingDetails ? "Saving..." : "Save Profile Details"}
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION 3: SECURITY CREDENTIALS */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-t border-neutral-900/60 pt-6 gap-6 md:gap-4">
        {/* Left Column: Row Title */}
        <div className="md:col-span-3 space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-sans">
            Security
          </h2>
          <p className="text-[10px] text-neutral-400 hidden md:block">
            Password parameters and identity keys.
          </p>
        </div>

        {/* Right Column: Row Action Card */}
        <div className="md:col-span-9 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 p-5 rounded-2xl space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_20px_rgba(220,38,38,0.02)] hover:border-red-500/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.8),0_0_25px_rgba(220,38,38,0.06)] transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-tight text-white font-sans">
                Master Account Password
              </h4>
              <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                Use a strong, cyclic rotated password to protect against token
                reuse.
              </p>
            </div>
            {!showPasswordForm && (
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(true)}
                className="h-9 px-4 text-xs font-bold border border-neutral-850 bg-neutral-900/40 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 text-white transition-all duration-300 rounded-xl shadow-md"
              >
                Change Password
              </Button>
            )}
          </div>

          {showPasswordForm && (
            <form
              onSubmit={handleUpdatePassword}
              className="space-y-4 pt-4 border-t border-neutral-900/60 animate-in fade-in duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Field: Current Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                    Current Password
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                      <Lock size={13} />
                    </span>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-10 pr-10 rounded-xl transition-all duration-300 shadow-inner font-sans"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors h-5 w-5 flex items-center justify-center"
                    >
                      {showPasswords ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                {/* Field: New Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                    New Password
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                      <Lock size={13} />
                    </span>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-10 pr-10 rounded-xl transition-all duration-300 shadow-inner font-sans"
                      placeholder="Min. 8 characters"
                      required
                    />
                  </div>
                </div>

                {/* Field: Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest pl-0.5">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                      <Lock size={13} />
                    </span>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-10 pr-10 rounded-xl transition-all duration-300 shadow-inner font-sans"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="h-9 px-4 text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent hover:border-neutral-800/85 transition-all duration-300 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="h-9 px-5 text-xs font-extrabold bg-linear-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-500 hover:via-rose-500 hover:to-rose-600 text-white rounded-xl uppercase tracking-wider shadow-[0_4px_12px_rgba(220,38,38,0.15)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.35)] transition-all duration-300 cursor-pointer border border-red-500/20"
                >
                  {isUpdatingPassword ? "Updating..." : "Save Password"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* SECTION 4: DANGER ZONE (Delete Profile) */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-t border-neutral-900/60 pt-6 gap-6 md:gap-4">
        {/* Left Column: Row Title */}
        <div className="md:col-span-3 space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-red-550 font-sans">
            Danger Zone
          </h2>
          <p className="text-[10px] text-neutral-400 hidden md:block">
            Permanently destroy account record.
          </p>
        </div>

        {/* Right Column: Row Action Card */}
        <div className="md:col-span-9 bg-red-950/10 hover:bg-red-950/15 border border-red-950/40 hover:border-red-500/35 p-5 rounded-2xl space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.6),0_0_20px_rgba(220,38,38,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.8),0_0_25px_rgba(220,38,38,0.08)] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-tight text-white font-sans">
                Permanent Account Destruction
              </h4>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                Delete your profile data, subscriptions, settings, and watch
                history records permanently.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
              className="h-9 px-5 text-xs font-extrabold bg-red-600 hover:bg-red-505 active:bg-red-700 text-white rounded-xl uppercase tracking-wider transition-all duration-300 shadow-[0_4px_12px_rgba(220,38,38,0.15)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.35)] shrink-0 self-start sm:self-center border border-red-500/20 cursor-pointer"
            >
              Delete Profile
            </Button>
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL OVERLAY */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-neutral-950/90 border border-red-500/25 rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(220,38,38,0.15)] space-y-5 animate-in zoom-in-95 duration-300 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Permanent Account Destruction
              </h3>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              This action cannot be undone. All subscription features will
              terminate immediately and all personal data records will be
              deleted.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Type{" "}
                <span className="text-red-500 font-extrabold font-mono">
                  DELETE
                </span>{" "}
                in the field below to confirm:
              </label>
              <Input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/10 h-10 text-xs text-white rounded-xl font-mono text-center tracking-widest transition-all duration-300 shadow-inner"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                disabled={isDeleting}
                className="h-9 px-4 text-xs font-bold bg-neutral-900/40 border border-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-950 rounded-xl transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                className="h-9 px-5 text-xs font-extrabold bg-red-600 hover:bg-red-500 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:border-transparent disabled:cursor-not-allowed text-white rounded-xl uppercase tracking-wider transition-all duration-300 border border-red-500/20 shadow-[0_4px_12px_rgba(220,38,38,0.15)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.35)] cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Confirm Deletion"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
