import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    searchQuery: "",
    filterApplied: false,
    searchableFilterApplied: false,
    allJobs: [],
    filterJobs: [],
    searchableJobs: [],
    allAdminJobs: [],
    allAppliedJobs: [],
    singleJob: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterApplied: (state, action) => {
      state.filterApplied = action.payload;
    },
    setSearchableFilterApplied: (state, action) => {
      state.searchableFilterApplied = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setFilterJobs: (state, action) => {
      state.filterJobs = action.payload;
    },
    setSearchableJobs: (state, action) => {
      state.searchableJobs = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload
  },
  },
});

export const {
  setSearchQuery,
  setFilterApplied,
  setSearchableFilterApplied,
  setAllJobs,
  setFilterJobs,
  setSearchableJobs,
  setAdminJobs,
  setAllAppliedJobs,
  setSingleJob
} = jobSlice.actions;
export default jobSlice.reducer;
