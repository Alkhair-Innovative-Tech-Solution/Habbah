"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import {
  LogOut,
  RefreshCw,
  Mail,
  Users,
  ChevronDown,
  PlusCircle,
  Briefcase,
  FileText,
  Archive,
  Clock,
  Calendar,
  CheckCircle,
  Menu,
  X,
  Trash2,
  Heart,
  XCircle,
  LayoutDashboard,
  Smartphone,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Eye,
  EyeOff,
  Home,
  BookOpen,
  Phone,
  Sparkles,
  GraduationCap
} from "lucide-react";

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-idara-navy via-[#0c1f6d] to-[#03114b]">
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-idara-orange animate-spin duration-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
            <div className="w-8 h-8 bg-idara-orange rounded-full blur-md opacity-50"></div>
          </div>
        </div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}

function AdminContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";
  
  const setActiveTab = (tab: string) => {
    if (tab === 'dashboard') router.push('/admin/dashboard');
    else router.push(`/admin/dashboard?tab=${tab}`);
  };

  const [selectedMessages, setSelectedMessages] = useState<Set<number>>(new Set());
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobResponses, setJobResponses] = useState<any[]>([]);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(false);

  // TOAST SYSTEM STATES
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Helper to show custom toasts
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const [cmsPages, setCmsPages] = useState<any[]>([]);
  const [cmsLoading, setCmsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "cmspages") {
      const fetchCmsPages = async () => {
        setCmsLoading(true);
        try {
          const res = await fetch("/api/pages?limit=20");
          if (res.ok) {
            const data = await res.json();
            setCmsPages(data.docs || []);
          }
        } catch (err) {
          console.error("Failed to fetch CMS pages:", err);
        } finally {
          setCmsLoading(false);
        }
      };
      fetchCmsPages();
    }
  }, [activeTab]);

  const handleDeleteCmsPage = async (pageId: string, pageTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete the page "${pageTitle}"?`)) {
      return;
    }
    
    try {
      const res = await fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        showToast(`Page "${pageTitle}" deleted successfully.`, "success");
        setCmsPages(prev => prev.filter(p => p.id !== pageId));
      } else {
        const data = await res.json();
        showToast(data.errors?.[0]?.message || "Failed to delete page.", "error");
      }
    } catch (err) {
      console.error("Error deleting page:", err);
      showToast("Network error. Failed to delete page.", "error");
    }
  };

  // States for interview and hired candidates
  const [interviewCandidates, setInterviewCandidates] = useState<any[]>([]);
  const [hiredCandidates, setHiredCandidates] = useState<any[]>([]);

  // Candidates list
  const [candidates, setCandidates] = useState<any[]>([]);

  // Volunteers list
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [volunteersLoading, setVolunteersLoading] = useState(false);

  // Volunteer Actions States
  const [isVolModalOpen, setIsVolModalOpen] = useState(false);
  const [selectedVolForAction, setSelectedVolForAction] = useState<any>(null);
  const [volActionDate, setVolActionDate] = useState("");
  const [volActionTime, setVolActionTime] = useState("");
  const [isProcessingVol, setIsProcessingVol] = useState(false);

  // Manual Add Candidate Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    experience: '',
    education: ''
  });

  // Job form state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [jobSubmitting, setJobSubmitting] = useState(false);

  // Flexible fields
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentLevel, setEmploymentLevel] = useState("");
  const [deadlineAt, setDeadlineAt] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");

  // EDIT JOB STATES
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  
  // INTERVIEW SCHEDULER STATES
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<any>(null);
  const [interviewDateAdmin, setInterviewDateAdmin] = useState("");
  const [interviewTimeAdmin, setInterviewTimeAdmin] = useState("");
  const [isSchedulingInterview, setIsSchedulingInterview] = useState(false);

  // Application Segmentation Logic
  const specificJobApps = useMemo(() => {
    return jobResponses.filter(res => res.jobId !== 4);
  }, [jobResponses]);

  const generalInterestApps = useMemo(() => {
    return jobResponses.filter(res => res.jobId === 4);
  }, [jobResponses]);

  // Auth checking and styling override
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.user && (data.user.role === 'ADMIN' || data.user.role === 'SUPER_ADMIN')) {
            setLoggedIn(true);
            setUserRole(data.user.role || "");
            setUserEmail(data.user.email || "");
          } else {
            // No valid session or wrong role — send to login
            router.replace("/admin");
          }
        } else {
          router.replace("/admin");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        router.replace("/admin");
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();

    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, [router]);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;

    try {
      showToast("Logging out...", "info");
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        showToast("Logged out successfully!", "success");
        window.location.href = "/admin";
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoggedIn(false);
      setMessages([]);
      setSidebarOpen(false);
    }
  };

  // Idle Timer (5 Minutes Auto Logout)
  useEffect(() => {
    if (!loggedIn) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const TIMEOUT_DURATION = 5 * 60 * 1000;
    
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLogout();
      }, TIMEOUT_DURATION);
    };
    
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => { resetTimer(); };
    events.forEach(event => { document.addEventListener(event, handleActivity); });
    resetTimer();
    
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => { document.removeEventListener(event, handleActivity); });
    };
  }, [loggedIn]);

  const loadJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to load jobs");
        return;
      }
      setJobs(data.jobs || []);
    } catch (err: any) {
      setError(String(err));
    }
  };

  const loadAuditLogs = async () => {
    setAuditLoading(true);
    try {
      const res = await fetch("/api/admin/audit-logs");
      const data = await res.json();
      if (res.ok) {
        setAuditLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Error loading audit logs:", err);
    } finally {
      setAuditLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages(data.messages || data || []);
      } else {
        console.error('Failed to load messages:', data.error);
        setMessages([]);
      }
    } catch (err: any) {
      console.error('Error loading messages:', err);
      setMessages([]);
    }
  };

  const loadCandidates = async () => {
    try {
      const response = await fetch('/api/candidates');
      const data = await response.json();
      setCandidates(data.candidates || data || []);
    } catch (error) {
      console.error('Error loading candidates:', error);
      setCandidates([]);
    }
  };

  const loadVolunteers = async () => {
    setVolunteersLoading(true);
    try {
      const response = await fetch('/api/volunteers');
      const data = await response.json();
      setVolunteers(data.volunteers || []);
    } catch (error) {
      console.error('Error loading volunteers:', error);
      setVolunteers([]);
    } finally {
      setVolunteersLoading(false);
    }
  };

  const loadJobResponses = async () => {
    setResponsesLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/job-responses", {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Please login as admin first');
        }
        throw new Error(data?.error || `HTTP error! status: ${res.status}`);
      }
      setJobResponses(data.applications || []);
    } catch (err: any) {
      console.error('Error loading job responses:', err);
      setError(`Failed to load job responses: ${err.message}`);
      setJobResponses([]);
    } finally {
      setResponsesLoading(false);
    }
  };

  const loadInterviewCandidates = async () => {
    try {
      const res = await fetch("/api/admin/interview-candidates");
      const data = await res.json();
      if (res.ok) {
        setInterviewCandidates(data.candidates || []);
      }
    } catch (err) {
      console.error('Error loading interview candidates:', err);
    }
  };

  const loadHiredCandidates = async () => {
    try {
      const res = await fetch("/api/admin/hired-candidates");
      const data = await res.json();
      if (res.ok) {
        setHiredCandidates(data.candidates || []);
      }
    } catch (err) {
      console.error('Error loading hired candidates:', err);
    }
  };

  // Load data when logged in
  useEffect(() => {
    if (loggedIn) {
      loadMessages();
      loadJobs();
      loadJobResponses();
      loadInterviewCandidates();
      loadHiredCandidates();
      loadCandidates();
      loadVolunteers();
      if (userRole === "SUPER_ADMIN") {
        loadAuditLogs();
      }
    }
  }, [loggedIn, userRole]);

  const deleteVolunteer = async (id: number) => {
    if (!confirm('Are you sure you want to delete this volunteer application?')) return;
    try {
      const res = await fetch(`/api/volunteers?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Volunteer deleted successfully', 'success');
        loadVolunteers();
      }
    } catch (err) {
      showToast('Error deleting volunteer', 'error');
    }
  };

  const handleVolunteerResponse = async (id: number, action: string, date?: string, time?: string) => {
    setIsProcessingVol(true);
    try {
      const response = await fetch('/api/admin/volunteers/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, date, time }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast(`Volunteer ${action.toLowerCase()}ed successfully!`, 'success');
        setIsVolModalOpen(false);
        setVolActionDate("");
        setVolActionTime("");
        loadVolunteers();
      } else {
        showToast(data.error || 'Failed to process volunteer action', 'error');
      }
    } catch (err) {
      showToast('Error processing response', 'error');
    } finally {
      setIsProcessingVol(false);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.email || !newCandidate.position) {
      alert('Please fill all required fields (Name, Email, Position)');
      return;
    }

    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCandidate),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Candidate added successfully!');
        setNewCandidate({
          name: '', email: '', position: '', phone: '', experience: '', education: ''
        });
        setShowAddForm(false);
        loadCandidates();
      } else {
        alert('Failed to add candidate: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error adding candidate');
      console.error('Error:', error);
    }
  };

  const deleteCandidate = async (candidateId: number) => {
    if (!confirm('Are you sure you want to delete this candidate?')) return;
    try {
      const response = await fetch(`/api/candidates?id=${candidateId}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok) {
        alert('Candidate deleted successfully!');
        loadCandidates();
      } else {
        alert('Failed to delete candidate: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error deleting candidate');
      console.error('Error:', error);
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to delete job');
        return;
      }
      alert('Job deleted successfully');
      loadJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Error deleting job');
    }
  };

  const handleRestoreJob = async (jobId: number) => {
    if (!confirm("Are you sure you want to restore this job?")) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: false }),
        credentials: "include"
      });
      if (res.ok) {
        alert("Job restored successfully!");
        loadJobs();
      } else {
        const data = await res.json();
        alert("Failed to restore job: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error restoring job:", err);
      alert("Error restoring job");
    }
  };

  const restoreCandidate = async (candidateId: number) => {
    if (!confirm("Are you sure you want to restore this candidate?")) return;
    try {
      const response = await fetch(`/api/candidates?id=${candidateId}`, { method: "PATCH" });
      if (response.ok) {
        alert("Candidate restored successfully!");
        loadCandidates();
      } else {
        const data = await response.json();
        alert("Failed to restore candidate: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error restoring candidate:", error);
      alert("Error restoring candidate");
    }
  };

  const restoreVolunteer = async (id: number) => {
    if (!confirm("Are you sure you want to restore this volunteer application?")) return;
    try {
      const res = await fetch(`/api/volunteers?id=${id}`, { method: "PATCH" });
      if (res.ok) {
        showToast("Volunteer restored successfully", "success");
        loadVolunteers();
      } else {
        showToast("Error restoring volunteer", "error");
      }
    } catch (err) {
      showToast("Error restoring volunteer", "error");
    }
  };

  const handleEditJobClick = (job: any) => {
    setIsEditingJob(true);
    setEditingJobId(job.id);
    setJobTitle(job.title || "");
    setJobDesc(job.description || "");
    setJobLocation(job.location || "");
    
    const reverseTypeMap: Record<string, string> = {
      "FULL_TIME": "Full-Time",
      "PART_TIME": "Part-Time",
      "INTERNSHIP": "Internship",
      "CONTRACT": "Contract",
    };
    setJobType(reverseTypeMap[job.jobType] || "Full-Time");
    
    setCategory(job.category || "");
    setDepartment(job.department || "");
    setEmploymentLevel(job.employmentLevel || "");
    setDeadlineAt(job.deadlineAt ? new Date(job.deadlineAt).toISOString().split('T')[0] : "");
    setRequirements(job.requirements || "");
    setResponsibilities(job.responsibilities || "");
    setQualifications(job.qualifications || "");
    
    setActiveTab("addjob");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scheduleInterview = async (candidateId: number, candidateName: string, candidateEmail: string, position: string) => {
    const interviewDate = prompt('Enter interview date (YYYY-MM-DD):');
    if (!interviewDate) return;
    const interviewTime = prompt('Enter interview time (e.g., 02:30 PM):');
    if (!interviewTime) return;

    const confirmed = confirm(`Send interview email to ${candidateName}?\nDate: ${interviewDate}\nTime: ${interviewTime}`);
    if (!confirmed) return;

    try {
      const response = await fetch('/api/send-interview-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          candidateName,
          candidateEmail,
          interviewDate,
          interviewTime,
          position
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Interview email sent successfully!');
        loadCandidates();
      } else {
        alert('Failed to send email: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error sending interview email');
      console.error('Error:', error);
    }
  };

  const getRecentJobs = () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return jobs.filter(job => new Date(job.createdAt) >= twoDaysAgo);
  };

  const getOldJobs = () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return jobs.filter(job => new Date(job.createdAt) < twoDaysAgo);
  };

  const markForInterview = (application: any) => {
    setSelectedAppForInterview(application);
    setIsInterviewModalOpen(true);
    setInterviewDateAdmin("");
    setInterviewTimeAdmin("");
  };

  const confirmScheduleInterview = async () => {
    if (!selectedAppForInterview || !interviewDateAdmin || !interviewTimeAdmin) {
      alert("Please enter both Date and Time");
      return;
    }

    setIsSchedulingInterview(true);
    try {
      await fetch("/api/admin/mark-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: selectedAppForInterview.id,
          candidateName: selectedAppForInterview.applicantName,
          candidateEmail: selectedAppForInterview.applicantEmail,
          jobTitle: selectedAppForInterview.job?.title || selectedAppForInterview.position,
          jobId: selectedAppForInterview.jobId || 0,
          interviewDate: interviewDateAdmin,
          interviewTime: interviewTimeAdmin
        })
      });

      const emailRes = await fetch('/api/send-interview-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedAppForInterview.id,
          candidateId: selectedAppForInterview.id,
          candidateName: selectedAppForInterview.applicantName || selectedAppForInterview.name,
          candidateEmail: selectedAppForInterview.applicantEmail || selectedAppForInterview.email,
          interviewDate: interviewDateAdmin,
          interviewTime: interviewTimeAdmin,
          position: selectedAppForInterview.job?.title || selectedAppForInterview.position
        }),
      });

      if (emailRes.ok) {
        showToast("Interview scheduled and email sent!", "success");
        setIsInterviewModalOpen(false);
        loadInterviewCandidates();
        loadJobResponses();
        loadCandidates();
      } else {
        const errorData = await emailRes.json();
        alert(`Success in DB but email failed: ${errorData.error || "Please check SMTP settings."}`);
      }
    } catch (err) {
      console.error('Interview error:', err);
      alert('Failed to process interview request');
    } finally {
      setIsSchedulingInterview(false);
    }
  };

  const markAsHired = async (candidate: any) => {
    try {
      const res = await fetch("/api/admin/mark-hired", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidate.id,
          candidateName: candidate.applicantName || candidate.candidateName,
          candidateEmail: candidate.applicantEmail || candidate.candidateEmail,
          jobTitle: candidate.job?.title || candidate.jobTitle,
          jobId: candidate.jobId,
          applicationId: candidate.applicationId || candidate.id
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Candidate marked as hired!');
        loadHiredCandidates();
        loadInterviewCandidates();
        loadJobResponses();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Hired error:', err);
      alert('Failed to mark as hired');
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setJobSubmitting(true);
    try {
      const typeMap: Record<string, string> = {
        "Full-Time": "FULL_TIME",
        "Part-Time": "PART_TIME",
        "Internship": "INTERNSHIP",
        "Contract": "CONTRACT",
      };

      const payload = {
        title: jobTitle,
        description: jobDesc,
        location: jobLocation,
        jobType: typeMap[jobType] || "FULL_TIME",
        category: category || undefined,
        department: department || undefined,
        employmentLevel: employmentLevel || undefined,
        deadlineAt: deadlineAt || undefined,
        requirements: requirements || undefined,
        responsibilities: responsibilities || undefined,
        qualifications: qualifications || undefined,
      };

      const res = await fetch(isEditingJob ? `/api/jobs/${editingJobId}` : "/api/jobs", {
        method: isEditingJob ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || `Failed to ${isEditingJob ? 'update' : 'create'} job`);
        return;
      }
      
      setJobTitle("");
      setJobDesc("");
      setJobLocation("");
      setJobType("Full-Time");
      setCategory("");
      setDepartment("");
      setEmploymentLevel("");
      setDeadlineAt("");
      setRequirements("");
      setResponsibilities("");
      setQualifications("");
      
      setIsEditingJob(false);
      setEditingJobId(null);
      
      showToast(`Job ${isEditingJob ? 'updated' : 'created'} successfully`, "success");
      await loadJobs();
      setActiveTab("recentjobs");
    } catch (err: any) {
      setError(String(err));
    } finally {
      setJobSubmitting(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (authChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-idara-navy via-[#0c1f6d] to-[#03114b]">
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-idara-orange animate-spin duration-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
            <div className="w-8 h-8 bg-idara-orange rounded-full blur-md opacity-50"></div>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-white text-xl font-bold tracking-widest uppercase opacity-90">Verifying Access</h3>
            <div className="flex justify-center gap-1 mt-2">
              <span className="w-1.5 h-1.5 bg-idara-orange rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-idara-orange rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-idara-orange rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loggedIn) {
    return (
      <div className="flex flex-col lg:flex-row h-screen bg-[#f9fafc] overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 text-idara-navy"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="font-black text-idara-navy tracking-tight">Admin Portal</h1>
          <div className="w-8"></div>
        </div>

        {/* TOAST NOTIFICATIONS */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`
                pointer-events-auto
                flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl
                animate-in slide-in-from-right fade-in duration-300
                backdrop-blur-md border
                ${toast.type === 'success' ? 'bg-white/90 border-emerald-100 text-emerald-800' : 
                  toast.type === 'error' ? 'bg-white/90 border-rose-100 text-rose-800' : 
                  'bg-white/90 border-blue-100 text-blue-800'}
              `}
              style={{ minWidth: '320px' }}
            >
              <div className={`p-2 rounded-xl ${
                toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                toast.type === 'error' ? 'bg-rose-50 text-rose-600' : 
                'bg-blue-50 text-blue-600'
              }`}>
                {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {toast.type === 'error' && <XCircle className="w-5 h-5" />}
                {toast.type === 'info' && <RefreshCw className="w-5 h-5 animate-spin" />}
              </div>
              <div className="flex-1 text-sm font-semibold tracking-tight">
                {toast.message}
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 opacity-40 hover:opacity-100" />
              </button>
            </div>
          ))}
        </div>

        {/* PREMIUM INTERVIEW MODAL */}
        {isInterviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-idara-navy/40 backdrop-blur-xl transition-all duration-500" onClick={() => !isSchedulingInterview && setIsInterviewModalOpen(false)}></div>
            <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative z-10 animate-in zoom-in-95 duration-500 border border-white/20">
              <div className="bg-linear-to-br from-idara-navy to-[#0a1a5a] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-idara-orange/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse"></div>
                <h3 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-idara-orange" />
                  Schedule Meet
                </h3>
                <p className="text-sm md:text-base text-idara-orange font-black uppercase tracking-[0.2em] opacity-80">
                  Career Portal • {selectedAppForInterview?.job?.title || selectedAppForInterview?.position}
                </p>
              </div>
              
              <div className="p-10 space-y-8 bg-linear-to-b from-white to-gray-50/30">
                <div className="flex items-center gap-5 p-5 bg-gray-50/50 rounded-4xl border border-gray-100 shadow-inner">
                  <div className="w-14 h-14 bg-idara-navy text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-idara-navy/10">
                    {(selectedAppForInterview?.applicantName || selectedAppForInterview?.name || "?").charAt(0)}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-lg font-black text-idara-navy leading-none">
                      {selectedAppForInterview?.applicantName || selectedAppForInterview?.name}
                    </p>
                    <p className="text-xs font-bold text-idara-orange/70 lowercase">{selectedAppForInterview?.applicantEmail || selectedAppForInterview?.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="group">
                    <label className="block text-sm md:text-base font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-idara-orange transition-colors">Select Interview Date</label>
                    <input 
                      type="date" 
                      value={interviewDateAdmin}
                      onChange={(e) => setInterviewDateAdmin(e.target.value)}
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-idara-orange focus:ring-4 focus:ring-idara-orange/5 transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm md:text-base font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-idara-orange transition-colors">Select Preferred Time</label>
                    <input 
                      type="time" 
                      value={interviewTimeAdmin}
                      onChange={(e) => setInterviewTimeAdmin(e.target.value)}
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-idara-orange focus:ring-4 focus:ring-idara-orange/5 transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => setIsInterviewModalOpen(false)}
                    className="flex-1 py-4 font-black text-gray-400 hover:text-idara-navy rounded-2xl transition-all hover:bg-gray-100"
                  >
                    Dismiss
                  </button>
                  <button 
                    onClick={confirmScheduleInterview}
                    disabled={isSchedulingInterview || !interviewDateAdmin || !interviewTimeAdmin}
                    className="flex-2 bg-idara-navy text-white py-4 px-8 rounded-2xl font-black shadow-2xl shadow-idara-navy/20 hover:bg-idara-orange hover:shadow-idara-orange/30 active:scale-95 transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-3"
                  >
                    {isSchedulingInterview ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Send Invitation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Standardized Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={userRole} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f9fafc] p-4 lg:p-10 lg:ml-80 xl:ml-[350px]">
          
          {/* 1. Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto space-y-10 pb-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(3,18,73,0.02)] border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-idara-navy/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-idara-navy tracking-tight mb-2">Welcome Back, {userRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}</h2>
                  <p className="text-gray-400 font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-idara-orange" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="flex flex-col items-end">
                      <span className="text-sm md:text-base font-black text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        System Operational
                      </span>
                      <p className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-widest mt-1">Refreshed: {new Date().toLocaleTimeString()}</p>
                   </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Active Job Posts", val: jobs.filter(j => !j.isDeleted && j.isActive).length, icon: Briefcase, color: "idara-navy", trend: "Recruitment Active" },
                  { label: "Total Applications", val: jobResponses.length, icon: FileText, color: "idara-orange", trend: `${jobResponses.filter(r => r.status === 'PENDING').length} Pending Review` },
                  { label: "Volunteers Team", val: volunteers.filter(v => !v.isDeleted).length, icon: Heart, color: "emerald-500", trend: `${volunteers.filter(v => v.status === 'PENDING').length} Awaiting Interview` },
                  { label: "Unresolved Inquiries", val: messages.filter(m => !m.isDeleted).length, icon: Mail, color: "amber-500", trend: "Communication Active" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(3,18,73,0.08)] transition-all duration-500 group relative overflow-hidden hover:-translate-y-2">
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.03] rounded-full -mr-12 -mt-12 group-hover:scale-[3] transition-all duration-700 text-${stat.color}`}></div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      stat.color === 'idara-navy' ? 'bg-idara-navy text-white shadow-idara-navy/20' : 
                      stat.color === 'idara-orange' ? 'bg-idara-orange text-white shadow-idara-orange/20' : 
                      stat.color === 'emerald-500' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-4xl font-black text-idara-navy mb-1 tracking-tighter">{stat.val}</p>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.trend}</span>
                       <TrendingUp className="w-3 h-3 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Recent Inquiries */}
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center px-4">
                    <h3 className="text-xl sm:text-2xl font-black text-idara-navy">Recent Inquiries</h3>
                    <Link href="/admin/messages" className="text-xs md:text-sm font-black text-idara-orange uppercase tracking-widest hover:underline flex items-center gap-2">
                      View All <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(3,18,73,0.02)] border border-gray-50 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                      {messages.length === 0 ? (
                        <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs italic">No inquiries found</div>
                      ) : (
                        messages.slice(0, 5).map((m, i) => (
                          <div key={i} className="p-8 hover:bg-gray-50/50 transition-all group flex items-start justify-between cursor-default">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-idara-navy group-hover:bg-idara-navy group-hover:text-white transition-all shadow-sm">
                                  {m.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0 max-w-[150px] sm:max-w-xs md:max-w-md">
                                  <p className="font-black text-idara-navy group-hover:text-idara-orange transition-colors truncate">{m.name}</p>
                                  <p className="text-xs font-bold text-gray-400 leading-none mt-1 truncate">{m.email}</p>
                                </div>
                             </div>
                             <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest">Inquiry</span>
                                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{new Date(m.createdAt).toLocaleDateString()}</p>
                             </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-black text-idara-navy px-4">Quick Actions</h3>
                  <div className="bg-idara-navy rounded-[3rem] p-10 shadow-2xl shadow-idara-navy/20 text-white relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-idara-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10 space-y-4">
                      <button 
                        onClick={() => setActiveTab("addjob")}
                        className="w-full bg-white/10 hover:bg-idara-orange text-white text-left p-6 rounded-3xl transition-all duration-300 group/btn flex justify-between items-center"
                      >
                        <div>
                          <p className="font-black tracking-tight">Create Listing</p>
                          <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">Post a new job vacancy</p>
                        </div>
                        <Briefcase className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => setActiveTab("volunteers")}
                        className="w-full bg-white/10 hover:bg-emerald-500 text-white text-left p-6 rounded-3xl transition-all duration-300 group/btn flex justify-between items-center"
                      >
                        <div>
                          <p className="font-black tracking-tight">Onboard Volunteers</p>
                          <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">Manage applications</p>
                        </div>
                        <Heart className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] text-center mt-10">Habbah Control Center</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Add Job Form */}
          {activeTab === "addjob" && (
            <div className="flex justify-center items-start bg-linear-to-br from-gray-50 to-gray-100 p-4 py-6">
              <div className="w-full max-w-6xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 text-idara-navy flex items-center gap-4">
                  {isEditingJob ? "Edit Job Posting" : "Add New Job Posting"}
                  {isEditingJob && (
                    <button 
                      onClick={() => {
                        setIsEditingJob(false);
                        setEditingJobId(null);
                        setJobTitle("");
                        setJobDesc("");
                        setJobLocation("");
                        setJobType("Full-Time");
                        setCategory("");
                        setDepartment("");
                        setEmploymentLevel("");
                        setDeadlineAt("");
                        setRequirements("");
                        setResponsibilities("");
                        setQualifications("");
                      }}
                      className="text-xs font-black text-rose-500 hover:underline uppercase tracking-widest"
                    >
                      Cancel Edit
                    </button>
                  )}
                </h2>

                <form
                  onSubmit={handleAddJob}
                  className="bg-white p-10 rounded-[2.5rem] shadow-2xl space-y-8 border-2 border-gray-50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-idara-orange/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  
                  <div className="grid md:grid-cols-2 gap-8 relative z-10">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Job Title *</label>
                      <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required placeholder="Senior Teacher" className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location *</label>
                      <input type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required placeholder="Karachi, Pakistan" className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description *</label>
                      <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} required rows={4} placeholder="Describe the role responsibilities and scope..." className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Job Type *</label>
                      <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all cursor-pointer">
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Internship</option>
                        <option>Contract</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                      <input value={category} placeholder="Education" onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Department</label>
                      <input value={department} placeholder="Academic" onChange={(e) => setDepartment(e.target.value)} className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Deadline</label>
                      <input type="date" value={deadlineAt} onChange={(e) => setDeadlineAt(e.target.value)} className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Requirements</label>
                      <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={4} placeholder="Required skills and tools..." className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Responsibilities</label>
                      <textarea value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} rows={4} placeholder="Day to day tasks..." className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Qualifications</label>
                      <textarea value={qualifications} onChange={(e) => setQualifications(e.target.value)} rows={4} placeholder="Degrees or certifications..." className="w-full bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 focus:bg-white focus:border-idara-orange outline-none transition-all" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={jobSubmitting}
                    className="w-full bg-idara-navy text-white font-black py-5 rounded-4xl shadow-2xl shadow-idara-navy/20 hover:bg-idara-orange hover:shadow-idara-orange/20 active:scale-[0.98] transition-all disabled:opacity-60 text-xl"
                  >
                    {jobSubmitting ? (isEditingJob ? "Updating..." : "Creating...") : (isEditingJob ? "Update Job Posting" : "Publish Job Posting")}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 3. Recent Jobs */}
          {activeTab === "recentjobs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-idara-navy">
                  Recent Job Postings
                </h2>
                <button
                  onClick={loadJobs}
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 text-idara-navy rounded-xl hover:bg-idara-navy hover:text-white transition-all shadow-sm"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              {getRecentJobs().length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No recent jobs found</p>
                  <p className="text-gray-400 text-sm">Jobs from the last 2 days will appear here</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {getRecentJobs().map((job) => (
                    <div key={job.id} className={`group bg-white border-2 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-idara-orange/20 transition-all duration-500 relative overflow-hidden ${job.isDeleted ? 'bg-rose-50/20 border-rose-200' : 'border-gray-100'}`}>
                      {job.isDeleted && (
                        <div className="mb-4 px-4 py-2 bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl relative z-10">
                          🗑️ Soft-deleted by {job.deletedBy || "Admin"} on {new Date(job.deletedAt).toLocaleDateString()}
                        </div>
                      )}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-idara-orange/5 rounded-full -mr-12 -mt-12 group-hover:scale-[3] transition-all duration-700"></div>

                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-idara-navy/5 rounded-2xl flex items-center justify-center text-idara-navy font-black text-xl group-hover:bg-idara-navy group-hover:text-white transition-all">
                          {job.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex gap-2 relative z-20">
                          {job.isDeleted ? (
                            <button
                              onClick={() => handleRestoreJob(job.id)}
                              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all"
                              title="Restore Job"
                            >
                              Restore
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditJobClick(job)}
                                className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-idara-orange transition-all bg-gray-50 hover:bg-orange-50 rounded-xl"
                                title="Edit Job"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all bg-gray-50 hover:bg-red-50 rounded-xl"
                                title="Delete Job"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <h3 className="font-black text-2xl text-idara-navy mb-2 group-hover:text-idara-orange transition-colors relative z-10">{job.title}</h3>

                      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                        <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-xs font-black text-gray-600 uppercase tracking-wider">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center bg-idara-navy text-white px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                          ⏱️ {job.jobType?.replace("_", " ")}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-3 mb-6 leading-relaxed relative z-10">{job.description}</p>

                      <div className="pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
                        <div className="text-[10px] text-green-600 font-black flex items-center bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                          ACTIVE
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Old Jobs */}
          {activeTab === "oldjobs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                  <Archive className="w-6 h-6" />
                  Old Jobs (Archive)
                </h2>
                <button
                  onClick={loadJobs}
                  className="px-3 py-1.5 text-xs rounded-lg bg-idara-navy text-white hover:bg-idara-orange flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Jobs
                </button>
              </div>

              {getOldJobs().length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No old jobs found</p>
                  <p className="text-gray-400 text-sm">Jobs older than 2 days will appear here</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {getOldJobs().map((job) => (
                    <div key={job.id} className={`group bg-white border-2 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${job.isDeleted ? 'bg-rose-50/20 border-rose-200' : 'border-gray-100'}`}>
                      {job.isDeleted && (
                        <div className="mb-4 px-4 py-2 bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl relative z-10">
                          🗑️ Soft-deleted by {job.deletedBy || "Admin"} on {new Date(job.deletedAt).toLocaleDateString()}
                        </div>
                      )}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100/50 rounded-full -mr-12 -mt-12 group-hover:bg-idara-navy/5 transition-all duration-500"></div>

                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-black text-xl group-hover:bg-gray-200 transition-all">
                          {job.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex gap-2 relative z-20">
                          {job.isDeleted ? (
                            <button
                              onClick={() => handleRestoreJob(job.id)}
                              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all"
                              title="Restore Job"
                            >
                              Restore
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditJobClick(job)}
                                className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-idara-orange transition-all bg-gray-50 hover:bg-orange-50 rounded-xl"
                                title="Edit Job"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all bg-gray-50 hover:bg-red-50 rounded-xl"
                                title="Delete Job"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <h3 className="font-black text-2xl text-gray-400 mb-2 group-hover:text-idara-navy transition-colors relative z-10">{job.title}</h3>

                      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                        <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full text-xs font-black text-gray-400 uppercase tracking-wider">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                          ⏱️ {job.jobType?.replace("_", " ")}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 line-clamp-3 mb-6 leading-relaxed relative z-10">{job.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Role Responses (Specific Job Applications) */}
          {activeTab === "jobresponse" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-idara-navy flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-idara-orange" />
                  Role Specific Responses ({specificJobApps.length})
                </h2>
                <button
                  onClick={loadJobResponses}
                  disabled={responsesLoading}
                  className="px-6 py-3 bg-white border-2 border-gray-100 text-idara-navy rounded-2xl hover:bg-idara-navy hover:text-white transition-all shadow-sm font-black flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${responsesLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {responsesLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border text-center">
                  <RefreshCw className="w-12 h-12 text-idara-orange animate-spin mb-4" />
                  <p className="text-idara-navy font-black uppercase tracking-widest text-sm">Filtering Responses...</p>
                </div>
              ) : specificJobApps.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                  <Briefcase className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-400">No Role Specific Responses</h3>
                  <p className="text-gray-400 mt-2">Applications for specific job postings will appear here.</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {specificJobApps.map((res) => (
                    <div key={res.id} className="group bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col h-full text-left">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-idara-orange/5 rounded-full -mr-16 -mt-16 group-hover:scale-[1.5] transition-all duration-700"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-14 h-14 bg-[#012060] text-white rounded-3xl flex items-center justify-center font-black text-xl shadow-xl shadow-blue-900/20 uppercase">
                          {res.applicantName?.charAt(0)}
                        </div>
                        <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${
                          res.status === 'HIRED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                          res.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                          res.status === 'INTERVIEW' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {res.status}
                        </span>
                      </div>

                      <div className="space-y-1 mb-6 relative z-10">
                        <h3 className="text-2xl font-black text-idara-navy truncate" title={res.applicantName}>{res.applicantName}</h3>
                        <p className="text-idara-orange font-bold text-sm truncate">{res.applicantEmail}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mt-2">
                           <Smartphone className="w-3 h-3 text-idara-orange" />
                           {res.applicantPhone || 'N/A'}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-4xl p-6 mb-8 border border-gray-100 relative z-10 grow">
                        <div className="mb-4">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Applying For</span>
                            <p className="font-black text-idara-navy truncate">{res.job?.title || 'Unknown Position'}</p>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-100">
                           <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Cover Letter / Context</span>
                           <p className="text-xs text-gray-600 font-medium line-clamp-4 italic bg-white/50 p-3 rounded-2xl border border-dotted border-gray-200">
                              {res.coverLetter || 'No message provided'}
                           </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 relative z-10 mt-auto">
                        {res.resumeUrl && (
                          <a 
                            href={res.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-white border-2 border-blue-900 text-blue-900 font-black py-3 rounded-2xl hover:bg-blue-900 hover:text-white transition-all text-xs flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" /> View CV
                          </a>
                        )}
                        {res.status !== 'INTERVIEW' && res.status !== 'HIRED' && (
                          <button 
                            onClick={() => markForInterview(res)}
                            className="flex-1 bg-idara-orange text-white font-black py-3 rounded-2xl hover:brightness-110 shadow-lg shadow-idara-orange/20 transition-all text-xs flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-4 h-4" /> Interview
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-50 relative z-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                         <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-idara-orange" />
                            {new Date(res.createdAt).toLocaleDateString()}
                         </div>
                         <span>#APP-{res.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. Job Applications (General Interest) */}
          {activeTab === "jobapplications" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-idara-navy flex items-center gap-3">
                  <Users className="w-8 h-8 text-idara-orange" />
                  General Submissions ({generalInterestApps.length})
                </h2>
                <button
                  onClick={loadJobResponses}
                  disabled={responsesLoading}
                  className="px-6 py-3 bg-white border-2 border-gray-100 text-idara-navy rounded-2xl hover:bg-idara-navy hover:text-white transition-all shadow-sm font-black flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${responsesLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {responsesLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border text-center">
                  <RefreshCw className="w-12 h-12 text-idara-orange animate-spin mb-4" />
                  <p className="text-idara-navy font-black uppercase tracking-widest text-sm">Searching Database...</p>
                </div>
              ) : generalInterestApps.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                  <Users className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-400">No General Submissions</h3>
                  <p className="text-gray-400 mt-2">Applications submitted generally will show up here.</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {generalInterestApps.map((res) => (
                    <div key={res.id} className="group bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col h-full text-left">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-idara-orange/5 rounded-full -mr-16 -mt-16 group-hover:scale-[1.5] transition-all duration-700"></div>
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-14 h-14 bg-idara-navy text-white rounded-3xl flex items-center justify-center font-black text-xl shadow-xl shadow-idara-navy/20 uppercase">
                          {res.applicantName?.charAt(0)}
                        </div>
                        <span className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm bg-orange-50 text-idara-orange border border-orange-100">
                          GENERAL
                        </span>
                      </div>
                      <div className="space-y-1 mb-6 relative z-10">
                        <h3 className="text-2xl font-black text-idara-navy truncate">{res.applicantName}</h3>
                        <p className="text-idara-orange font-bold text-sm truncate">{res.applicantEmail}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mt-2">
                           <Smartphone className="w-3 h-3 text-idara-orange" />
                           {res.applicantPhone || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-gray-50/50 rounded-4xl p-6 mb-8 border border-gray-100 relative z-10 grow">
                        <div className="mb-4">
                            <span className="text-xs font-black text-idara-navy uppercase tracking-widest block mb-1">Area of Interest</span>
                            <p className="font-black text-idara-navy bg-white/50 p-3 rounded-2xl border border-dotted border-gray-200">
                                {res.coverLetter?.split('\n')[0] || "General Request"}
                            </p>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                           <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Context details</span>
                           <p className="text-xs text-gray-600 font-medium line-clamp-4 italic">
                              {res.coverLetter || 'No details provided'}
                           </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 relative z-10 mt-auto">
                        {res.resumeUrl && (
                          <a href={res.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border-2 border-idara-navy text-idara-navy font-black py-3 rounded-2xl hover:bg-idara-navy hover:text-white transition-all text-xs flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> CV</a>
                        )}
                        <button onClick={() => markForInterview(res)} className="flex-1 bg-idara-navy text-white font-black py-3 rounded-2xl hover:bg-idara-orange transition-all text-xs flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> Onboard</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 7. Volunteers Tab */}
          {activeTab === "volunteers" && (
            <div className="space-y-6">
              {isVolModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-idara-navy/40 backdrop-blur-xl transition-all duration-500" onClick={() => !isProcessingVol && setIsVolModalOpen(false)}></div>
                  <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative z-10 animate-in zoom-in-95 duration-500 border border-white/20">
                    <div className="bg-linear-to-br from-idara-orange to-idara-orange p-10 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse"></div>
                      <h3 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                        <Heart className="w-8 h-8 text-white" />
                        Schedule orientation
                      </h3>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                        Volunteer Registration • {selectedVolForAction?.volunteerName}
                      </p>
                    </div>
                    <div className="p-10 space-y-8 bg-linear-to-b from-white to-gray-50/30">
                      <div className="flex items-center gap-5 p-5 bg-gray-50/50 rounded-4xl border border-gray-100 shadow-inner">
                        <div className="w-14 h-14 bg-idara-orange text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-idara-orange/10">
                          {selectedVolForAction?.volunteerName?.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-lg font-black text-idara-navy leading-none">{selectedVolForAction?.volunteerName}</p>
                          <p className="text-xs font-bold text-idara-orange/70 lowercase">{selectedVolForAction?.volunteerEmail}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="group">
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-idara-orange transition-colors">Date for Orientation</label>
                          <input 
                            type="date" 
                            value={volActionDate}
                            onChange={(e) => setVolActionDate(e.target.value)}
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-idara-orange focus:ring-4 focus:ring-idara-orange/5 transition-all font-bold text-gray-700 shadow-sm"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 group-focus-within:text-idara-orange transition-colors">Select Time</label>
                          <input 
                            type="time" 
                            value={volActionTime}
                            onChange={(e) => setVolActionTime(e.target.value)}
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-idara-orange focus:ring-4 focus:ring-idara-orange/5 transition-all font-bold text-gray-700 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button 
                          onClick={() => setIsVolModalOpen(false)}
                          className="flex-1 py-4 font-black text-gray-400 hover:text-idara-navy rounded-2xl transition-all hover:bg-gray-100"
                        >
                          Dismiss
                        </button>
                        <button 
                          onClick={() => handleVolunteerResponse(selectedVolForAction.id, 'INTERVIEW', volActionDate, volActionTime)}
                          disabled={isProcessingVol || !volActionDate || !volActionTime}
                          className="flex-2 bg-idara-orange text-white py-4 px-8 rounded-2xl font-black shadow-2xl shadow-idara-orange/30 hover:brightness-110 active:scale-95 transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-3"
                        >
                          {isProcessingVol ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Calendar className="w-5 h-5" />
                              Send Invitation
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-idara-navy flex items-center gap-3">
                  <Heart className="w-8 h-8 text-idara-orange" />
                  Volunteer Applications ({volunteers.length})
                </h2>
                <button
                  onClick={loadVolunteers}
                  disabled={volunteersLoading}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-100 text-idara-navy rounded-2xl hover:bg-idara-navy hover:text-white transition-all shadow-sm"
                >
                  <RefreshCw className={`w-5 h-5 ${volunteersLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {volunteers.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                  <Heart className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-400">No Volunteer Applications Yet</h3>
                  <p className="text-gray-400 mt-2">Applications from the volunteer form will appear here.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {volunteers.map((vol) => (
                    <div key={vol.id} className={`group bg-white border-2 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${vol.isDeleted ? 'bg-rose-50/20 border-rose-200' : 'border-gray-100'}`}>
                      {vol.isDeleted && (
                        <div className="mb-4 px-4 py-2 bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl relative z-10">
                          🗑️ Soft-deleted by {vol.deletedBy || "Admin"} on {new Date(vol.deletedAt).toLocaleDateString()}
                        </div>
                      )}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-idara-orange/5 rounded-full -mr-16 -mt-16 group-hover:scale-[2] transition-all duration-700"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-14 h-14 bg-idara-navy text-white rounded-3xl flex items-center justify-center font-black text-xl shadow-xl shadow-idara-navy/20 uppercase">
                          {vol.volunteerName.charAt(0)}
                        </div>
                        <div className="flex gap-2 relative z-20">
                           {vol.isDeleted ? (
                             <button
                               onClick={() => restoreVolunteer(vol.id)}
                               className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all animate-pulse"
                               title="Restore Volunteer"
                             >
                               Restore
                             </button>
                           ) : (
                             <button
                               onClick={() => deleteVolunteer(vol.id)}
                               className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all bg-gray-50 hover:bg-red-50 rounded-xl"
                               title="Delete Volunteer"
                             >
                               <Trash2 className="w-5 h-5" />
                             </button>
                           )}
                        </div>
                      </div>

                      <div className="space-y-1 mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black text-idara-navy group-hover:text-idara-orange transition-colors">
                            {vol.volunteerName}
                          </h3>
                          {vol.status !== 'PENDING' && (
                            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${
                              vol.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                              vol.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                              'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              {vol.status}
                            </span>
                          )}
                        </div>
                        <p className="text-idara-orange font-bold text-sm tracking-tight">{vol.volunteerEmail}</p>
                      </div>

                      <div className="bg-gray-50 rounded-4xl p-6 mb-8 space-y-4 border border-gray-100 relative z-10">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Volunteer Age</span>
                          <span className="font-black text-idara-navy">{vol.volunteerAge} Years</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Applied By</span>
                          <span className="font-black text-idara-navy">{vol.applicantName}</span>
                        </div>
                        {vol.interviewDate && (
                          <div className="flex justify-between text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-xl border border-amber-100">
                            <span className="font-bold uppercase tracking-widest text-xs">Meet Scheduled</span>
                            <span className="font-black">{vol.interviewDate} @ {vol.interviewTime}</span>
                          </div>
                        )}
                        <div className="pt-2">
                          <span className="font-bold text-gray-400 uppercase tracking-widest text-xs block mb-2">Availability</span>
                          <div className="flex flex-wrap gap-2">
                            {vol.availability?.split(',').map((avail: string) => (
                              <span key={avail} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-black text-gray-600 transition-all group-hover:border-idara-orange/30 group-hover:bg-orange-50/50">
                                {avail.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {!vol.isDeleted && (
                        <div className="flex flex-wrap gap-3 relative z-10">
                          <button 
                            onClick={() => { setSelectedVolForAction(vol); setIsVolModalOpen(true); }}
                            className="flex-1 bg-white border-2 border-idara-navy text-idara-navy font-black py-3 rounded-2xl hover:bg-idara-navy hover:text-white transition-all text-xs flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-4 h-4" /> Schedule Meet
                          </button>
                          <button 
                            onClick={() => handleVolunteerResponse(vol.id, 'APPROVE')}
                            disabled={isProcessingVol || vol.status === 'APPROVED'}
                            className="flex-1 bg-emerald-600 text-white font-black py-3 rounded-2xl hover:bg-emerald-700 transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                          <button 
                            onClick={() => handleVolunteerResponse(vol.id, 'REJECT')}
                            disabled={isProcessingVol || vol.status === 'REJECTED'}
                            className="w-12 h-12 bg-white border-2 border-rose-100 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
                            title="Reject Application"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-50 relative z-10">
                        <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                          <CheckCircle className={`w-3 h-3 ${vol.status === 'APPROVED' ? 'text-emerald-500' : 'text-gray-300'}`} />
                          {vol.status === 'PENDING' ? 'Awaiting Action' : vol.status.replace('_', ' ')}
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(vol.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 8. Candidates Tab */}
          {activeTab === "candidates" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Candidates ({candidates.length})
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-md sm:rounded-lg hover:bg-green-700 flex items-center gap-1 sm:gap-2 transition-all"
                  >
                    {showAddForm ? '❌ Cancel' : '➕ Add New Candidate'}
                  </button>
                </div>
              </div>

              {showAddForm && (
                <div className="bg-white p-6 rounded-xl border border-green-200 mb-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
                    Add Candidate Profile
                  </h3>
                  <form onSubmit={handleAddCandidate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newCandidate.name}
                        onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition"
                        placeholder="Enter candidate name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={newCandidate.email}
                        onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Position *</label>
                      <input
                        type="text"
                        required
                        value={newCandidate.position}
                        onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition"
                        placeholder="Enter job position"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={newCandidate.phone}
                        onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
                      <input
                        type="text"
                        value={newCandidate.experience}
                        onChange={(e) => setNewCandidate({ ...newCandidate, experience: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition"
                        placeholder="e.g. 3 years in teaching"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Education</label>
                      <input
                        type="text"
                        value={newCandidate.education}
                        onChange={(e) => setNewCandidate({ ...newCandidate, education: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition"
                        placeholder="e.g. M.Ed Academic Leadership"
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                      >
                        💾 Save Candidate
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setNewCandidate({
                            name: '', email: '', position: '', phone: '', experience: '', education: ''
                          });
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {candidates.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                  <Users className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                  <p className="text-gray-400 font-black text-2xl mb-8 uppercase tracking-widest">Database Empty</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-8 py-4 bg-idara-navy text-white font-black rounded-2xl hover:bg-idara-orange transition-all shadow-xl shadow-idara-navy/10 flex items-center gap-3 mx-auto animate-bounce"
                  >
                    <Users className="w-5 h-5" /> Add First Candidate
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                      <thead className="bg-idara-navy text-white">
                        <tr>
                          <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.2em] opacity-60">ID</th>
                          <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.2em] opacity-60">Candidate</th>
                          <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.2em] opacity-60">Contact</th>
                          <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.2em] opacity-60">Position</th>
                          <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.2em] opacity-60">Status</th>
                          <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.2em] opacity-60">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {candidates.map((candidate, index) => (
                          <tr key={candidate.id} className={`hover:bg-gray-50 transition-all duration-200 ${candidate.isDeleted ? 'bg-rose-50/40 text-gray-400' : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20')}`}>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className="text-xs font-black text-gray-300">#{candidate.id}</span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-idara-navy/5 flex items-center justify-center text-idara-navy font-black text-sm">
                                  {candidate.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                  <div className="text-sm font-black text-idara-navy">{candidate.name}</div>
                                  {candidate.isDeleted && (
                                    <span className="text-[10px] text-rose-500 font-black uppercase tracking-wider">🗑️ Soft-deleted by {candidate.deletedBy || "Admin"} on {new Date(candidate.deletedAt).toLocaleDateString()}</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="text-xs font-bold text-idara-orange">{candidate.email}</div>
                              <div className="text-xs font-medium text-gray-400">{candidate.phone || "No Phone"}</div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-black text-gray-600 uppercase tracking-wider">
                                {candidate.position}
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${candidate.status === "interview_scheduled" || candidate.status === "INTERVIEW"
                                ? 'bg-blue-100 text-blue-800'
                                : candidate.status === "hired" || candidate.status === "HIRED"
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {candidate.status || "Awaiting Action"}
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex gap-2">
                                {candidate.isDeleted ? (
                                  <button
                                    onClick={() => restoreCandidate(candidate.id)}
                                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/10"
                                    title="Restore Candidate"
                                  >
                                    Restore
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => scheduleInterview(candidate.id, candidate.name, candidate.email, candidate.position)}
                                      className="w-10 h-10 flex items-center justify-center bg-idara-navy text-white rounded-xl hover:bg-idara-orange transition-all shadow-lg shadow-idara-navy/10"
                                      title="Schedule Interview"
                                    >
                                      <Calendar className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => markAsHired(candidate)}
                                      className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-xl hover:bg-idara-navy transition-all shadow-lg shadow-green-600/10"
                                      title="Mark as Hired"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => deleteCandidate(candidate.id)}
                                      className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-50/50 px-8 py-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                      <div className="flex items-center gap-8">
                        <span>Total <span className="text-idara-navy">{candidates.length}</span></span>
                        <span>Interview <span className="text-idara-orange">{candidates.filter(c => c.status === "interview_scheduled" || c.status === "INTERVIEW").length}</span></span>
                        <span>Hired <span className="text-green-600">{candidates.filter(c => c.status === "hired" || c.status === "HIRED").length}</span></span>
                      </div>
                      <div>
                        Updated: {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 9. Interview Candidates */}
          {activeTab === "interview" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Interview Candidates ({interviewCandidates.length})
                </h2>
                <button
                  onClick={loadInterviewCandidates}
                  className="px-3 py-1.5 text-xs rounded-lg bg-idara-navy text-white hover:bg-idara-orange flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {interviewCandidates.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No interviews scheduled</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {interviewCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
                          {candidate.candidateName?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                          INTERVIEW
                        </span>
                      </div>

                      <h3 className="font-black text-2xl text-idara-navy mb-2">{candidate.candidateName}</h3>
                      <p className="text-xs text-gray-400 font-bold mb-4">{candidate.candidateEmail}</p>

                      <div className="bg-blue-50/50 rounded-3xl p-5 border border-blue-100 mb-6 space-y-2 text-xs">
                        <div className="flex justify-between text-blue-900 font-black">
                          <span>Interview Date:</span>
                          <span>{candidate.interviewDate || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-blue-900 font-black">
                          <span>Interview Time:</span>
                          <span>{candidate.interviewTime || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-blue-900 font-black border-t border-blue-100/50 pt-2 mt-2">
                          <span>Position:</span>
                          <span>{candidate.jobTitle || "General Role"}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => markAsHired(candidate)}
                        className="w-full bg-green-600 text-white py-3.5 rounded-2xl font-black shadow-lg shadow-green-500/10 hover:bg-idara-navy hover:shadow-idara-navy/20 transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Mark as Hired
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 10. Hired Candidates */}
          {activeTab === "hired" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Hired Team Members ({hiredCandidates.length})
                </h2>
                <button
                  onClick={loadHiredCandidates}
                  className="px-3 py-1.5 text-xs rounded-lg bg-idara-navy text-white hover:bg-idara-orange flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {hiredCandidates.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No hired team members yet</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {hiredCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-white border border-emerald-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center font-black text-xl">
                          {candidate.candidateName?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                          HIRED
                        </span>
                      </div>

                      <h3 className="font-black text-2xl text-idara-navy mb-2">{candidate.candidateName}</h3>
                      <p className="text-xs text-gray-400 font-bold mb-4">{candidate.candidateEmail}</p>

                      <div className="bg-green-50/50 rounded-3xl p-5 border border-green-100 text-xs">
                        <div className="flex justify-between text-green-900 font-black">
                          <span>Joined Position:</span>
                          <span>{candidate.jobTitle || "General Role"}</span>
                        </div>
                        <div className="flex justify-between text-green-900 font-black border-t border-green-100/50 pt-2 mt-2">
                          <span>Hire Date:</span>
                          <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 11. Audit Logs Tab */}
          {activeTab === "auditlogs" && userRole === "SUPER_ADMIN" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto space-y-8 pb-20">
              <div className="flex justify-between items-center mb-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                <div>
                  <h2 className="text-3xl font-black text-idara-navy tracking-tight">System Activity & Audit Logs</h2>
                  <p className="text-xs font-black text-idara-orange uppercase tracking-wider mt-1">Super Admin Audit Trail</p>
                </div>
                <button
                  onClick={loadAuditLogs}
                  className="w-12 h-12 flex items-center justify-center bg-gray-50 text-idara-navy rounded-2xl hover:bg-idara-navy hover:text-white transition-all shadow-sm border border-gray-100"
                >
                  <RefreshCw className={`w-5 h-5 ${auditLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {auditLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-50">
                  <div className="w-16 h-16 border-4 border-idara-navy/10 border-t-idara-orange rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Loading audit trail...</p>
                </div>
              ) : auditLogs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-50">
                  <Clock className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-400">No Activity Logs Found</h3>
                  <p className="text-gray-400 mt-2">Actions taken by admins will be recorded here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {auditLogs.map((log, logIdx) => (
                        <li key={log.id}>
                          <div className="relative pb-8">
                            {logIdx !== auditLogs.length - 1 ? (
                              <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex items-start space-x-3">
                              <div className="relative">
                                <span className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white ${
                                  log.action === 'CREATE' ? 'bg-green-50 text-green-600' :
                                  log.action === 'UPDATE' ? 'bg-blue-50 text-blue-600' :
                                  log.action === 'DELETE' ? 'bg-rose-50 text-rose-600' :
                                  'bg-emerald-50 text-emerald-600'
                                }`}>
                                  {log.action === 'CREATE' && '➕'}
                                  {log.action === 'UPDATE' && '📝'}
                                  {log.action === 'DELETE' && '🗑️'}
                                  {log.action === 'RESTORE' && '🔄'}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 py-1.5">
                                <div className="text-xs text-gray-500">
                                  <span className="font-bold text-idara-navy">{log.performedBy}</span>{' '}
                                  <span className="font-medium text-gray-600">performed {log.action.toLowerCase()} on {log.targetType || "entry"}</span>
                                </div>
                                <div className="mt-2 text-xs text-gray-700 font-semibold bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                  {log.details}
                                </div>
                                <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1.5 font-bold uppercase">
                                  <Clock className="w-3.5 h-3.5 text-idara-orange" />
                                  {new Date(log.createdAt).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 12. CMS Pages Tab */}
          {activeTab === "cmspages" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto space-y-8 pb-20">
              <div className="flex justify-between items-center mb-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                <div>
                  <h2 className="text-3xl font-black text-idara-navy tracking-tight">Website Pages (Payload CMS)</h2>
                  <p className="text-xs font-black text-idara-orange uppercase tracking-wider mt-1">Manage public website pages and content layout blocks</p>
                </div>
                <div className="flex gap-4">
                  <Link
                    href="/cms-admin/collections/pages/create"
                    className="bg-idara-orange hover:bg-idara-navy hover:text-white text-idara-navy px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-sm border border-idara-orange flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create New Page
                  </Link>
                  <button
                    onClick={async () => {
                      setCmsLoading(true);
                      try {
                        const res = await fetch("/api/pages?limit=20");
                        if (res.ok) {
                          const data = await res.json();
                          setCmsPages(data.docs || []);
                        }
                      } catch (err) {
                        console.error("Failed to fetch CMS pages:", err);
                      } finally {
                        setCmsLoading(false);
                      }
                    }}
                    className="w-12 h-12 flex items-center justify-center bg-gray-50 text-idara-navy rounded-2xl hover:bg-idara-navy hover:text-white transition-all shadow-sm border border-gray-100"
                  >
                    <RefreshCw className={`w-5 h-5 ${cmsLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {cmsLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-gray-50">
                  <div className="w-16 h-16 border-4 border-idara-navy/10 border-t-idara-orange rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Loading website pages...</p>
                </div>
              ) : cmsPages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-50">
                  <FileText className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-400">No CMS Pages Found</h3>
                  <p className="text-gray-400 mt-2">Make sure database migrations and seeds are executed correctly.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cmsPages.map((page) => {
                    // Choose an icon based on slug
                    let PageIcon = FileText;
                    if (page.slug === "home") PageIcon = Home;
                    else if (page.slug === "about") PageIcon = BookOpen;
                    else if (page.slug === "application-process") PageIcon = Clock;
                    else if (page.slug === "success-stories") PageIcon = Sparkles;
                    else if (page.slug === "contact") PageIcon = Phone;
                    else if (page.slug === "careers") PageIcon = Briefcase;
                    else if (page.slug === "volunteer") PageIcon = Heart;

                    return (
                      <div
                        key={page.id}
                        className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-idara-orange/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-300" />
                        <div className="relative z-10 space-y-6">
                          <div className="p-4 bg-idara-navy/5 rounded-2xl inline-block text-idara-navy group-hover:bg-idara-navy group-hover:text-white transition-all duration-300">
                            <PageIcon className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-idara-navy group-hover:text-idara-orange transition-colors">
                              {page.title}
                            </h3>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                              Slug: <span className="text-idara-navy">{page.slug}</span>
                            </p>
                          </div>
                          
                          {/* List Sections */}
                          {page.sections && page.sections.length > 0 ? (
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Sections ({page.sections.length}):
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {page.sections.map((sec: any, sIdx: number) => {
                                  // Map blockType to clean label
                                  let label = sec.blockType;
                                  if (sec.blockType === "hero") label = "Hero";
                                  else if (sec.blockType === "text") label = "Text";
                                  else if (sec.blockType === "cards-grid") label = "Cards Grid";
                                  else if (sec.blockType === "stats") label = "Stats";
                                  else if (sec.blockType === "testimonials") label = "Testimonials";
                                  else if (sec.blockType === "cta") label = "CTA";
                                  else if (sec.blockType === "timeline") label = "Timeline";
                                  else if (sec.blockType === "partners") label = "Partners";
                                  else if (sec.blockType === "team") label = "Team";
                                  else if (sec.blockType === "map-section") label = "Map";
                                  else if (sec.blockType === "contact-form") label = "Contact Form";
                                  else if (sec.blockType === "jobs-section") label = "Jobs";

                                  return (
                                    <span key={sIdx} className="px-2 py-0.5 bg-idara-navy/5 text-idara-navy text-[10px] rounded-md font-bold uppercase tracking-wider">
                                      {label}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs italic text-gray-400">No layout sections defined.</p>
                          )}
                          
                          <div className="text-[10px] text-gray-400 font-bold uppercase pt-2 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-idara-orange" />
                            Updated: {new Date(page.updatedAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50 relative z-10 flex gap-4">
                          <Link
                            href={`/admin/editor/${page.id}`}
                            className="flex-1 bg-idara-navy hover:bg-idara-orange hover:text-idara-navy text-white text-center py-4 rounded-2xl font-black text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                          >
                            Edit
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteCmsPage(page.id, page.title)}
                            className="px-4 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 rounded-2xl border border-rose-100 flex items-center justify-center transition-all duration-300"
                            title="Delete page"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <a
                            href={page.slug === "home" ? "/" : `/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 bg-gray-50 hover:bg-gray-100 text-idara-navy rounded-2xl border border-gray-100 flex items-center justify-center transition-all duration-300"
                            title="View live page"
                          >
                            <Eye className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    );
  }

  // Fallback: auth check done but not logged in — show redirect animation
  // (router.replace already triggered above; this prevents blank flash)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-idara-navy via-[#0c1f6d] to-[#03114b]">
      <div className="relative flex flex-col items-center gap-8">
        <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-idara-orange animate-spin duration-1000"></div>
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center" style={{top: '28px'}}>
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <div className="w-8 h-8 bg-idara-orange rounded-full blur-md opacity-50"></div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-white/60 text-xs font-black uppercase tracking-widest">Redirecting to Login...</p>
        </div>
      </div>
    </div>
  );
}
