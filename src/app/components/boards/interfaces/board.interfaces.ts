export enum RequestStatus {
  AWAITING = 'AWAITING',
  ATTENTION = 'ATTENTION',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING  = 'PENDING',
  DONE = 'DONE',
}

export enum RequestPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface RequestCardProps {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  priority: RequestPriority | string;
  finishDate: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar: string;
  };
  board: {
    id: string;
    name: string;
    initials: string;
  };
  files?: string[];
  createdAt: string;
}