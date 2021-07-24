import UserLocalStorageRepository from './application/secondary-port-adapter/UserLocalStorageRepository.js'
import UserApplicationService from './application/secondary-port-adapter/UserApplicationService.js'
//import { ReactApplication } from './application/primary-port-adapter/ReactApplication.js'
//import { VueApplication } from './application/primary-port-adapter/VueApplication.js'
import { CustomElementApplication } from './application/primary-port-adapter/CustomElementApplication.js'

const userLocalStorageRepository = new UserLocalStorageRepository()
const svc = new UserApplicationService(userLocalStorageRepository)

//ReactApplication(svc)
//VueApplication(svc)
CustomElementApplication(svc)