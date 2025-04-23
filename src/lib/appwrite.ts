import { Account, Client, Databases, Storage, ID } from 'appwrite'
import { AppWrite } from './env'

const client = new Client()
client.setProject(AppWrite.proyectID)

const database = new Databases(client) // la base de datos
const storage = new Storage(client) //almacen donde se guarda la informacion en la base de datos
const account = new Account(client) // quien nos permite hacer login, register y mas

export{
    database, storage, account, ID
}