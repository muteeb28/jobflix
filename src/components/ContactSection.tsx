"use client";
import React from "react";
import Link from "next/link";
import {
    Mail
} from "lucide-react";
import { IconBrandDiscord, IconBrandGithub, IconBrandLinkedin, IconBrandReddit, IconBrandX } from "@tabler/icons-react";

export const ContactSection = () => {
    return (
        <div className="w-full bg-white text-neutral-900 pt-10 pb-20 md:pt-16 md:pb-24 border-t border-neutral-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Info & Links */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-pixel uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                                Don't hesitate to reach out.
                                <br />
                                We're always here to help.
                            </h2>
                            <p className="text-neutral-500 text-lg leading-relaxed max-w-md font-pixel">
                                Have questions, feedback, or anything to say? Tell us. We usually get back within 1-2 days.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <ContactLink icon={<Mail size={20} />} label="Email us" href="mailto:hello@example.com" />
                            <ContactLink icon={<IconBrandDiscord size={20} />} label="Join Discord (public)" href="#" highlighted />
                            <ContactLink icon={<IconBrandLinkedin size={20} />} label="Follow our LinkedIn page" href="#" />
                            <ContactLink icon={<IconBrandX size={20} />} label="Follow us on X" href="#" />
                            <ContactLink icon={<IconBrandGithub size={20} />} label="Follow us on GitHub" href="#" />
                            <ContactLink icon={<IconBrandReddit size={20} />} label="Join Reddit community" href="#" />
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-neutral-100 p-6 md:p-8 border-2 border-white/5">
                        <form className="flex flex-col gap-6">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                                    * Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    placeholder="WRITE YOUR MESSAGE..."
                                    className="w-full bg-gray-50 border-2 border-neutral-200 p-4 text-neutral-900 placeholder-zinc-600 focus:outline-none focus:border-white/30 resize-none font-pixel"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                                    Contact email (optional)
                                </label>
                                <p className="text-xs text-neutral-400 mb-2">If you'd like a reply, please provide your email address</p>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="JOHN@EXAMPLE.COM"
                                    className="w-full bg-gray-50 border-2 border-neutral-200 p-4 text-neutral-900 placeholder-zinc-600 focus:outline-none focus:border-white/30 font-pixel"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    className="bg-teal-500 text-neutral-900 font-bold px-8 py-3 border-b-4 border-r-4 border-neutral-200 active:border-0 active:translate-y-1 transition-all uppercase"
                                >
                                    Send message
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ContactLink = ({ icon, label, href, highlighted }: { icon: React.ReactNode, label: string, href: string, highlighted?: boolean }) => {
    return (
        <Link
            href={href}
            className={`group flex items-center justify-between p-4 border border-transparent hover:border-white/5 transition-all ${highlighted ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200/20' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}`}
        >
            <div className="flex items-center gap-4">
                <span className={highlighted ? "text-neutral-900" : "text-neutral-400 group-hover:text-teal-600 transition-colors"}>
                    {icon}
                </span>
                <span className="font-medium text-base">{label}</span>
            </div>
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
            </span>
        </Link>
    )
}
