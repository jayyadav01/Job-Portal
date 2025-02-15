const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated')
const { registerComapany, getCompany, updateCompany, getCompanyById } = require('../controllers/company.controller')
const singleupload = require('../middleware/multer')

const companyRouter = express.Router()

companyRouter.route('/register').post(registerComapany)
companyRouter.route('/get').get(isAuthenticated, getCompany)
companyRouter.route('/get/:id').get(isAuthenticated, getCompanyById)
companyRouter.route('/update/:id').put(isAuthenticated, singleupload, updateCompany)

module.exports = companyRouter