const express = require('express')
const { applyJob, getAppliedJobs, getApplicants, statusUpdate } = require('../controllers/application.controller')
const isAuthenticated = require('../middleware/isAuthenticated')
const applicationRouter = express.Router()

applicationRouter.route('/apply/:id').get(applyJob)
applicationRouter.route('/get').get(getAppliedJobs)
applicationRouter.route('/:id/applicants').get(getApplicants)
applicationRouter.route('/status/:id/update').patch(statusUpdate) 

module.exports = applicationRouter