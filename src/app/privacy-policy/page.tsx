import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-6">
        <Navbar />
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 mt-12">
        
        <h1 className="text-4xl font-bold mb-4 text-[#34D399]">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: April 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          {/* Intro */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p>
              Welcome to <span className="font-semibold">Jobflix.in</span>. 
              Your privacy is critically important to us. This Privacy Policy 
              explains how we collect, use, and safeguard your information when 
              you use our platform and services, including ResumeAssist.
            </p>

            <p className="font-bold mt-8 text-lg">Scope of Policy</p>
            <p>
                This Privacy Policy applies to Jobflix.in and all its subdomains, 
                including but not limited to app.jobflix.in, resume.jobflix.in, 
                and any other services operated under the Jobflix platform.

                Different subdomains may provide additional features or services. 
                In such cases, additional privacy disclosures may be provided 
                specific to those services.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Definitions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Service:</strong> Jobflix platform and ResumeAssist tools</li>
              <li><strong>Personal Data:</strong> Any information that identifies you</li>
              <li><strong>Processing:</strong> Any operation performed on your data</li>
              <li><strong>Third-party:</strong> External APIs and service providers</li>
            </ul>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Data We Collect</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Personal info (name, email, contact details)</li>
              <li>Professional info (skills, experience, education, resumes)</li>
              <li>Usage data (IP address, browser, device info)</li>
              <li>Cookies and tracking data</li>
            </ul>
          </section>

          {/* ResumeAssist */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">ResumeAssist & AI Processing</h2>
            <p>
              Our ResumeAssist feature generates resumes using AI technologies. 
              To provide this functionality, your data may be securely processed 
              through third-party APIs including:
            </p>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Azure Foundry services</li>
              <li>NVIDIA APIs</li>
              <li>Google Gemini API</li>
              <li>OpenAI API</li>
            </ul>

            <p className="mt-3">
              By using this feature, you explicitly consent to your data being 
              processed and transmitted to these services solely for resume generation.
            </p>
          </section>

          {/* Storage */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Data Storage</h2>
            <p>
              All collected data is stored securely using MongoDB databases. 
              We implement encryption, access controls, and industry-standard 
              safeguards to protect your information.
            </p>
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">How We Use Your Data</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Generate resumes and career insights</li>
              <li>Improve platform performance</li>
              <li>Personalize user experience</li>
              <li>Detect fraud and ensure security</li>
              <li>Communicate updates and support</li>
            </ul>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Data Sharing</h2>
            <p>We do not sell your personal data. However, we may share data with:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>AI service providers (for ResumeAssist)</li>
              <li>Cloud/database providers</li>
              <li>Legal authorities if required</li>
            </ul>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Security</h2>
            <p>
              We use secure infrastructure, encrypted communication, and restricted 
              access controls. However, no system is completely secure, and we cannot 
              guarantee absolute protection.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
            <p>
              Jobflix.in shall not be held liable for any direct, indirect, or 
              incidental damages arising from the use of AI-generated content 
              or platform services.
            </p>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Third-Party Links</h2>
            <p>
              Our platform may contain links to external websites. We are not 
              responsible for their content or privacy practices.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of 
              our platform indicates acceptance of these changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p>
              For any questions or requests, contact us at:
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