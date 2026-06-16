'use client'

import { useState, useEffect, JSX } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  CheckCircle,
  Lock,
  Upload,
  User,
  Loader2,
  Briefcase,
  Award,
  Globe,
  Plus,
  X,
  FileText,
  GraduationCap,
  UserX,
  MessageCircle,
  DollarSign,
  BadgeCheck,
  Cpu,
  ShieldAlert,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
}

interface CertificationEntry {
  name: string;
  year: string;
  link: string;
}

interface FormData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  displayName?: string;
  profilePicture?: string;
  profilePictureId?: string;
  description?: string;
  languages?: string[];
  occupation?: string;
  experienceFrom?: string;
  experienceTo?: string;
  skills?: string[];
  education?: EducationEntry[];
  certifications?: CertificationEntry[];
  website?: string;
}

interface OnboardingData {
  occupations: string[];
  skills: string[];
}

// ── Screen 1: Introduction ─────────────────────────────────────────────────────

interface IntroductionScreenProps {
  onNext: () => void;
}

function IntroductionScreen({ onNext }: IntroductionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          Build a freelancer profile clients can trust
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          We will guide you through the essentials in about 5-10 minutes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
          <CardContent className="p-6">
            <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Clear profile basics</h3>
            <p className="text-slate-600 dark:text-slate-300">Name, summary, and skills that clients can quickly understand.</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
          <CardContent className="p-6">
            <Briefcase className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professional details</h3>
            <p className="text-slate-600 dark:text-slate-300">Experience, education, and certifications presented in a credible format.</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
          <CardContent className="p-6">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stronger first impression</h3>
            <p className="text-slate-600 dark:text-slate-300">A complete profile improves search visibility and response rates.</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
          <CardContent className="p-6">
            <Award className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Long-term credibility</h3>
            <p className="text-slate-600 dark:text-slate-300">Honest profiles lead to better matches and repeat clients.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 border-blue-100 bg-blue-50/60 dark:border-blue-900/50 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Tip: Keep your profile summary specific. Mention what you do, who you help, and one result you can deliver.
          </p>
        </CardContent>
      </Card>

      <Button
        onClick={onNext}
        size="sm"
        className="w-full bg-blue-600 text-lg py-6 text-white hover:bg-blue-500"
      >
        Continue to Profile Setup
      </Button>
    </motion.div>
  );
}

// ── Screen 2: Success Profile Tips ────────────────────────────────────────────

interface SuccessProfileScreenProps {
  onNext: () => void;
}

