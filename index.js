import UserLocalStorageRepository from "./port-adapter/secondary/UserLocalStorageRepository.js"
import UserApplicationService from './application/UserApplicationService.js'
import { CustomElementApplication } from './port-adapter/primary/CustomElementApplication.js'
const userLocalStorageRepository = new UserLocalStorageRepository()
const svc = new UserApplicationService(userLocalStorageRepository)

CustomElementApplication(svc)
