"use client";

import { 
  Pause, 
  HelpCircle, 
  Sparkles, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Clock, 
  ShieldCheck,
  Search,
  ExternalLink,
  Loader2,
  Play
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

type MembershipRecord = {
  _id: string;
  userId: string;
  razorpaySubscriptionId: string;
  planId: string;
  membershipPlanId: string;
  tier: string;
  status: string;
  trialStart: string;
  trialEnd: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  totalCount: number;
  createdAt: string;
  updatedAt: string;
};

type PaginationData = {
  currentPage: number;
  itemsPerPage: number;
  totalRecords: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
};

const ITEMS_PER_PAGE = 3;

const formatDate = (value: string) => {
  if (!value) return "N/A";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const statusBadgeClass = (status: string) => {
  switch (status) {
    case "created":
    case "active":
    case "authenticated":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
    case "cancelled":
    case "expired":
      return "bg-neutral-50 text-neutral-600 ring-1 ring-neutral-600/10";
    case "paused":
    case "halted":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
    case "pending":
    case "trial":
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
    default:
      return "bg-slate-50 text-slate-600 ring-1 ring-slate-600/10";
  }
};

export default function MembershipPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Dynamic Integrated States
  const [activeMembership, setActiveMembership] = useState<MembershipRecord | null>(null);
  const [history, setHistory] = useState<MembershipRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalRecords: 0,
    totalPages: 0,
    startIndex: 0,
    endIndex: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Debounce user search updates to minimize API traffic over Express
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Drop back to first window partition on filtering
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Execute Dynamic Data Fetch from API Controller
  const fetchMembershipDashboard = async () => {
    setIsLoading(true);
    try {
      // FIXED: Passed pagination state and search criteria parameters directly through axios
      const response = await axiosInstance.get('account/profile/membership', {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: debouncedSearch
        }
      });
      const payload = response.data;

      if (payload.success && payload.data) {
        setActiveMembership(payload.data.activeMembership);
        setHistory(payload.data.history || []);
        setPagination(payload.data.pagination);
      } else {
        toast.error(payload.message || "Failed to load dashboard parameters.");
      }
    } catch (err) {
      console.error("Dashboard link vector failure ->", err);
      toast.error("Network synchronization timeout with matrix cluster.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembershipDashboard();
  }, [currentPage, debouncedSearch]);

  // NEW: Operational Action Handler linking directly with your backend management controllers
  const handleLifecycleAction = async (action: 'pause' | 'resume' | 'cancel', subscriptionId: string) => {
    setActionLoading(action);
    const toastId = toast.loading(`Dispatching ${action} command to payment gateway...`);
    
    try {
      const response = await axiosInstance.post(`/payment/subscription/${action}/${subscriptionId}`);
      const payload = response.data;

      if (payload.success) {
        toast.success(payload.message || `Subscription ${action}d successfully.`, { id: toastId });
        // Refresh dashboard statistics to mirror backend state change
        await fetchMembershipDashboard();
      } else {
        toast.error(payload.message || `Failed to perform context action: ${action}`, { id: toastId });
      }
    } catch (err: any) {
      console.error(`Subscription ${action} execution fault ->`, err);
      const serverMessage = err.response?.data?.message || `Failed to process state shift with billing engine.`;
      toast.error(serverMessage, { id: toastId });
    } finally {
      setActionLoading(null);
    }
  };

  const handleSupportTicket = () => {
    toast.info("Opening enterprise communications channel...", { icon: "💬" });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/30 min-h-screen">
      {/* Top Hero Header Block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-700/10">
            <Sparkles className="h-3.5 w-3.5" /> Billing & Management
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your Memberships</h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor billing frequencies, update payment models, and browse architectural tier cycles.
          </p>
        </div>
      </div>

      {/* Primary Focus Card: Active Plan */}
      {isLoading && !history.length ? (
        <div className="flex items-center justify-center h-48 w-full bg-white rounded-2xl border border-slate-100 mb-12 shadow-sm shadow-slate-100">
          <Loader2 className="h-7 w-7 text-indigo-600 animate-spin" />
        </div>
      ) : activeMembership ? (
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <Card className="lg:col-span-2 overflow-hidden shadow-md shadow-slate-100 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/20">
            <CardHeader className="border-b border-slate-100/80 bg-white/60 backdrop-blur-sm px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-sm shadow-indigo-200">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">Active Membership Summary</CardTitle>
                    <CardDescription className="text-xs">Operational details for your active billing cycle</CardDescription>
                  </div>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase", statusBadgeClass(activeMembership.status))}>
                  {activeMembership.status === "created" || activeMembership.status === "active" ? "Active" : activeMembership.status}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid gap-y-6 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Current Tier</span>
                  <p className="text-xl font-bold text-slate-900 capitalize flex items-center gap-1">
                    {activeMembership.tier}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Cycles Allocated</span>
                  <p className="text-xl font-bold text-slate-900">{activeMembership.totalCount} Units</p>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Subscription Hash</span>
                  <p className="text-sm font-mono bg-slate-100/80 text-slate-700 px-2 py-0.5 rounded border border-slate-200/60 inline-flex items-center gap-1.5 w-fit max-w-full truncate">
                    {activeMembership.razorpaySubscriptionId}
                  </p>
                </div>

                <div className="sm:col-span-2 space-y-1 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" /> Validation Window
                  </span>
                  <p className="text-sm font-medium text-slate-800">
                    {formatDate(activeMembership.currentPeriodStart)} — {formatDate(activeMembership.currentPeriodEnd)}
                  </p>
                </div>
                <div className="sm:col-span-2 space-y-1 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Blueprint Profile Configuration</span>
                  <p className="text-xs font-mono text-slate-500 truncate">{activeMembership.membershipPlanId}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Center Widget */}
          <Card className="shadow-md shadow-slate-100 border-slate-200 bg-white">
            <CardHeader className="px-6 py-5 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900">Action Control Engine</CardTitle>
              <CardDescription className="text-xs">Dispatch instant adjustments over current parameters</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-75px)] gap-4">
              <p className="text-xs leading-relaxed text-slate-500">
                Altering configurations triggers system updates downstream. Reach customer operations if your gateway metrics go out of sync.
              </p>
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* ALTERED: Condition paths seamlessly handling toggle between Paused and Active modes */}
                  {activeMembership.status === 'paused' ? (
                    <Button 
                      variant="outline" 
                      disabled={actionLoading !== null}
                      onClick={() => handleLifecycleAction("resume", activeMembership.razorpaySubscriptionId)} 
                      className="border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all font-medium text-xs h-9"
                    >
                      <Play className="mr-1.5 h-3.5 w-3.5" /> Resume Plan
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled={actionLoading !== null}
                      onClick={() => handleLifecycleAction("pause", activeMembership.razorpaySubscriptionId)} 
                      className="border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all font-medium text-xs h-9"
                    >
                      <Pause className="mr-1.5 h-3.5 w-3.5" /> Pause Plan
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    disabled={actionLoading !== null}
                    onClick={() => handleLifecycleAction("cancel", activeMembership.razorpaySubscriptionId)} 
                    className="border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all font-medium text-xs h-9"
                  >
                    <XCircle className="mr-1.5 h-3.5 w-3.5" /> Terminate
                  </Button>
                </div>
                <Button variant="default" onClick={handleSupportTicket} className="w-full bg-slate-900 text-white hover:bg-slate-800 text-xs h-9 font-medium shadow-sm">
                  <HelpCircle className="mr-1.5 h-3.5 w-3.5" /> Open Enterprise Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="mb-12 border-dashed border-2 border-slate-200 shadow-none bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-base font-bold text-slate-900">No active structures detected</p>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Your profile is currently running under a guest execution scope. Initialize a tier configuration below to begin.
            </p>
          </CardContent>
        </Card>
      )}

      {/* History Ledger Section with Remote API Pagination */}
      <Card className="shadow-md shadow-slate-100 border-slate-200 overflow-hidden bg-white relative">
        <CardHeader className="px-6 py-5 border-b border-slate-100 bg-slate-50/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">Historical Matrix Ledger</CardTitle>
              <CardDescription className="text-xs">Immutable chronological register of structural runtimes</CardDescription>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search history ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-white border-slate-200 focus-visible:ring-indigo-500 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-x-auto min-h-[220px] relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
            </div>
          )}
          
          <table className="w-full border-collapse text-left text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="px-6 py-3.5 font-bold">Reference Archetype</th>
                <th className="px-6 py-3.5 font-bold">Billing Class</th>
                <th className="px-6 py-3.5 font-bold">State Mapping</th>
                <th className="px-6 py-3.5 font-bold">Active Interval</th>
                <th className="px-6 py-3.5 font-bold">Allocation Timeline</th>
                <th className="px-6 py-3.5 font-bold text-right">Operational Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length > 0 ? (
                history.map((membership) => {
                  const isRecordActive = activeMembership?._id === membership._id;
                  return (
                    <tr key={membership._id} className={cn("hover:bg-slate-50/80 transition-colors", isRecordActive && "bg-indigo-50/30 hover:bg-indigo-50/50")}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          {membership.planId}
                          {isRecordActive && <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full animate-pulse" />}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400 max-w-[160px] truncate">{membership.razorpaySubscriptionId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("font-semibold capitalize text-xs px-2 py-0.5 rounded-md tracking-tight", 
                          membership.tier === "professional" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                        )}>
                          {membership.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", statusBadgeClass(membership.status))}>
                          {membership.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                        <div>{formatDate(membership.currentPeriodStart)}</div>
                        <div className="text-[10px] text-slate-400 font-normal">to {formatDate(membership.currentPeriodEnd)}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        <span className="font-medium text-slate-800">{membership.totalCount} cycles</span>
                        <div className="text-[10px] text-slate-400">Created {formatDate(membership.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex gap-1.5">
                          {/* Row-level operations handling item history targets dynamically */}
                          {membership.status === 'paused' && (
                            <Button variant="outline" size="sm" onClick={() => handleLifecycleAction("resume", membership.razorpaySubscriptionId)} className="h-7 px-2 text-[11px] font-medium border-slate-200 text-emerald-600 hover:bg-emerald-50">
                              Resume
                            </Button>
                          )}
                          {(membership.status === 'active' || membership.status === 'created') && (
                            <Button variant="outline" size="sm" onClick={() => handleLifecycleAction("pause", membership.razorpaySubscriptionId)} className="h-7 px-2 text-[11px] font-medium border-slate-200 text-amber-600 hover:bg-amber-50">
                              Pause
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={handleSupportTicket} className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                    No membership records matched within current runtime configurations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Interactive Server-Priced Pagination Block */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-white">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                  className="text-xs"
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Showing <span className="font-semibold text-slate-800">{pagination.startIndex}</span> to{" "}
                    <span className="font-semibold text-slate-800">{pagination.endIndex}</span> of{" "}
                    <span className="font-semibold text-slate-800">{pagination.totalRecords}</span> archives
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                      variant="outline"
                      className="rounded-l-md rounded-r-none px-2 h-8 border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        className={cn(
                          "rounded-none h-8 w-8 p-0 text-xs font-semibold border-slate-200",
                          currentPage === page 
                            ? "bg-slate-900 text-white hover:bg-slate-800" 
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      className="rounded-r-md rounded-l-none px-2 h-8 border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                      disabled={currentPage === pagination.totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}