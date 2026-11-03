import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Shield,
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  ArrowLeft,
  Trash2,
  Search,
  MessageCircle,
  Download,
  Plus,
  FolderOpen,
  Lock,
} from 'lucide-react';

const INITIAL_SUBMISSIONS = [
  {
    id: 'QM-8492',
    customerName: 'Ramesh Pai',
    customerPhone: '9845211223',
    customerEmail: 'rameshpai.udupi@gmail.com',
    pan: 'ABCDE1234F',
    service: 'Income Tax Return (ITR)',
    period: 'FY 2025-26',
    files: [
      { name: 'Form16_PartA_B_2026.pdf', size: '420 KB' },
      { name: 'HDFC_Bank_Statement_FY25_26.pdf', size: '1.2 MB' },
    ],
    notes: 'Salaried return + housing loan interest certificate attached.',
    status: 'Completed',
    officeNote: 'ITR-1 filed & e-Verified. Ack #48291049218 sent on WhatsApp.',
    createdAt: '28 Oct 2026, 11:20 AM',
  },
  {
    id: 'QM-8504',
    customerName: 'Karavali Hardware & Traders',
    customerPhone: '9448122334',
    customerEmail: 'accounts@karavalitraders.in',
    pan: 'AAFCK9921L',
    service: 'TDS Filing (24Q / 26Q)',
    period: 'Q2 FY 2026-27',
    files: [
      { name: 'Q2_26Q_Deductee_Sheet.xlsx', size: '185 KB' },
      { name: 'Challan_CSI_Receipt.pdf', size: '94 KB' },
    ],
    notes: 'Please reconcile with 26AS and generate Form 16A.',
    status: 'In Progress',
    officeNote: 'Challan matched on TRACES. FVU generation in progress.',
    createdAt: '29 Oct 2026, 02:45 PM',
  },
  {
    id: 'QM-8519',
    customerName: 'Dr. Ashwini Shetty',
    customerPhone: '9900144556',
    customerEmail: 'ashwinishetty.clinic@gmail.com',
    pan: 'BHGPS4412K',
    service: 'Class 3 Digital Signature (DSC)',
    period: '2 Years Validity',
    files: [
      { name: 'PAN_Card_Scan.pdf', size: '310 KB' },
      { name: 'Aadhaar_eKYC_Offline.zip', size: '150 KB' },
      { name: 'Passport_Photo.jpg', size: '210 KB' },
    ],
    notes: 'Need Individual Class 3 Signing DSC token for Income Tax & MCA.',
    status: 'Pending Review',
    officeNote: 'Documents received. Video verification link being sent.',
    createdAt: '29 Oct 2026, 05:10 PM',
  },
];

const SERVICE_CATEGORIES = [
  'Income Tax Return (ITR)',
  'TDS Filing (24Q / 26Q)',
  'Class 3 Digital Signature (DSC)',
  'PAN Card Application / Correction',
  'TallyPrime Data / Support',
  'BUSY Accounting Data / Support',
];

const PERIOD_OPTIONS = [
  'FY 2026-27',
  'FY 2025-26',
  'Q1 / Q2 / Q3 / Q4 TDS',
  '1 / 2 / 3 Years DSC Validity',
  'General / Current Period',
];

