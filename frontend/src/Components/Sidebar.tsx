import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

/* ================= CONSENT HELPERS ================= */

const getConsentKey = (userId: string) =>
  `data_protection_consent_${userId}`;

const hasConsented = (userId: string) =>
  localStorage.getItem(getConsentKey(userId)) === "true";

/* ================= COMPONENT ================= */

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showAct, setShowAct] = useState(false);

  /* ================= LOGIN + CONSENT GUARD ================= */

  const requireLogin = (to: string) => {
    if (!user) {
      navigate("/login", { state: { redirectTo: to } });
      return;
    }

    if (!hasConsented(user.id)) {
      setShowAct(true);
      return;
    }

    navigate(to);
  };

  /* ================= STYLES ================= */

  const buttonClass =
    "w-full text-left py-2 px-3 rounded-full border border-maroon-700 text-maroon-700 font-semibold hover:bg-maroon-700 hover:text-white transition";

  return (
    <>
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Portals
        </h3>

        <button
          onClick={() => requireLogin("/student-centre")}
          className={buttonClass}
        >
          Student Centre
        </button>

        <button
          onClick={() => requireLogin("/teachers-portal")}
          className={buttonClass}
        >
          Teachers Portal
        </button>

        <button
          onClick={() => requireLogin("/parents-portal")}
          className={buttonClass}
        >
          Parents Portal
        </button>

        <button
          onClick={() => requireLogin("/payments")}
          className={buttonClass}
        >
          Payments
        </button>

        {/* Always accessible */}
        <Link to="/notice-board" className={buttonClass}>
          Notice Board
        </Link>

        {/* ================= DATA PROTECTION ACT ================= */}

        <div className="pt-3 border-t border-gray-200">
          <button
            onClick={() => setShowAct(true)}
            className={buttonClass}
          >
            Data Protection Act
          </button>
        </div>
      </aside>

      {/* ================= MODAL ================= */}

      {showAct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-maroon-700">
              Data Protection Act
            </h2>

            <div className="h-64 overflow-y-auto border rounded-lg p-4 text-sm text-gray-700">
              <p className="mb-3">
                This system processes personal and sensitive information
                in accordance with the Data Protection Act.
              </p>
              <p className="mb-3">
                By continuing to use this platform, you acknowledge that:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your data is collected for legitimate educational purposes</li>
                <li>Your information is securely stored and protected</li>
                <li>Access is role-based and audited</li>
                <li>You may request data access or removal where applicable</li>
              </ul>
              <p className="mt-3">
                Please read the full Act carefully before giving consent.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <a
                href="/documents/Data-Protection-Act.pdf"
                download
                className="text-maroon-700 underline font-medium"
              >
                Download Full Act (PDF)
              </a>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAct(false)}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  Close
                </button>

                {user && (
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        getConsentKey(user.id),
                        "true"
                      );
                      setShowAct(false);
                    }}
                    className="px-4 py-2 rounded-full bg-maroon-700 text-white font-semibold hover:bg-maroon-800"
                  >
                    I Agree
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
