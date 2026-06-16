"use client";

import { useEffect, useState } from "react";
import {
  CircleHelp,
  CreditCard,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
  Star,
  UserRound,
  Zap,
} from "lucide-react";
import { BackgroundRippleLayout } from "@/components/ui/bg/backgroundRippleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useUserStore";
import axiosInstance from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";

type ProfileMenu = "profile" | "support";

const menuItems: Array<{
  key: ProfileMenu;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
}> = [
  {
    key: "profile",
    label: "Profile",
    icon: UserRound,
    activeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    key: "support",
    label: "Help & Support",
    icon: CircleHelp,
    activeClass: "bg-rose-100 text-rose-700 border-rose-200",
  },
];

type GoalOption = {
  id: "perfect_resume" | "find_jobs" | "hr_emails" | "others";
  label: string;
};

const DESIGNATION_OPTIONS = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer",
];

const EXPERIENCE_OPTIONS = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-8 years",
  "8-12 years",
  "12+ years",
];

const COMPANY_TYPE_OPTIONS = [
  "Startup",
  "Mid-size Product Company",
  "Enterprise",
  "Service-Based Company",
  "Remote-First Company",
];

const GOAL_OPTIONS: GoalOption[] = [
  { id: "perfect_resume", label: "Create the perfect resume" },
  { id: "find_jobs", label: "Find relevant jobs" },
  { id: "hr_emails", label: "Get HR emails directly" },
  { id: "others", label: "Others" },
];

const SUPPORT_SUBJECT_OPTIONS = [
  "General Inquiry",
  "Technical Support",
  "Billing & Payments",
  "Account Assistance",
  "Order Status",
  "Returns & Refunds",
  "Feature Request",
  "Feedback & Suggestions",
];

export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState<ProfileMenu>("profile");

  return (
    <BackgroundRippleLayout tone="light" contentClassName="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 shadow-xl backdrop-blur">
          <div className="grid min-h-[78vh] grid-cols-1 lg:grid-cols-[280px_1fr]">
            <aside className="border-b border-neutral-200 bg-neutral-50/80 p-4 lg:border-b-0 lg:border-r lg:p-6">
              <h1 className="text-xl font-bold text-neutral-800">Account Center</h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage profile, orders, billing and support.
              </p>

              <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.key;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveMenu(item.key)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-medium transition",
                        "border-transparent text-neutral-600 hover:border-neutral-200 hover:bg-white",
                        isActive && item.activeClass
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <section className="p-4 sm:p-6 lg:p-8">{renderPanel(activeMenu)}</section>
          </div>
        </div>
      </main>
    </BackgroundRippleLayout>
  );
}

