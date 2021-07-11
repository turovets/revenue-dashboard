import { ReactNode } from 'react';

import './Report.scss'

export interface ReportsContainerProps {
  children?: ReactNode;
}

const ReportsContainer = ({
  children,
}: ReportsContainerProps) => {

  return (
    <div className="ReportsContainer-root">
      {children}
    </div>
  )
}

export default ReportsContainer;
