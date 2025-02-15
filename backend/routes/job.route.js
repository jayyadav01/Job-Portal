const express = require('express')
const { postJob, getAllJobs, getJobById, getAdminJob, updateJob } = require('../controllers/job.controller')
const isAuthenticated = require('../middleware/isAuthenticated')

const jobRouter = express.Router()

jobRouter.route('/post').post(postJob)
// jobRouter.route('/get/search').get(isAuthenticated, getSearchedJobs)
jobRouter.route('/get').get(getAllJobs)
jobRouter.route('/get/:id').get( getJobById)
jobRouter.route('/getadminjobs').get(isAuthenticated, getAdminJob)
jobRouter.route('/update/job/:id').put(isAuthenticated, updateJob)

module.exports = jobRouter