function ProfileSettingsPanel() {
  const [fullName, setFullName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [desiredDesignation, setDesiredDesignation] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [goals, setGoals] = useState<GoalOption["id"][]>([]);
  const [otherGoal, setOtherGoal] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingBasic, setSavingBasic] = useState(false);
  const [savingCareer, setSavingCareer] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');

  // UI
  const [showEmailOtpField, setShowEmailOtpField] = useState(false);
  const [emailOtpLoader, setEmailOtpLoader] = useState(false);
  const [emailChangeLoader, setEmailChangeLoader] = useState(false);

  const { user, updateUser, changeEmail, verifyEmail } = useUserStore();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosInstance.get('/account/profile/me');
        const resData = await response.data;

        if (resData?.success) {
            setFullName(resData?.user?.name || "");
            setCurrentEmail(resData?.user?.email || "");
            setCurrentDesignation(resData?.user?.jobseekerOnboarding?.currentDesignation || "");
            setCurrentCompany(resData?.user?.jobseekerOnboarding?.currentCompany || "");
            setExperience(resData?.user?.jobseekerOnboarding?.experience || "");
            setDesiredDesignation(resData?.user?.jobseekerOnboarding?.desiredDesignation || "");
            setCompanyType(resData?.user?.jobseekerOnboarding?.companyType || "");
            setGoals(
                Array.isArray(resData?.user?.jobseekerOnboarding?.goals)
                ? resData.user.jobseekerOnboarding.goals
                : []
            );
            setOtherGoal(resData?.user?.jobseekerOnboarding?.otherGoal || "");
            setLinkedinUrl(resData?.user?.jobseekerOnboarding?.linkedinUrl || "");
        }
      } catch (error: any) {
        console.log(error?.message);
        toast.error(error?.response?.data?.message || "Some unexpected error occurred. Please try again later.");
      }
    };

    getProfile();
  }, []);

  const toggleGoal = (goal: GoalOption["id"]) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((item) => item !== goal) : [...prev, goal]
    );
  };

  const handleSaveBasicInfo = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    try {
        setSavingBasic(true);
        const response = await axiosInstance.put('/account/me/basic', {
          name: fullName.trim(),
        })

        const data = await response.data;
        if (!data.success) {
            toast.error(data.message || "failed to update account");
            return;
        }

        toast.success("Basic account details updated successfully.");
        updateUser({ name: fullName.trim() });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update basic account details.");
    } finally {
      setSavingBasic(false);
    }
  };

  const handleSaveCareerDetails = async () => {
    try {
        setSavingCareer(true);
        const response = await axiosInstance.put("/account/jobseeker", {
                currentDesignation,
                currentCompany: currentCompany.trim(),
                experience,
                desiredDesignation: desiredDesignation.trim(),
                companyType,
                goals,
                otherGoal: goals.includes("others") ? otherGoal.trim() : "",
                linkedinUrl: linkedinUrl.trim(),
            });

        const data = response.data;
        if (!data.success) {
            toast.error(data.message || "failed to update account");
            return;
        }
        toast.success("Career details updated successfully.");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update career details.");
    } finally {
      setSavingCareer(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please enter new password and confirm password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
        setSavingPassword(true);
        const response = await axiosInstance.put('/account/me/change-password', {
          newPassword,
          confirmPassword
        });
        const data = response.data;
        if (!data.success) {
            toast.error(data.message || "failed to update account");
            return;
        }
        toast.success("Password updated successfully.");
        setNewPassword("");
        setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const sendEmailConfirmation = async () => {
    if (newEmail === '' || newEmail.trim() === '' || !newEmail.includes('@')) {
      toast.error('please provide a valid email address');
      return;
    }
    if (user?.email === newEmail) {
      toast.info("your current email and new email cannot be same. Try adding new email address.");
      return;
    }
    setEmailOtpLoader(true);
    await changeEmail({ name: user?.name, oldEmail: user?.email, newEmail: newEmail });
    setEmailOtpLoader(false);
    setShowEmailOtpField(true);
  }

  const verifyEmailOtp = async () => {
    setEmailChangeLoader(true);
    const res = await verifyEmail(emailOtp, newEmail);
    if (res?.success) {
      setCurrentEmail(newEmail);
      setNewEmail('');
      setEmailOtp('');
    }
    setEmailChangeLoader(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800">Profile Settings</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Update your personal details and account security information.
        </p>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
            <UserRound className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="basic-full-name">Full Name</Label>
            <Input
              id="basic-full-name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSaveBasicInfo}
              disabled={savingBasic}
            >
              {savingBasic ? "Saving..." : "Save Basic Info"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-indigo-700">
            <UserRound className="h-5 w-5" />
            Career Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Current Designation</Label>
            <Select value={currentDesignation} onValueChange={setCurrentDesignation}>
              <SelectTrigger className="h-10 w-full rounded-lg border-neutral-200">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {DESIGNATION_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="career-current-company">Current Company</Label>
            <Input
              id="career-current-company"
              placeholder="Company name"
              value={currentCompany}
              onChange={(e) => setCurrentCompany(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Experience</Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger className="h-10 w-full rounded-lg border-neutral-200">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="career-desired-designation">Desired Designation</Label>
            <Input
              id="career-desired-designation"
              placeholder="Senior Full Stack Developer"
              value={desiredDesignation}
              onChange={(e) => setDesiredDesignation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Company Type</Label>
            <Select value={companyType} onValueChange={setCompanyType}>
              <SelectTrigger className="h-10 w-full rounded-lg border-neutral-200">
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Goals</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GOAL_OPTIONS.map((option) => {
                const selected = goals.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleGoal(option.id)}
                    className={cn(
                      "flex min-h-16 items-center rounded-lg border p-3 text-left text-sm transition",
                      selected
                        ? "border-neutral-900 bg-neutral-100 text-neutral-900"
                        : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {goals.includes("others") && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="career-other-goal">Other Goal</Label>
              <Input
                id="career-other-goal"
                placeholder="Type your goal"
                value={otherGoal}
                onChange={(e) => setOtherGoal(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="career-linkedin-url">Linkedin URL</Label>
            <Input
              id="career-linkedin-url"
              type="url"
              placeholder="https://www.linkedin.com/in/username"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleSaveCareerDetails}
              disabled={savingCareer}
            >
              {savingCareer ? "Saving..." : "Save Career Details"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700">
            <Mail className="h-5 w-5" />
            Email Section
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            Changing your email requires OTP verification sent to your new email.
            For security, account access may be limited during verification.
          </p>
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input id="current-email" placeholder="john@example.com" value={currentEmail} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email-address">New Email Address</Label>
            <Input
              id="new-email-address"
              placeholder="new-email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
         {
          showEmailOtpField && (
            <div className="space-y-2">
              <Label htmlFor="email-otp">Enter your Otp</Label>
              <Input
                id="email-otp"
                placeholder="8-digit otp"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
              />
            </div>
          )
         }
          <div className="flex flex-wrap gap-3">
            <Button disabled={emailOtpLoader} className="bg-amber-600 text-white hover:bg-amber-700" onClick={sendEmailConfirmation}>
              { emailOtpLoader &&  <Spinner /> }  Send OTP to New Email
            </Button>
            <Button disabled={emailChangeLoader} variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50" onClick={verifyEmailOtp}>
              { emailChangeLoader &&  <Spinner /> } Verify OTP
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
            Password & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleUpdatePassword}
              disabled={savingPassword}
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SupportPanel() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitSupport = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill all support form fields.");
      return;
    }

    try {
        setSubmitting(true);
        const response = await axiosInstance.post('/account/help/support/request-form', {
          subject,
          message: message.trim(),
        })
        const data = response.data;
        if (!data.success) {
            toast.error(data.message || 'could not raise the request at the moment. Try again sometime.');
            return;
        }
        toast.success("Support request submitted successfully.");
        setSubject("");
        setMessage("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit support request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800">Help & Support</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Reach out to us using email, phone, or the support form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <Mail className="h-5 w-5" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>support@resumeassist.ai</p>
            <p className="text-xs text-neutral-500">Response time: within 24 hours.</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Phone className="h-5 w-5" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600">
            <p>+1 (555) 019-2048</p>
            <p className="text-xs text-neutral-500">Mon-Fri, 9:00 AM to 6:00 PM.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-700">Support Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="support-subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="support-subject" className="h-10 w-full rounded-lg border-neutral-200">
                <SelectValue placeholder="Select support subject" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORT_SUBJECT_OPTIONS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-message">Message</Label>
            <Textarea
              id="support-message"
              placeholder="Explain your issue in detail..."
              className="min-h-28"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button
            type="button"
            className="bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={handleSubmitSupport}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function renderPanel(activeMenu: ProfileMenu) {
  if (activeMenu === "profile") {
    return <ProfileSettingsPanel />;
  }

  return <SupportPanel />;
}
