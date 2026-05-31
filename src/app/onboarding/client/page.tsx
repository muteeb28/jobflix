'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Building2,
  CalendarClock,
  CircleDollarSign,
  Handshake,
  Loader2,
  Plus,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

type BudgetType = 'fixed' | 'hourly' | 'not_sure';
type UrgencyType = 'low' | 'medium' | 'high';
type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'expert';

interface ClientFormData {
  fullName?: string;
  companyName?: string;
  companyWebsite?: string;
  roleTitle?: string;
  companySize?: string;
  industry?: string;
  timezone?: string;
  projectTitle?: string;
  projectCategory?: string;
  projectDescription?: string;
  goals?: string[];
  deliverables?: string[];
  budgetType?: BudgetType;
  budgetMin?: string;
  budgetMax?: string;
  currency?: string;
  timelineWeeks?: string;
  startDate?: string;
  urgency?: UrgencyType;
  freelancerCount?: string;
  experienceLevel?: ExperienceLevel;
  communicationPreference?: string;
  weeklyHoursExpectation?: string;
  ndaRequired?: boolean;
  tools?: string[];
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  const points = [
    {
      icon: Target,
      title: 'Define your outcome',
      desc: 'Tell us what success looks like so we match you faster.',
    },
    {
      icon: CircleDollarSign,
      title: 'Set clear budget',
      desc: 'Budget range helps freelancers send relevant proposals.',
    },
    {
      icon: Handshake,
      title: 'Hire confidently',
      desc: 'Screen candidates by skills, level, and communication fit.',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-blue-800 dark:text-blue-200">
          Client Onboarding
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Post a project the Fiverr way: clear scope, clear budget, clear expectations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {points.map((point) => (
          <Card key={point.title} className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
            <CardContent className="p-6">
              <point.icon className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{point.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={onNext} className="w-full bg-blue-600 text-white hover:bg-blue-500" size="lg">
        Start Client Setup
      </Button>
    </motion.div>
  );
}

function ClientProfileScreen({
  formData,
  setFormData,
  onNext,
}: {
  formData: ClientFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClientFormData>>;
  onNext: () => void;
}) {
  const isValid = !!formData.fullName && !!formData.companyName && !!formData.roleTitle;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-200">Company Profile</h2>
        <p className="text-slate-600 dark:text-slate-300">Tell freelancers who they are working with.</p>
      </div>

      <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Your Full Name *</Label>
              <Input id="fullName" value={formData.fullName ?? ''} onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleTitle">Your Role *</Label>
              <Input id="roleTitle" placeholder="Founder, Product Manager..." value={formData.roleTitle ?? ''} onChange={(e) => setFormData((p) => ({ ...p, roleTitle: e.target.value }))} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" value={formData.companyName ?? ''} onChange={(e) => setFormData((p) => ({ ...p, companyName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input id="companyWebsite" type="url" placeholder="https://company.com" value={formData.companyWebsite ?? ''} onChange={(e) => setFormData((p) => ({ ...p, companyWebsite: e.target.value }))} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input id="companySize" placeholder="1-10, 11-50..." value={formData.companySize ?? ''} onChange={(e) => setFormData((p) => ({ ...p, companySize: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="SaaS, E-commerce..." value={formData.industry ?? ''} onChange={(e) => setFormData((p) => ({ ...p, industry: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" placeholder="UTC+05:30" value={formData.timezone ?? ''} onChange={(e) => setFormData((p) => ({ ...p, timezone: e.target.value }))} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onNext} disabled={!isValid} className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-500">
        Continue to Project Brief
      </Button>
    </motion.div>
  );
}

function ProjectBriefScreen({
  formData,
  setFormData,
  onNext,
}: {
  formData: ClientFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClientFormData>>;
  onNext: () => void;
}) {
  const [goals, setGoals] = useState<string[]>(formData.goals ?? ['']);
  const [deliverables, setDeliverables] = useState<string[]>(formData.deliverables ?? ['']);

  const updateStringArray = (
    current: string[],
    setCurrent: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const updated = [...current];
    updated[index] = value;
    setCurrent(updated);
  };

  const isValid = !!formData.projectTitle && !!formData.projectCategory && !!formData.projectDescription;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-200">Project Brief</h2>
        <p className="text-slate-600 dark:text-slate-300">Share scope so freelancers can estimate accurately.</p>
      </div>

      <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title *</Label>
              <Input id="projectTitle" placeholder="Build landing page and ad creatives" value={formData.projectTitle ?? ''} onChange={(e) => setFormData((p) => ({ ...p, projectTitle: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectCategory">Project Category *</Label>
              <Input id="projectCategory" placeholder="Web Development, Video Editing..." value={formData.projectCategory ?? ''} onChange={(e) => setFormData((p) => ({ ...p, projectCategory: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description *</Label>
            <Textarea
              id="projectDescription"
              rows={5}
              placeholder="Describe current situation, required solution, and expected output."
              value={formData.projectDescription ?? ''}
              onChange={(e) => setFormData((p) => ({ ...p, projectDescription: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Business Goals</Label>
            {goals.map((goal, index) => (
              <div key={`goal-${index}`} className="flex gap-2">
                <Input
                  value={goal}
                  placeholder="Increase conversion by 20%"
                  onChange={(e) => updateStringArray(goals, setGoals, index, e.target.value)}
                />
                {goals.length > 1 && (
                  <Button type="button" size="icon" variant="outline" onClick={() => setGoals((p) => p.filter((_, i) => i !== index))}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" className="w-full" onClick={() => setGoals((p) => [...p, ''])}>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Expected Deliverables</Label>
            {deliverables.map((item, index) => (
              <div key={`deliverable-${index}`} className="flex gap-2">
                <Input
                  value={item}
                  placeholder="5 ad creatives, one analytics report..."
                  onChange={(e) => updateStringArray(deliverables, setDeliverables, index, e.target.value)}
                />
                {deliverables.length > 1 && (
                  <Button type="button" size="icon" variant="outline" onClick={() => setDeliverables((p) => p.filter((_, i) => i !== index))}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" className="w-full" onClick={() => setDeliverables((p) => [...p, ''])}>
              <Plus className="h-4 w-4 mr-2" />
              Add Deliverable
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={() => {
          setFormData((p) => ({
            ...p,
            goals: goals.filter((g) => g.trim()),
            deliverables: deliverables.filter((d) => d.trim()),
          }));
          onNext();
        }}
        disabled={!isValid}
        className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-500"
      >
        Continue to Budget & Timeline
      </Button>
    </motion.div>
  );
}

function BudgetTimelineScreen({
  formData,
  setFormData,
  onNext,
}: {
  formData: ClientFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClientFormData>>;
  onNext: () => void;
}) {
  const isValid = !!formData.budgetType && !!formData.budgetMin && !!formData.budgetMax && !!formData.timelineWeeks;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-200">Budget & Timeline</h2>
        <p className="text-slate-600 dark:text-slate-300">Set realistic budget and urgency to filter better matches.</p>
      </div>

      <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="budgetType">Budget Type *</Label>
            <select
              id="budgetType"
              value={formData.budgetType ?? ''}
              onChange={(e) => setFormData((p) => ({ ...p, budgetType: e.target.value as BudgetType }))}
              className="flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm dark:border-blue-900/50 dark:bg-slate-950"
            >
              <option value="">Select budget type</option>
              <option value="fixed">Fixed price</option>
              <option value="hourly">Hourly</option>
              <option value="not_sure">Not sure yet</option>
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetMin">Budget Min *</Label>
              <Input id="budgetMin" type="number" placeholder="500" value={formData.budgetMin ?? ''} onChange={(e) => setFormData((p) => ({ ...p, budgetMin: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetMax">Budget Max *</Label>
              <Input id="budgetMax" type="number" placeholder="2000" value={formData.budgetMax ?? ''} onChange={(e) => setFormData((p) => ({ ...p, budgetMax: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" placeholder="USD, INR..." value={formData.currency ?? ''} onChange={(e) => setFormData((p) => ({ ...p, currency: e.target.value }))} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timelineWeeks">Timeline (weeks) *</Label>
              <Input id="timelineWeeks" type="number" placeholder="4" value={formData.timelineWeeks ?? ''} onChange={(e) => setFormData((p) => ({ ...p, timelineWeeks: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Target Start Date</Label>
              <Input id="startDate" type="date" value={formData.startDate ?? ''} onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency</Label>
              <select
                id="urgency"
                value={formData.urgency ?? ''}
                onChange={(e) => setFormData((p) => ({ ...p, urgency: e.target.value as UrgencyType }))}
                className="flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm dark:border-blue-900/50 dark:bg-slate-950"
              >
                <option value="">Select urgency</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onNext} disabled={!isValid} className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-500">
        Continue to Hiring Preferences
      </Button>
    </motion.div>
  );
}

function HiringPreferencesScreen({
  formData,
  setFormData,
  onComplete,
}: {
  formData: ClientFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClientFormData>>;
  onComplete: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [tools, setTools] = useState<string[]>(formData.tools ?? ['']);
  const isValid = !!formData.freelancerCount && !!formData.experienceLevel && !!formData.communicationPreference;

  const submit = async () => {
    setSaving(true);
    try {
      const payload: ClientFormData = {
        ...formData,
        tools: tools.filter((t) => t.trim()),
      };

      const res = await fetch('/api/onboarding/client/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save client onboarding');
      toast.success('Client onboarding completed.');
      onComplete();
    } catch {
      toast.error('Could not save onboarding. Connect the API endpoint and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-200">Hiring Preferences</h2>
        <p className="text-slate-600 dark:text-slate-300">Define who you want to hire and how you collaborate.</p>
      </div>

      <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freelancerCount">How many freelancers?</Label>
              <Input id="freelancerCount" type="number" placeholder="1" value={formData.freelancerCount ?? ''} onChange={(e) => setFormData((p) => ({ ...p, freelancerCount: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Preferred Experience Level</Label>
              <select
                id="experienceLevel"
                value={formData.experienceLevel ?? ''}
                onChange={(e) => setFormData((p) => ({ ...p, experienceLevel: e.target.value as ExperienceLevel }))}
                className="flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm dark:border-blue-900/50 dark:bg-slate-950"
              >
                <option value="">Select level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="communicationPreference">Communication Preference</Label>
              <Input id="communicationPreference" placeholder="Daily async updates, weekly call..." value={formData.communicationPreference ?? ''} onChange={(e) => setFormData((p) => ({ ...p, communicationPreference: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weeklyHoursExpectation">Expected Weekly Hours</Label>
              <Input id="weeklyHoursExpectation" placeholder="10-20 hours/week" value={formData.weeklyHoursExpectation ?? ''} onChange={(e) => setFormData((p) => ({ ...p, weeklyHoursExpectation: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preferred Tools</Label>
            {tools.map((tool, index) => (
              <div key={index} className="flex gap-2">
                <Input value={tool} placeholder="Slack, Jira, Notion..." onChange={(e) => {
                  const updated = [...tools];
                  updated[index] = e.target.value;
                  setTools(updated);
                }} />
                {tools.length > 1 && (
                  <Button type="button" size="icon" variant="outline" onClick={() => setTools((p) => p.filter((_, i) => i !== index))}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" className="w-full" onClick={() => setTools((p) => [...p, ''])}>
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          </div>

          <label className="flex items-center gap-3 rounded-md border border-blue-100 p-3 dark:border-blue-900/50">
            <input
              type="checkbox"
              checked={!!formData.ndaRequired}
              onChange={(e) => setFormData((p) => ({ ...p, ndaRequired: e.target.checked }))}
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">NDA is required before project kickoff</span>
          </label>
        </CardContent>
      </Card>

      <Button onClick={submit} disabled={!isValid || saving} className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-500">
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Complete Client Onboarding'
        )}
      </Button>
    </motion.div>
  );
}

export default function ClientOnboardingPage() {
  const router = useRouter();
  const [screen, setScreen] = useState(1);
  const [formData, setFormData] = useState<ClientFormData>({
    budgetType: 'fixed',
    currency: 'USD',
    ndaRequired: false,
  });

  const totalScreens = 5;
  const progress = (screen / totalScreens) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 rounded-xl border border-blue-100 bg-white/85 p-4 shadow-sm dark:border-blue-900/50 dark:bg-slate-950/75">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Step {screen} of {totalScreens}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {screen === 1 && <IntroScreen key="intro" onNext={() => setScreen(2)} />}
          {screen === 2 && <ClientProfileScreen key="profile" formData={formData} setFormData={setFormData} onNext={() => setScreen(3)} />}
          {screen === 3 && <ProjectBriefScreen key="brief" formData={formData} setFormData={setFormData} onNext={() => setScreen(4)} />}
          {screen === 4 && <BudgetTimelineScreen key="budget" formData={formData} setFormData={setFormData} onNext={() => setScreen(5)} />}
          {screen === 5 && (
            <HiringPreferencesScreen
              key="hiring"
              formData={formData}
              setFormData={setFormData}
              onComplete={() => {
                toast.success('Redirecting to dashboard');
                router.push('/dashboard');
              }}
            />
          )}
        </AnimatePresence>

        {screen > 1 && screen <= totalScreens && (
          <Button variant="outline" className="mt-4" onClick={() => setScreen((p) => p - 1)}>
            Back
          </Button>
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-3 text-xs text-slate-600 dark:text-slate-300">
          <Card className="border-blue-100 dark:border-blue-900/50">
            <CardContent className="p-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span>Company context</span>
            </CardContent>
          </Card>
          <Card className="border-blue-100 dark:border-blue-900/50">
            <CardContent className="p-3 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-blue-600" />
              <span>Budget and timeline clarity</span>
            </CardContent>
          </Card>
          <Card className="border-blue-100 dark:border-blue-900/50">
            <CardContent className="p-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Safer hiring preferences</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
