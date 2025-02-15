const Company = require("../model/company.model");
const getDataUri = require("../utils/datauri");
const Cloudinary = require("../utils/cloudnary");

const registerComapany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const userId = req.query.id;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      created_by: userId,
    });

    return res.status(200).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.query.id;

    const companies = await Company.find({ created_by : userId });

    if (!companies) {
      return res.status(401).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res.status(401).json({
        message: "company Id is not provided",
        success: false,
      });
    }
    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, website, location } = req.body;

    let updateData = { name, description, website, location};

    if(req.file)
    {
      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await Cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;
      updateData = {...updateData, logo}
    }

    const updateCompany = await Company.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      updateCompany,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerComapany,
  getCompany,
  getCompanyById,
  updateCompany,
};