function SuccessProfileScreen({ onNext }: SuccessProfileScreenProps) {
  const tips = [
    {
      icon: FileText,
      title: 'Clear profile summary',
      description: 'Describe your services in plain language so clients quickly understand your fit.',
    },
    {
      icon: Briefcase,
      title: 'Relevant experience',
      description: 'List recent work, tools, and outcomes that match the projects you want.',
    },
    {
      icon: Award,
      title: 'Portfolio quality',
      description: 'Share 2-4 strong samples with short context on your role and impact.',
    },
    {
      icon: CheckCircle,
      title: 'Complete the essentials',
      description: 'Fully filled profiles usually get better client trust and fewer clarification messages.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          What a strong profile includes
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Use these guidelines to improve client trust and responses.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-blue-100 bg-white transition-shadow hover:shadow-md dark:border-blue-900/50 dark:bg-slate-950/70">
              <CardContent className="p-6">
                <tip.icon className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{tip.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Button
        onClick={onNext}
        size="lg"
        className="w-full bg-blue-600 text-lg py-6 text-white hover:bg-blue-500"
      >
        Continue
      </Button>
    </motion.div>
  );
}

// ── Screen 3: Warning Screen ───────────────────────────────────────────────────

interface WarningScreenProps {
  onNext: () => void;
}

function WarningScreen({ onNext }: WarningScreenProps) {
  const warnings: { icon: JSX.Element; text: string; color: string }[] = [
    { icon: <UserX className="h-6 w-6" />, text: 'Creating fake or misleading profiles', color: 'amber' },
    { icon: <FileText className="h-6 w-6" />, text: 'Uploading copyrighted or stolen work', color: 'orange' },
    { icon: <MessageCircle className="h-6 w-6" />, text: 'Spamming or harassing clients', color: 'yellow' },
    { icon: <DollarSign className="h-6 w-6" />, text: 'Requesting payment outside the platform', color: 'amber' },
    { icon: <BadgeCheck className="h-6 w-6" />, text: 'Providing false credentials or certifications', color: 'lime' },
    { icon: <Lock className="h-6 w-6" />, text: 'Violating client confidentiality', color: 'sky' },
    { icon: <Cpu className="h-6 w-6" />, text: 'Using automated bots or scripts', color: 'violet' },
  ];

  const colorMap: Record<string, string> = {
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    lime: 'bg-lime-50 border-lime-200 text-lime-700',
    sky: 'bg-sky-50 border-sky-200 text-sky-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <ShieldAlert className="h-16 w-16 text-slate-600 mx-auto mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold mb-3 text-slate-900 dark:text-slate-100">
          Community & Safety Standards
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Please review these rules to maintain a safe and professional environment.
        </p>
      </div>

      {/* Warnings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {warnings.map((warning, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${colorMap[warning.color]}`}
          >
            <div className="flex-shrink-0 mt-1">{warning.icon}</div>
            <p className="font-medium">{warning.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Guidelines Card */}
      <Card className="mb-6 border-green-200 bg-green-50 rounded-lg shadow-sm">
        <CardContent className="p-6 flex items-start gap-3">
          <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Follow our community guidelines</h3>
            <p className="text-slate-700 dark:text-slate-300">
              By clicking continue, you agree to maintain professional standards and follow JobFlix&apos;s terms of service.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <Button
        onClick={onNext}
        size="lg"
        className="w-full bg-blue-600 text-lg py-5 text-white rounded-lg hover:bg-blue-500 transition-colors"
      >
        I Understand, Continue
      </Button>
    </motion.div>
  );
}
// ── Screen 4: Personal Information ────────────────────────────────────────────

interface PersonalInfoScreenProps {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function PersonalInfoScreen({ onNext, formData, setFormData }: PersonalInfoScreenProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [languages, setLanguages] = useState<string[]>(formData.languages ?? ['']);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeBytes = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, or WEBP images are allowed.');
      return;
    }

    if (file.size > maxSizeBytes) {
      toast.error('Image must be 5MB or smaller.');
      return;
    }

    setUploading(true);
    try {
      const sigResponse = await fetch('/api/cloudinary/signature?folder=users/profiles');
      const sig = await sigResponse.json();

      const uploadFormData = new globalThis.FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('api_key', sig.api_key);
      uploadFormData.append('timestamp', sig.timestamp);
      uploadFormData.append('signature', sig.signature);
      uploadFormData.append('folder', sig.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloud_name}/image/upload`,
        { method: 'POST', body: uploadFormData }
      );

      const result = await uploadResponse.json();
      setFormData(prev => ({
        ...prev,
        profilePicture: result.secure_url as string,
        profilePictureId: result.public_id as string,
      }));
      toast.success('Profile picture uploaded!');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addLanguage = () => setLanguages(prev => [...prev, '']);

  const removeLanguage = (index: number) =>
    setLanguages(prev => prev.filter((_, i) => i !== index));

  const updateLanguage = (index: number, value: string) =>
    setLanguages(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

  const handleNext = () => {
    setFormData(prev => ({ ...prev, languages: languages.filter(l => l.trim()) }));
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          Personal Information
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Tell clients who you are and how you work.</p>
      </div>

      <Card className="mb-6 border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Label className="text-base font-semibold text-slate-800 dark:text-slate-100">Profile Picture</Label>

            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-dashed border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-slate-900">
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-10 w-10 text-blue-500 dark:text-blue-300" />
                </div>
              )}
            </div>

            <label className="cursor-pointer">
              <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 dark:border-blue-900/50 dark:text-slate-200 dark:hover:bg-slate-900">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                <span>{uploading ? 'Uploading...' : formData.profilePicture ? 'Change Photo' : 'Upload Photo'}</span>
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>

            <ul className="w-full max-w-md list-disc space-y-1 pl-5 text-left text-xs text-slate-600 dark:text-slate-300">
              <li>Allowed formats: JPG, PNG, WEBP</li>
              <li>Maximum file size: 5MB</li>
              <li>Use a clear headshot for better trust</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={formData.middleName ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name *</Label>
            <Input
              id="displayName"
              placeholder="How you want to be known on JobFlix"
              value={formData.displayName ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Tell clients about yourself and your expertise..."
              value={formData.description ?? ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Languages You Know</Label>
            {languages.map((lang, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={lang}
                  onChange={(e) => updateLanguage(index, e.target.value)}
                  placeholder="e.g., English, Spanish"
                />
                {languages.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeLanguage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addLanguage} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleNext}
        size="sm"
        className="mt-6 w-full bg-blue-600 py-6 text-lg text-white hover:bg-blue-500"
        disabled={
          !formData.firstName ||
          !formData.lastName ||
          !formData.displayName ||
          !formData.description
        }
      >
        Continue to Professional Profile
      </Button>
    </motion.div>
  );
}

// ── Screen 5: Professional Profile ────────────────────────────────────────────

interface ProfessionalProfileScreenProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onComplete: () => void;
}

function ProfessionalProfileScreen({
  formData,
  setFormData,
  onComplete,
}: ProfessionalProfileScreenProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [occupations, setOccupations] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>(formData.skills ?? ['']);
  const [education, setEducation] = useState<EducationEntry[]>(
    formData.education ?? [{ institution: '', degree: '', year: '' }]
  );
  const [certifications, setCertifications] = useState<CertificationEntry[]>(
    formData.certifications ?? [{ name: '', year: '', link: '' }]
  );

  useEffect(() => {
    fetch('/api/onboarding/data')
      .then<OnboardingData>(res => res.json())
      .then(data => {
        setOccupations(data.occupations ?? []);
        setAvailableSkills(data.skills ?? []);
      });
  }, []);

  const addSkill = () => setSkills(prev => [...prev, '']);
  const removeSkill = (index: number) => setSkills(prev => prev.filter((_, i) => i !== index));
  const updateSkill = (index: number, value: string) =>
    setSkills(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

  const addEducation = () =>
    setEducation(prev => [...prev, { institution: '', degree: '', year: '' }]);
  const removeEducation = (index: number) =>
    setEducation(prev => prev.filter((_, i) => i !== index));
  const updateEducation = (index: number, field: keyof EducationEntry, value: string) =>
    setEducation(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

  const addCertification = () =>
    setCertifications(prev => [...prev, { name: '', year: '', link: '' }]);
  const removeCertification = (index: number) =>
    setCertifications(prev => prev.filter((_, i) => i !== index));
  const updateCertification = (index: number, field: keyof CertificationEntry, value: string) =>
    setCertifications(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

  const handleComplete = async () => {
    setLoading(true);
    try {
      const finalData: FormData = {
        ...formData,
        skills: skills.filter(s => s.trim()),
        education: education.filter(e => e.institution || e.degree),
        certifications: certifications.filter(c => c.name),
      };

      const response = await fetch('/api/onboarding/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast.success('Profile completed successfully!');
      onComplete();
    } catch {
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          Professional Profile
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Add work details clients need before they contact you.</p>
      </div>

      <Card className="border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-950/70">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="occupation">Your Occupation *</Label>
            <select
              id="occupation"
              value={formData.occupation ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
              className="flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm dark:border-blue-900/50 dark:bg-slate-950"
              required
            >
              <option value="">Select occupation</option>
              {occupations.map(occ => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experienceFrom">Experience From</Label>
              <Input
                id="experienceFrom"
                type="date"
                value={formData.experienceFrom ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, experienceFrom: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceTo">Experience To</Label>
              <Input
                id="experienceTo"
                type="date"
                value={formData.experienceTo ?? ''}
                onChange={(e) => setFormData(prev => ({ ...prev, experienceTo: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Skills
            </Label>
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="e.g., JavaScript, Design, Marketing"
                  list="skills-list"
                />
                {skills.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeSkill(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <datalist id="skills-list">
              {availableSkills.map(skill => (
                <option key={skill} value={skill} />
              ))}
            </datalist>
            <Button type="button" variant="outline" onClick={addSkill} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </Label>
            {education.map((edu, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Institution name"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  />
                  <Input
                    placeholder="Degree/Certificate"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  />
                  <Input
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  />
                  {education.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addEducation} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certifications
            </Label>
            {certifications.map((cert, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Certification name"
                    value={cert.name}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Year obtained"
                    value={cert.year}
                    onChange={(e) => updateCertification(index, 'year', e.target.value)}
                  />
                  <Input
                    placeholder="Link/URL (optional)"
                    value={cert.link}
                    onChange={(e) => updateCertification(index, 'link', e.target.value)}
                  />
                  {certifications.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCertification(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addCertification} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Personal Website
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourwebsite.com"
              value={formData.website ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleComplete}
        size="lg"
        className="mt-6 w-full bg-blue-600 py-6 text-lg text-white hover:bg-blue-500"
        disabled={loading || !formData.occupation}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Completing Profile...
          </>
        ) : (
          'Complete Profile'
        )}
      </Button>
    </motion.div>
  );
}

// ── Main Onboarding Component ──────────────────────────────────────────────────

export default function FreelanceOnboarding() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});

  const totalScreens = 5;
  const progress = (currentScreen / totalScreens) * 100;

  const handleComplete = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 rounded-xl border border-blue-100 bg-white/85 p-4 shadow-sm dark:border-blue-900/50 dark:bg-slate-950/75">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Step {currentScreen} of {totalScreens}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <IntroductionScreen key="intro" onNext={() => setCurrentScreen(2)} />
          )}
          {currentScreen === 2 && (
            <SuccessProfileScreen key="success" onNext={() => setCurrentScreen(3)} />
          )}
          {currentScreen === 3 && (
            <WarningScreen key="warning" onNext={() => setCurrentScreen(4)} />
          )}
          {currentScreen === 4 && (
            <PersonalInfoScreen
              key="personal"
              onNext={() => setCurrentScreen(5)}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentScreen === 5 && (
            <ProfessionalProfileScreen
              key="professional"
              formData={formData}
              setFormData={setFormData}
              onComplete={handleComplete}
            />
          )}
        </AnimatePresence>

        {currentScreen > 1 && currentScreen < totalScreens && (
          <Button
            variant="outline"
            onClick={() => setCurrentScreen(prev => prev - 1)}
            className="mt-4 border-blue-200 text-slate-700 hover:bg-blue-50 dark:border-blue-900/50 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
