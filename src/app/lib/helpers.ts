import { RequestPriority, RequestStatus } from "../components/boards/interfaces/board.interfaces";

export const sanitizedSlug = (slug: string) => {
  return slug.replace(/-/g, ' ').charAt(0).toUpperCase() + slug.replace(/-/g, ' ').slice(1);
};

export const getInitials = (name: string | undefined) => {
  if (!name) return '';
  const parts = name.split(' ');
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '').toUpperCase();
}

export const getPriority = (priority: RequestPriority) => {
  switch (priority) {
    case 'LOW':
      return 'Baja';
    case 'NORMAL':
      return 'Normal';
    case 'HIGH':
      return 'Alta';
    case 'URGENT':
      return 'Urgente';
    default:
      return 'Baja';
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Baja':
      return 'bg-sky-200';
    case 'Normal':
      return 'bg-violet-400';
    case 'Alta':
      return 'bg-amber-400';
    case 'Urgente':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
}

export const resumeTo60Chars = (text: string) => {
  if (text.length > 60) {
    return `${ text.slice(0, 60).trim() }...`;
  }
  return text;
}

export enum Roles {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_DESIGN = 'ADMIN_DESIGN',
  ADMIN_PUBLISHER = 'ADMIN_PUBLISHER',
  PUBLISHER = 'PUBLISHER',
  DESIGNER = 'DESIGNER',
}

export const getStatus = (status: RequestStatus) => {
  switch (status) {
    case 'AWAITING':
      return 'Pendiente';
    case 'ATTENTION':
      return 'En progreso';
    case 'IN_PROGRESS':
      return 'En progreso';
    case 'PENDING':
      return 'Pendiente';
    case 'DONE':
      return 'Completada';
    default:
      return 'Pendiente';
  }
}

export const getDisponibility = (disponibility: string) => {
  switch (disponibility) {
    case 'AVAILABLE':
      return 'Disponible';
  }
}

export const allowedFileTypes = [
  '.jpg',
  '.png',
  '.pdf',
  '.jpeg',
  '.gif',
  '.webp',
  '.heic',
  '.mp3',
  '.mp4',
  '.mov',
  '.avi',
  '.webp',
  '.zip',
  '.wav',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.pdf',
  '.csv',
];

export const fileSize = 50 * 1024 * 1024; // 50MB

export const getFileExtension = (fileName: string) => {
  return '.' + fileName.split('.').pop()?.toLowerCase();
}