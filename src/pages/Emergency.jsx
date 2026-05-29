import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Emergency() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
      <div className="max-w-md w-full card p-8 md:p-10 shadow-card-hover border-red-100 border-2 bg-white">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 animate-pulse">
          <ShieldAlert size={36} />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
          Strategic Stockpile Portal
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">Emergency Supply Portal</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          To activate our fast-response strategic reserves during critical shortages, this secure portal requires direct facility authorization and a verified institutional account.
        </p>
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-xl mb-8 leading-normal font-medium text-left">
          ℹ️ Procurement managers can access emergency supply releases by logging in with their verified institution credentials. For direct support, dial <strong>1-800-123-4567</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/b2b" className="btn-outline flex-1 justify-center border-red-500 text-red-600 hover:bg-red-50 py-2.5 rounded-xl">
            <ArrowLeft size={16} /> Back to B2B
          </Link>
          <Link to="/login" className="btn-primary flex-1 justify-center bg-red-600 hover:bg-red-700 py-2.5 rounded-xl">
            Login to Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
