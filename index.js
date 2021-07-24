import UserLocalStorageRepository from "./port-adapter/secondary/UserLocalStorageRepository.js"
import UserApplicationService from './application/UserApplicationService.js'
import { VueApplication } from './port-adapter/primary/VueApplication.js'

const userLocalStorageRepository = new UserLocalStorageRepository()
const svc = new UserApplicationService(userLocalStorageRepository)

VueApplication(svc)
