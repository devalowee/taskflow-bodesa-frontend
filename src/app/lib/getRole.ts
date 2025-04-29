export type Roles = 'SUPER_ADMIN' | 'ADMIN' | 'ADMIN_DESIGN' | 'ADMIN_PUBLISHER' | 'PUBLISHER' | 'DESIGNER'

export const getRole = (role: string) => {
  return role === 'ADMIN_DESIGN' ? 'Jefe de Diseño'
                : role === 'ADMIN_PUBLISHER' ? 'Jefe de Publicidad'
                : role === 'DESIGNER' ? 'Diseñador'
                : role === 'PUBLISHER' ? 'Publicista'
                : role === 'ADMIN' ? 'Administrador'
                : role === 'SUPER_ADMIN' ? 'Administrador +'
                : 'Invitado';
}

export const roles = ['SUPER_ADMIN', 'ADMIN', 'ADMIN_DESIGN', 'ADMIN_PUBLISHER', 'PUBLISHER', 'DESIGNER'];