import { LoaderCircle } from "lucide-react";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { formatDate } from "../../utils/formatters";

const statuses = ["new", "contacted", "closed"];

export const LeadTable = ({ leads, onStatusChange, updatingId }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {[
              "Name",
              "Email",
              "Budget",
              "Message",
              "Status",
              "Created At",
              "Action",
            ].map((heading) => (
              <th
                className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.18em] text-slate-500"
                key={heading}
                scope="col"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {leads.map((lead) => (
            <tr className="transition hover:bg-slate-50" key={lead._id}>
              <td className="whitespace-nowrap px-5 py-4">
                <p className="font-black text-slate-950">{lead.name}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                {lead.email}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-700">
                {lead.budget}
              </td>
              <td className="max-w-xs px-5 py-4">
                <div className="group relative">
                  <p className="truncate text-sm leading-6 text-slate-600">
                    {lead.message || "No message"}
                  </p>

                  <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-80 rounded-lg bg-slate-900 p-3 text-sm text-white shadow-lg group-hover:block whitespace-normal break-words">
                    {lead.message || "No message"}
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                {formatDate(lead.createdAt)}
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <label className="sr-only" htmlFor={`status-${lead._id}`}>
                  Change status for {lead.name}
                </label>
                <div className="relative">
                  <select
                    className="focus-ring h-10 rounded-full border border-slate-200 bg-white px-3 pr-9 text-sm font-bold capitalize text-slate-700 shadow-sm transition hover:border-slate-300 disabled:opacity-60"
                    disabled={updatingId === lead._id}
                    id={`status-${lead._id}`}
                    onChange={(event) =>
                      onStatusChange(lead._id, event.target.value, lead.status)
                    }
                    value={lead.status}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {updatingId === lead._id ? (
                    <LoaderCircle className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-600" />
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
