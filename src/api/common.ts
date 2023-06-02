import RequestHttp from '../utils/http/service'

export const uploadToken = () => RequestHttp.post('/open/getUploadToken')
