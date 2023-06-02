import RequestHttp from '../utils/http/service'

export const login = (data) => RequestHttp.post('/open/login', data)

export const userList = () => RequestHttp.post('/user/list')

export const editPassword = (data) => RequestHttp.post('/user/updatePassword', data)

export const uploadAvatar = (data) => RequestHttp.post('/common/upload', data)

export const updateUserInfo = (data) => RequestHttp.post('/user/updateUserInfo', data)
