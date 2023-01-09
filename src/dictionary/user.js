
export const userStatus = {
    normal: { value: 0, desc: '正常' },
    forbidden: { value: 1, desc: '禁用' }
}
  
export const userStatusValues = Object.values(userStatus).map(item => item.value)
  
export const userPermissionChangeType = {
    forbid: { value: 'forbid', desc: '禁用' },
    authorize: { value: 'authorize', desc: '授权' }
}
  
export const userPermissionChangeTypeValues = Object.values(userPermissionChangeType).map(item => item.value)
  
export const userprojectRoles = {
    admin: { value: 'admin', desc: "管理员"},
    common: { value: 'common', desc: "普通用户"},
}

export const userprojectRolesValues = Object.values(userprojectRoles).map(item => item.value)