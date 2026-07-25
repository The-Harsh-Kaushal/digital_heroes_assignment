import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../Button/Button';

export const Pagination = ({ onPageChange, pagination }) => {
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.pages || 1;
  const total = pagination?.total || 0;

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-slate-600">
        Page {currentPage} of {Math.max(totalPages, 1)} · {total} total leads
      </p>
      <div className="flex items-center gap-2">
        <Button
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          variant="secondary"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          aria-label="Next page"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          variant="secondary"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
