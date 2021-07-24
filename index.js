import UserLocalStorageRepository from './application/secondary-port-adapter/UserLocalStorageRepository.js'
import UserApplicationService from './application/secondary-port-adapter/UserApplicationService.js'
//import { ReactApplication } from './application/primary-port-adapter/ReactApplication.js'
import { VueApplication } from './application/primary-port-adapter/VueApplication.js'

const userLocalStorageRepository = new UserLocalStorageRepository()
const svc = new UserApplicationService(userLocalStorageRepository)

//ReactApplication(svc)
VueApplication(svc)