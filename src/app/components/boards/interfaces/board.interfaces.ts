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

export enum RequestType {
  PRINTED = 'PRINTED',
  DIGITAL = 'DIGITAL',
  ECOMMERCE = 'ECOMMERCE',
  SPECIAL = 'SPECIAL',
}

export interface RequestCardProps {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  status: RequestStatus;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  priority: RequestPriority;
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
    color: string;
  };
  files?: string[];
  createdAt: string;
}