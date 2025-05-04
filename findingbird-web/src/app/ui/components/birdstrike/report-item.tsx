import React from 'react';
import { Report } from '../../../business/birdstrike/types';

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => (
  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-2">
    <div>
      <h3 className="text-lg font-medium text-gray-800">{report.title}</h3>
      <p className="text-sm text-gray-500">{report.date}</p>
    </div>
    <span className="text-sm text-gray-700">{report.author}</span>
  </div>
);

export default ReportItem;