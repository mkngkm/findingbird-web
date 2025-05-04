import React from 'react';
import ReportItem from './report-item';
import { Report } from '../../../business/birdstrike/types';

interface ReportListProps {
  reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => (
  <div className="mx-auto">
    {reports.map((r) => (
      <ReportItem key={r.id} report={r} />
    ))}
  </div>
);

export default ReportList;
