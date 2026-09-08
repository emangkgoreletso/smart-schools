import React, { useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  consentGiven: boolean;
  toggleConsent: () => void;
};

const DataProtectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  consentGiven,
  toggleConsent,
}) => {
  const [hasRead, setHasRead] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasRead(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    // Check if user scrolled to the bottom
    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      setHasRead(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-xl p-6">
        <h2 className="text-xl font-bold mb-4">Data Protection Act</h2>

        {/* Scrollable Act Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="h-56 overflow-y-scroll border border-gray-200 p-4 rounded-lg mb-4"
        >
          <p className="text-sm text-gray-700 mb-3">
            <strong>Data Protection Act (Sample)</strong>
            <br />
            This Act ensures that personal data is processed fairly and lawfully...
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong>1. Collection of Data</strong>
            <br />
            We collect data only for educational purposes...
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong>2. Use of Data</strong>
            <br />
            Your data is used to support school operations...
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong>3. Storage</strong>
            <br />
            Data is stored securely with limited access...
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong>4. Rights</strong>
            <br />
            You have the right to access, correct, and delete your data...
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong>5. Consent</strong>
            <br />
            By agreeing, you permit us to process your data...
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <strong>End of Act</strong>
            <br />
            Thank you for reading.
          </p>
        </div>

        {/* Consent */}
        <div className="flex gap-2 items-center mb-4">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={toggleConsent}
            disabled={!hasRead}   // ❗ disabled until read
          />
          <span className="text-sm">
            I have read and agree to the Data Protection Act.
          </span>
        </div>

        {!hasRead && (
          <p className="text-xs text-red-600 mb-4">
            Please scroll to the end to enable consent.
          </p>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-300"
          >
            Close
          </button>

          <a
            href="/data-protection-act.pdf"
            download
            className="px-4 py-2 rounded-full bg-maroon-700 text-white"
          >
            Download Act
          </a>
        </div>
      </div>
    </div>
  );
};

export default DataProtectionModal;
