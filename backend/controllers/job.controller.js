const Job = require("../model/job.model");

const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.query.id;

    console.log( 
      "Title => ",title,
      "\ndescription => ",description,
      "\nrequirements => ",requirements,
      "\nsalary => ",salary,
      "\nlocation => ",location,
      "\njobType => ",jobType,
      "\nexperience => ",experience,
      "\nposition => ",position,
      "\ncompanyId => ",companyId,
      "\nuserId => ",userId
    )
    
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId ||
      !userId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experience: Number(experience),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });

    return res.status(200).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllJobs = async (req,res) => {
  try{
    const jobs = await Job.find().populate({
      path: "company",
    })

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  }
  catch(error)
  {
    console.log(error);
  }
}

// const getSearchedJobs = async (req, res) => {
//   try {
//     const keyword = req.query.keyword || "";
//     const query = {
//       $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//       ],
//     }

//     const jobs = await Job.find(query)
//       .populate({
//         path: "company",
//       })
//       .sort({ createdAt: -1 });

//     if (!jobs) {
//       return res.status(404).json({
//         message: "Jobs not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       jobs,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    // .populate({
    //   path: 'applications'
    // })
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAdminJob = async (req, res) => {
  try {
    const adminId = req.query.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({
        createdAt: -1,
      });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found!",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const { title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId } = req.body;

    let updateData = { title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experience: Number(experience),
      position: Number(position),
      company: companyId };

    const updateJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job information updated.",
      updateJob,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postJob, getAllJobs, getJobById, getAdminJob, updateJob };
