
export const SignupLinks = () => (
  <div className="w-full text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
    <p className="leading-relaxed">
      This site is protected by{" "}
      <span className="font-medium text-gray-700">
        Cloudflare Turnstile
      </span>{" "}
      and the{" "}
      <a
        href="https://www.cloudflare.com/privacypolicy/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://www.cloudflare.com/website-terms/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>

    <p className="mt-2">
      By continuing, you agree to our{" "}
      <a
        href="https://jobflix.in/terms-and-conditions/"
        className="text-blue-600 font-semibold hover:underline"
      >
        Terms
      </a>{" "}
      and{" "}
      <a
        href="https://jobflix.in/privacy-policy/"
        className="text-blue-600 font-semibold hover:underline"
      >
        Privacy Policy
      </a>.
    </p>
  </div>
);