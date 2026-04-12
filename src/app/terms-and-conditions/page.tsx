export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-[#34D399] mb-4">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: April 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p>
              Welcome to <span className="font-semibold">Jobflix.in</span>. By accessing or using our platform, 
              including all subdomains and services such as ResumeAssist, you agree to be bound by these Terms & Conditions.
              If you do not agree, you must not use our services.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Definitions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Service:</strong> Jobflix platform and tools</li>
              <li><strong>User:</strong> Anyone accessing or using the platform</li>
              <li><strong>Account:</strong> Registered user profile</li>
              <li><strong>Content:</strong> Any data, resume, or material submitted</li>
              <li><strong>Third-party:</strong> External APIs and providers</li>
            </ul>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Eligibility</h2>
            <p>
              You must be at least 18 years old or have parental consent to use our services.
              By using Jobflix, you confirm that you meet this requirement.
            </p>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account. You must provide accurate information.
            </p>
          </section>

          {/* ResumeAssist */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">AI Services (ResumeAssist)</h2>
            <p>
              Jobflix provides AI-powered resume generation through ResumeAssist. This feature may use:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Azure Foundry</li>
              <li>NVIDIA APIs</li>
              <li>Google Gemini API</li>
              <li>OpenAI API</li>
            </ul>

            <p className="mt-3">
              You acknowledge that AI-generated content may not always be accurate, complete, or suitable 
              for your specific needs. You are solely responsible for reviewing and verifying generated resumes.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Prohibited Conduct</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Violating any laws or regulations</li>
              <li>Submitting false or misleading information</li>
              <li>Attempting to hack, disrupt, or misuse the platform</li>
              <li>Uploading harmful, abusive, or illegal content</li>
              <li>Scraping or reverse engineering the platform</li>
            </ul>
          </section>

          {/* Data */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Privacy & Data</h2>
            <p>
              Your use of Jobflix is also governed by our Privacy Policy. By using our services, 
              you consent to the collection and processing of your data, including sharing with 
              third-party AI providers for resume generation.
            </p>
          </section>

          {/* IP */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
            <p>
              All platform content, branding, and software are the property of Jobflix.in.
              You may not copy, modify, distribute, or reverse engineer any part of the service.
            </p>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Service Availability</h2>
            <p>
              We may modify, suspend, or discontinue any part of the service at any time 
              without prior notice. We are not liable for any interruption.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
            <p>
              Jobflix.in shall not be liable for any direct, indirect, incidental, or consequential 
              damages resulting from your use of the platform or reliance on AI-generated content.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these terms.
            </p>
          </section>

          {/* Subdomains */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Subdomains</h2>
            <p>
              These Terms apply to Jobflix.in and all associated subdomains. Certain features may 
              have additional conditions specific to those services.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the platform means you accept the updated Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p>
              For any questions, contact us at:
              <span className="text-[#34D399] font-medium ml-2">
                support@jobflix.in
              </span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}