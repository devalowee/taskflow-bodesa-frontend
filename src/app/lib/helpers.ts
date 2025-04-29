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
      return 'BAJA';
    case 'NORMAL':
      return 'NORMAL';
    case 'HIGH':
      return 'ALTA';
    case 'URGENT':
      return 'URGENTE';
    default:
      return 'BAJA';
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'BAJA':
      return 'bg-sky-200';
    case 'NORMAL':
      return 'bg-violet-400';
    case 'ALTA':
      return 'bg-amber-400';
    case 'URGENTE':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
}

export const resumeTo60Chars = (text: string) => {
  if (text.length > 60) {
    return `${ text.slice(0, 60).trim() }..`;
  }
  return text;
}
