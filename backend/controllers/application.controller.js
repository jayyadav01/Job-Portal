const Application = require("../model/application.model");
const Job = require("../model/job.model");

const applyJob = async (req, res) => {
  try {
    const userId = req.query.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job Id is not Provided.",
        success: false,
      });
    }

    const existingApplicant = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplicant) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        status: false,
      });
    }
    const newApplicant = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplicant._id);
    await job.save();

    return res.status(200).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(404).json({
        message: "User Id is not provided.",
        success: false,
      });
    }

    const appliedJobs = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (appliedJobs.length == 0) {
      return res.status(404).json({
        message: "No apply for any jobs",
        success: false,
      });
    }

    return res.status(200).json({
      appliedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(404).json({
        message: "Job id not found",
        status: false,
      });
    }

    const applicants = await Application.find({ job: jobId }).populate({
      path: 'applicant',
      options: { sort: { createdAt: -1 } },
    });

    if (!applicants) {
      return res.status(400).json({
        message: "Applicants not found.",
        status: false,
      });
    }

    return res.status(200).json({
      applicants,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const statusUpdate = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(404).json({
        message: "Status id not provided.",
        success: false,
      });
    }

    const applicant = await Application.findById(applicationId);

    if (!applicant) {
      return res.status(404).json({
        message: "Applicant not found.",
        success: false,
      });
    }

    applicant.status = status.toLowerCase();
    await applicant.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { applyJob, getAppliedJobs, getApplicants, statusUpdate };
