export const sanitizedSlug = (slug: string) => {
  return slug.replace(/-/g, ' ').charAt(0).toUpperCase() + slug.replace(/-/g, ' ').slice(1);
};

export const getInitials = (name: string | undefined) => {
  if (!name) return '';
  const parts = name.split(' ');
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '').toUpperCase();
}

export const getPriority = (priority: string) => {
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