export default function PortalView({ initialRole = 'customer', onBackToHome }) {
  // 'customer' | 'admin'
  const [roleTab, setRoleTab] = useState(initialRole);
  const [isRegistering, setIsRegistering] = useState(false);

  // Logged-in session state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('qm_portal_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Submissions database in localStorage
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('qm_portal_submissions');
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('qm_portal_submissions', JSON.stringify(submissions));
    } catch {
      // Ignore storage limits
    }
  }, [submissions]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('qm_portal_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('qm_portal_session');
      }
    } catch {
      // Ignore
    }
  }, [currentUser]);

  // Login Form States
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    name: '',
    pan: '',
  });
  const [authError, setAuthError] = useState('');

  // Customer Upload Form States
  const [uploadService, setUploadService] = useState(SERVICE_CATEGORIES[0]);
  const [uploadPeriod, setUploadPeriod] = useState(PERIOD_OPTIONS[0]);
  const [uploadNotes, setUploadNotes] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Admin Filter States
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login / Registration
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (roleTab === 'admin') {
      if (
        (loginForm.identifier.toLowerCase() === 'admin' ||
          loginForm.identifier.toLowerCase() === 'admin@qualitymedia.com' ||
          loginForm.identifier.toLowerCase() === 'qualitymediaudupi@gmail.com') &&
        loginForm.password === 'admin123'
      ) {
        setCurrentUser({
          role: 'admin',
          name: 'Quality Media Office Desk',
          email: 'qualitymediaudupi@gmail.com',
        });
      } else {
        setAuthError(
          'Invalid admin credentials. Use admin@qualitymedia.com / admin123'
        );
      }
      return;
    }

    // Customer login or signup
    if (isRegistering) {
      if (!loginForm.name.trim() || !loginForm.identifier.trim()) {
        setAuthError('Please enter your full name and phone/email.');
        return;
      }
      setCurrentUser({
        role: 'customer',
        name: loginForm.name.trim(),
        phone: loginForm.identifier.trim(),
        email: loginForm.identifier.includes('@')
          ? loginForm.identifier.trim()
          : `${loginForm.identifier.trim()}@client.qm`,
        pan: (loginForm.pan || 'ABCDE1234F').toUpperCase(),
      });
    } else {
      // Match existing customer or create quick customer session
      const id = loginForm.identifier.trim();
      if (!id) {
        setAuthError('Please enter your phone number or email.');
        return;
      }
      const matched = submissions.find(
        (s) =>
          s.customerPhone === id ||
          s.customerEmail.toLowerCase() === id.toLowerCase()
      );
      setCurrentUser({
        role: 'customer',
        name: matched ? matched.customerName : 'Ramesh Pai',
        phone: matched ? matched.customerPhone : id,
        email: matched ? matched.customerEmail : id,
        pan: matched ? matched.pan : 'ABCDE1234F',
      });
    }
  };

  const handleQuickDemoLogin = (type) => {
    setAuthError('');
    if (type === 'admin') {
      setCurrentUser({
        role: 'admin',
        name: 'Quality Media Office Desk',
        email: 'qualitymediaudupi@gmail.com',
      });
    } else {
      setCurrentUser({
        role: 'customer',
        name: 'Ramesh Pai',
        phone: '9845211223',
        email: 'rameshpai.udupi@gmail.com',
        pan: 'ABCDE1234F',
      });
    }
  };

  // File Selection Handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      // Read small files as data URL so Admin can download/preview them in-browser
      if (file.size <= 350 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedFiles((prev) => [
            ...prev,
            { name: file.name, size: sizeStr, dataUrl: reader.result },
          ]);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedFiles((prev) => [...prev, { name: file.name, size: sizeStr }]);
      }
    });
    e.target.value = '';
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Submit Customer Upload
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    const newEntry = {
      id: `QM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: currentUser.name,
      customerPhone: currentUser.phone || '9845211223',
      customerEmail: currentUser.email || '',
      pan: currentUser.pan || 'ABCDE1234F',
      service: uploadService,
      period: uploadPeriod,
      files: selectedFiles,
      notes: uploadNotes.trim() || 'Uploaded via Online Customer Portal.',
      status: 'Pending Review',
      officeNote: 'Received at Udupi online desk. Queued for verification.',
      createdAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSubmissions((prev) => [newEntry, ...prev]);
    setSelectedFiles([]);
    setUploadNotes('');
    setUploadSuccess(
      `Reference ${newEntry.id} submitted! Our Udupi office desk has received your documents.`
    );
    setTimeout(() => setUploadSuccess(''), 6000);
  };

  // Admin: Update Status or Office Note
  const updateSubmission = (id, updates) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const statusBadgeStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200';
      case 'In Progress':
        return 'bg-amber-500/20 border-amber-400/40 text-amber-200';
      default:
        return 'bg-white/15 border-white/25 text-white';
    }
  };

  // Filter submissions for current view
  const customerSubmissions = currentUser
    ? submissions.filter(
        (s) =>
          s.customerName.toLowerCase() === currentUser.name.toLowerCase() ||
          s.customerPhone === currentUser.phone
      )
    : [];

  const filteredAdminSubmissions = submissions.filter((s) => {
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      s.customerName.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.service.toLowerCase().includes(q) ||
      s.customerPhone.includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <section className="relative min-h-screen pt-28 pb-24 z-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-2xl glass-pill px-4 py-2.5 text-xs sm:text-sm font-semibold text-white theme-heading hover:bg-white/20 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to website</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-medium text-white/80 theme-subtext">
                Signed in as <strong className="text-white theme-heading">{currentUser.name}</strong> (
                {currentUser.role === 'admin' ? 'Office Admin' : 'Customer'})
              </span>
              <button
                type="button"
                onClick={() => setCurrentUser(null)}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 px-4 py-2 text-xs font-semibold text-white theme-heading transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>

        {/* ==============================================================
            VIEW 1: NOT LOGGED IN -> CUSTOMER / ADMIN LOGIN SCREEN
           ============================================================== */}
        {!currentUser && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Editorial Pitch */}
            <div className="lg:col-span-6 space-y-5">
              <p className="text-sm font-semibold text-white/80 theme-subtext">
                Quality Media.com Pvt Ltd • Digital Desk
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white theme-heading leading-[1.08]">
                Upload your forms from anywhere.
                <br />
                Zero office visits.
              </h1>
              <p className="text-base text-white/80 theme-subtext leading-relaxed max-w-lg">
                Send your Form 16, bank statements, TDS sheets, or KYC docs
                directly to our Udupi desk and track live filing progress online.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('customer')}
                  className="rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-[#1637B8] shadow-sm theme-primary-btn"
                >
                  Instant Demo Customer Login →
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="rounded-2xl glass-pill px-5 py-3 text-xs sm:text-sm font-semibold text-white theme-secondary-btn"
                >
                  Instant Demo Admin Login →
                </button>
              </div>
            </div>

            {/* Right Glassmorphic Login Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[32px] glass-panel p-7 sm:p-10 max-w-lg mx-auto">
                {/* Role Switcher Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl glass-pill mb-7">
                  <button
                    type="button"
                    onClick={() => {
                      setRoleTab('customer');
                      setAuthError('');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition ${
                      roleTab === 'customer'
                        ? 'bg-white text-[#1637B8] shadow-sm theme-primary-btn'
                        : 'text-white/80 hover:text-white theme-subtext'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Customer Portal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRoleTab('admin');
                      setIsRegistering(false);
                      setAuthError('');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-semibold transition ${
                      roleTab === 'admin'
                        ? 'bg-white text-[#1637B8] shadow-sm theme-primary-btn'
                        : 'text-white/80 hover:text-white theme-subtext'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Office Admin</span>
                  </button>
                </div>

                <h2 className="font-display text-2xl font-bold text-white theme-heading">
                  {roleTab === 'admin'
                    ? 'Office Admin Sign In'
                    : isRegistering
                    ? 'Create Customer Account'
                    : 'Customer Sign In'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-white/75 theme-subtext">
                  {roleTab === 'admin'
                    ? 'For Quality Media.com Pvt Ltd staff in Udupi.'
                    : 'Access your remote document vault and filing status.'}
                </p>

                {authError && (
                  <div className="mt-4 rounded-2xl bg-rose-500/20 border border-rose-400/40 px-4 py-3 text-xs text-white">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
                  {roleTab === 'customer' && isRegistering && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                          Full Name / Firm Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={loginForm.name}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, name: e.target.value })
                          }
                          placeholder="e.g., Ramesh Pai"
                          className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                          PAN or GSTIN (Optional)
                        </label>
                        <input
                          type="text"
                          value={loginForm.pan}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, pan: e.target.value })
                          }
                          placeholder="ABCDE1234F"
                          className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm uppercase placeholder-white/40 focus:outline-none focus:border-white"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                      {roleTab === 'admin'
                        ? 'Admin Email / ID *'
                        : 'Mobile Number or Email *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={loginForm.identifier}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, identifier: e.target.value })
                      }
                      placeholder={
                        roleTab === 'admin'
                          ? 'admin@qualitymedia.com'
                          : '9845211223 or email'
                      }
                      className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-white hover:bg-white/95 py-3.5 text-sm font-semibold text-[#1637B8] shadow-md transition theme-primary-btn"
                  >
                    {roleTab === 'admin'
                      ? 'Sign in to Office Desk'
                      : isRegistering
                      ? 'Create Account & Continue'
                      : 'Sign in to Customer Portal'}
                  </button>
                </form>

                {roleTab === 'customer' ? (
                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => setIsRegistering((prev) => !prev)}
                      className="text-xs font-semibold text-white/85 hover:text-white theme-subtext underline"
                    >
                      {isRegistering
                        ? 'Already have an account? Sign in'
                        : 'First time here? Create a customer account'}
                    </button>
                  </div>
                ) : (
                  <p className="mt-4 text-center text-xs text-white/65 theme-muted">
                    Demo Admin: <code className="font-mono">admin@qualitymedia.com</code> /{' '}
                    <code className="font-mono">admin123</code>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            VIEW 2: LOGGED IN AS CUSTOMER -> UPLOAD FORMS & TRACK STATUS
           ============================================================== */}
        {currentUser && currentUser.role === 'customer' && (
          <div className="space-y-8">
            {/* Customer Welcome Banner */}
            <div className="rounded-[32px] glass-panel p-7 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/75 theme-subtext">
                  Customer Portal • PAN: {currentUser.pan || 'ABCDE1234F'}
                </p>
                <h1 className="mt-1 font-display text-2xl sm:text-4xl font-bold text-white theme-heading">
                  Welcome, {currentUser.name}
                </h1>
                <p className="mt-1 text-sm text-white/80 theme-subtext">
                  Upload your tax forms or KYC documents below—our Udupi office
                  will process them remotely and send your acknowledgment here.
                </p>
              </div>

              <a
                href={
                  'https://wa.me/919845242565?text=' +
                  encodeURIComponent(
                    `Hello Quality Media, I am ${currentUser.name} following up on my online portal submission.`
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-[#1637B8] theme-primary-btn"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Support</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: Direct Form & File Upload Card */}
              <div className="lg:col-span-5 rounded-[32px] glass-panel p-7 sm:p-8">
                <h2 className="font-display text-xl font-bold text-white theme-heading">
                  Upload New Forms / Documents
                </h2>
                <p className="mt-1 text-xs text-white/75 theme-subtext">
                  PDF, Excel, JPG, PNG or ZIP (Form 16, Bank Statements, 26Q, Aadhaar/PAN).
                </p>

                {uploadSuccess && (
                  <div className="mt-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-4 text-xs text-white flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span>{uploadSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleUploadSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                      Select Service *
                    </label>
                    <select
                      value={uploadService}
                      onChange={(e) => setUploadService(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white"
                    >
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          className="bg-[#0B1536] text-white"
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                      Financial Year / Validity *
                    </label>
                    <select
                      value={uploadPeriod}
                      onChange={(e) => setUploadPeriod(e.target.value)}
                      className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white"
                    >
                      {PERIOD_OPTIONS.map((p) => (
                        <option
                          key={p}
                          value={p}
                          className="bg-[#0B1536] text-white"
                        >
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropzone / File Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                      Attach Forms / Files *
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-2xl border-2 border-dashed border-white/30 hover:border-white/60 glass-pill p-6 text-center transition"
                    >
                      <UploadCloud className="mx-auto h-8 w-8 text-white theme-heading" />
                      <p className="mt-2 text-xs sm:text-sm font-semibold text-white theme-heading">
                        Click to choose files from your device
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/65 theme-muted">
                        Form 16, Bank Statements, Challans, PAN, Aadhaar, Tally/BUSY Zip
                      </p>
                    </button>

                    {/* Selected File Pills */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {selectedFiles.map((f, idx) => (
                          <div
                            key={`${f.name}-${idx}`}
                            className="flex items-center justify-between rounded-xl glass-pill px-3.5 py-2 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="h-4 w-4 shrink-0 text-white theme-heading" />
                              <span className="truncate font-medium text-white theme-heading">
                                {f.name}
                              </span>
                              <span className="text-white/60 theme-muted">
                                ({f.size})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSelectedFile(idx)}
                              className="text-white/60 hover:text-white ml-2"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1.5">
                      Notes / Instructions for Office
                    </label>
                    <textarea
                      rows={2}
                      value={uploadNotes}
                      onChange={(e) => setUploadNotes(e.target.value)}
                      placeholder="Any specific notes or deductions to claim..."
                      className="w-full rounded-2xl border border-white/20 px-4 py-2.5 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={selectedFiles.length === 0}
                    className="w-full rounded-2xl bg-white disabled:opacity-50 py-3.5 text-sm font-semibold text-[#1637B8] shadow-md transition theme-primary-btn"
                  >
                    Upload &amp; Send to Office Desk
                  </button>
                </form>
              </div>

              {/* RIGHT: Customer's Uploaded Submissions & Status History */}
              <div className="lg:col-span-7 rounded-[32px] glass-panel p-7 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white theme-heading">
                      Your Uploaded Forms &amp; Status
                    </h2>
                    <p className="text-xs text-white/75 theme-subtext">
                      Real-time updates from Quality Media.com Pvt Ltd.
                    </p>
                  </div>
                  <span className="rounded-full glass-pill px-3 py-1 text-xs font-semibold text-white theme-heading">
                    {customerSubmissions.length} Submissions
                  </span>
                </div>

                {customerSubmissions.length === 0 ? (
                  <div className="rounded-3xl glass-pill p-10 text-center">
                    <FolderOpen className="mx-auto h-8 w-8 text-white/60" />
                    <p className="mt-3 text-sm font-semibold text-white theme-heading">
                      No documents uploaded yet
                    </p>
                    <p className="mt-1 text-xs text-white/70 theme-subtext">
                      Use the form on the left to send your first document to our office.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="rounded-3xl glass-pill p-5 sm:p-6 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-mono text-xs font-semibold text-white/70 theme-muted">
                              {sub.id} • {sub.createdAt}
                            </span>
                            <h3 className="font-display text-lg font-bold text-white theme-heading">
                              {sub.service}{' '}
                              <span className="text-xs font-normal text-white/75 theme-subtext">
                                ({sub.period})
                              </span>
                            </h3>
                          </div>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadgeStyle(
                              sub.status
                            )}`}
                          >
                            {sub.status}
                          </span>
                        </div>

                        {/* Uploaded Files List */}
                        <div className="flex flex-wrap gap-2">
                          {sub.files.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/15 px-3 py-1.5 text-xs text-white theme-heading"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>{f.name}</span>
                              <span className="opacity-60">({f.size})</span>
                            </span>
                          ))}
                        </div>

                        {sub.notes && (
                          <p className="text-xs text-white/80 theme-subtext">
                            <strong>Your note:</strong> {sub.notes}
                          </p>
                        )}

                        {sub.officeNote && (
                          <div className="rounded-2xl bg-white/10 border border-white/15 p-3.5 text-xs text-white theme-heading">
                            <strong>Office Response:</strong> {sub.officeNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            VIEW 3: LOGGED IN AS OFFICE ADMIN -> MANAGE ALL CLIENT UPLOADS
           ============================================================== */}
        {currentUser && currentUser.role === 'admin' && (
          <div className="space-y-8">
            {/* Admin Top Summary */}
            <div className="rounded-[32px] glass-panel p-7 sm:p-9">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-7 border-b border-white/15">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/75 theme-subtext">
                    Udupi Back-Office Admin Console
                  </p>
                  <h1 className="mt-1 font-display text-2xl sm:text-4xl font-bold text-white theme-heading">
                    Customer Document Submissions
                  </h1>
                </div>

                {/* Quick KPI Pills */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl glass-pill px-4 py-3 text-center">
                    <p className="font-display text-2xl font-bold text-white theme-heading">
                      {submissions.length}
                    </p>
                    <p className="text-[11px] text-white/75 theme-subtext">Total</p>
                  </div>
                  <div className="rounded-2xl glass-pill px-4 py-3 text-center">
                    <p className="font-display text-2xl font-bold text-white theme-heading">
                      {
                        submissions.filter((s) => s.status !== 'Completed')
                          .length
                      }
                    </p>
                    <p className="text-[11px] text-white/75 theme-subtext">Open</p>
                  </div>
                  <div className="rounded-2xl glass-pill px-4 py-3 text-center">
                    <p className="font-display text-2xl font-bold text-white theme-heading">
                      {
                        submissions.filter((s) => s.status === 'Completed')
                          .length
                      }
                    </p>
                    <p className="text-[11px] text-white/75 theme-subtext">Filed</p>
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Pending Review', 'In Progress', 'Completed'].map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                          statusFilter === st
                            ? 'bg-white text-[#1637B8] theme-primary-btn'
                            : 'glass-pill text-white/80 hover:text-white theme-secondary-btn'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, phone, ID..."
                    className="w-full rounded-xl border border-white/20 pl-10 pr-4 py-2 text-xs placeholder-white/50 focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* Submissions List for Office Admin */}
            <div className="space-y-4">
              {filteredAdminSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-[28px] glass-panel p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  {/* Client & Files Info */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg glass-pill text-white theme-heading">
                        {sub.id}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white theme-heading">
                        {sub.customerName}
                      </h3>
                      <span className="text-xs text-white/75 theme-subtext">
                        • PAN: {sub.pan} • {sub.customerPhone}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-white/95 theme-heading">
                      {sub.service}{' '}
                      <span className="font-normal text-white/75 theme-subtext">
                        ({sub.period}) • Submitted {sub.createdAt}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {sub.files.map((f, idx) => (
                        <a
                          key={idx}
                          href={f.dataUrl || '#'}
                          download={f.dataUrl ? f.name : undefined}
                          onClick={(e) => {
                            if (!f.dataUrl) {
                              e.preventDefault();
                              alert(
                                `File "${f.name}" (${f.size}) is logged in this submission.`
                              );
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-xl glass-pill hover:bg-white/20 px-3.5 py-2 text-xs font-medium text-white theme-heading transition"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>{f.name}</span>
                          <span className="opacity-65">({f.size})</span>
                        </a>
                      ))}
                    </div>

                    {sub.notes && (
                      <p className="text-xs text-white/80 theme-subtext pt-1">
                        <strong>Customer Note:</strong> {sub.notes}
                      </p>
                    )}
                  </div>

                  {/* Admin Controls: Status Update, Office Remark & WhatsApp */}
                  <div className="lg:col-span-5 space-y-3 lg:border-l lg:border-white/15 lg:pl-6">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-xs font-semibold text-white/80 theme-subtext">
                        Filing Status:
                      </label>
                      <select
                        value={sub.status}
                        onChange={(e) =>
                          updateSubmission(sub.id, { status: e.target.value })
                        }
                        className="rounded-xl border border-white/25 px-3 py-1.5 text-xs font-semibold focus:outline-none"
                      >
                        <option value="Pending Review" className="bg-[#0B1536] text-white">
                          Pending Review
                        </option>
                        <option value="In Progress" className="bg-[#0B1536] text-white">
                          In Progress
                        </option>
                        <option value="Completed" className="bg-[#0B1536] text-white">
                          Completed
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 theme-subtext mb-1">
                        Office Note / Ack # (Visible to Customer):
                      </label>
                      <input
                        type="text"
                        value={sub.officeNote || ''}
                        onChange={(e) =>
                          updateSubmission(sub.id, { officeNote: e.target.value })
                        }
                        placeholder="Add acknowledgment number or remark..."
                        className="w-full rounded-xl border border-white/20 px-3.5 py-2 text-xs placeholder-white/40 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <a
                        href={
                          `https://wa.me/91${sub.customerPhone}?text=` +
                          encodeURIComponent(
                            `Hello ${sub.customerName}, update from Quality Media.com Pvt Ltd (Ref ${sub.id} - ${sub.service}): Status is "${sub.status}". ${sub.officeNote}`
                          )
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[#1637B8] theme-primary-btn"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Notify on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
