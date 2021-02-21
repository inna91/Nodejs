const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(data)
    return parsedContacts
  } catch (err) {
    console.log(err.message)
  }
}

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(data)
    const contactById = parsedContacts.find(
      contact => contact.id === Number(contactId),
    )

    if (!contactById) {
      console.log(`Such contact with id: ${contactId} is not found`)
    }

    return contactById
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(data.toString())
    const contacts = parsedContacts.filter(
      contact => contact.id !== Number(contactId),
    )

    if (parsedContacts.length === contacts.length) {
      console.log(`Such contact with id: ${contactId} is not found`)
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(data)

    const contactId = parsedContacts[parsedContacts.length - 1].id + 1
    const newContact = { id: contactId, name, email, phone }
    parsedContacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts))
    return parsedContacts
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(data)

    const contacts = parsedContacts.map(contact =>
      contact.id === Number(contactId) ? { ...contact, ...body } : contact,
    )
    const updateOneContact = contacts.find(
      contact => contact.id === Number(contactId),
    )
    if (updateOneContact) {
      await fs.writeFile(contactsPath, JSON.stringify(contacts))
      return updateOneContact
    }
    return false
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
