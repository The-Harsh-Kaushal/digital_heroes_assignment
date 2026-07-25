import {
  CheckCircle2,
  CircleDot,
  Inbox,
  MessageSquareMore,
  RefreshCcw,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { StatCard } from '../../components/Admin/StatCard';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { AdminLayout } from '../../components/Layout/AdminLayout';
import { LeadTable } from '../../components/LeadTable/LeadTable';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Select } from '../../components/Select/Select';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import {
  changeLeadStatus,
  getLeads,
} from '../../services/adminService';
import { getApiErrorMessage } from '../../utils/formatters';

const limit = 10;
const statusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Closed', value: 'closed' },
];

const emptyPagination = {
  total: 0,
  page: 1,
  limit,
  pages: 0,
};

export const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState(emptyPagination);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
  });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState('');

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [leadResponse, statsResponse] = await Promise.all([
        getLeads({
          page,
          limit,
          ...(status ? { status } : {}),
        }),
        getLeads({ page: 1, limit: 100 }),
      ]);

      const statsLeads = statsResponse.leads || [];

      setLeads(leadResponse.leads || []);
      setPagination(leadResponse.pagination || emptyPagination);
      setStats({
        total: statsResponse.pagination?.total || statsLeads.length,
        new: statsLeads.filter((lead) => lead.status === 'new').length,
        contacted: statsLeads.filter((lead) => lead.status === 'contacted').length,
        closed: statsLeads.filter((lead) => lead.status === 'closed').length,
      });
    } catch (fetchError) {
      setError(getApiErrorMessage(fetchError, 'Unable to load leads'));
    } finally {
      setIsLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchDashboard, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchDashboard]);

  const filteredLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return leads;
    }

    return leads.filter((lead) =>
      [lead.name, lead.email, lead.budget, lead.message]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    );
  }, [leads, search]);

  const handleStatusFilter = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleStatusChange = async (id, nextStatus, previousStatus) => {
    if (nextStatus === previousStatus) {
      return;
    }

    setUpdatingId(id);

    try {
      const response = await changeLeadStatus(id, nextStatus);
      const updatedLead = response.lead;

      setLeads((currentLeads) => {
        const nextLeads = currentLeads.map((lead) =>
          lead._id === id ? updatedLead : lead,
        );

        if (status && nextStatus !== status) {
          return nextLeads.filter((lead) => lead._id !== id);
        }

        return nextLeads;
      });
      setStats((currentStats) => ({
        ...currentStats,
        [previousStatus]: Math.max((currentStats[previousStatus] || 0) - 1, 0),
        [nextStatus]: (currentStats[nextStatus] || 0) + 1,
      }));
      toast.success('Lead status updated');
    } catch (statusError) {
      toast.error(getApiErrorMessage(statusError, 'Unable to update status'));
    } finally {
      setUpdatingId('');
    }
  };

  const statsConfig = [
    { icon: Inbox, label: 'Total Leads', value: stats.total, tone: 'slate' },
    { icon: CircleDot, label: 'New', value: stats.new, tone: 'blue' },
    {
      icon: MessageSquareMore,
      label: 'Contacted',
      value: stats.contacted,
      tone: 'amber',
    },
    { icon: CheckCircle2, label: 'Closed', value: stats.closed, tone: 'emerald' },
  ];

  return (
    <AdminLayout>
      <section className="page-shell py-8 sm:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
              Lead command center
            </h1>
          </div>
          <Button
            icon={RefreshCcw}
            isLoading={isLoading}
            onClick={fetchDashboard}
            variant="secondary"
          >
            Refresh
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? [1, 2, 3, 4].map((item) => (
                <Skeleton className="h-32 rounded-[2rem]" key={item} />
              ))
            : statsConfig.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="grid gap-4 border-b border-slate-200 p-5 lg:grid-cols-[1fr_220px]">
            <SearchBar onChange={setSearch} value={search} />
            <Select
              id="status-filter"
              label=""
              onChange={(event) => handleStatusFilter(event.target.value)}
              options={statusOptions}
              value={status}
            />
          </div>

          {isLoading ? (
            <div className="space-y-3 p-5">
              <Loader label="Loading leads" />
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton className="h-16" key={item} />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black text-slate-950">{error}</p>
              <p className="mt-2 text-slate-600">
                Check your session and API connection, then try again.
              </p>
              <Button className="mt-5" onClick={fetchDashboard} variant="secondary">
                Try again
              </Button>
            </div>
          ) : filteredLeads.length ? (
            <>
              <LeadTable
                leads={filteredLeads}
                onStatusChange={handleStatusChange}
                updatingId={updatingId}
              />
              <Pagination onPageChange={setPage} pagination={pagination} />
            </>
          ) : (
            <div className="p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-brand-50 text-brand-600">
                <Inbox className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">
                No leads found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-slate-600">
                New submissions will appear here as soon as prospects complete
                the LeadDesk form.
              </p>
            </div>
          )}
        </Card>
      </section>
    </AdminLayout>
  );
};
