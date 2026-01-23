import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import SkillGapChart from '../components/SkillGapChart';
import ProgressBar from '../components/ProgressBar';
import { ResumeContext } from '../context/ResumeContext';

const Report = () => {
  const [matchedskills, setMatchedSkills] = useState([]);
  const [unmatchedskills, setUnmatchedSkills] = useState([]);
  const [matchedPercentage, setMatchedPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {resume} = useContext(ResumeContext)
  
  const { opportunityId } = useParams();
  const navigate = useNavigate();

  const isResumeEmpty = !resume || (Array.isArray(resume) && resume.length === 0);

  const fetchSkillGap = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/skillgap/analyze/${opportunityId}`);
      const data = res.data.data;
      setMatchedSkills(data.matchedSkills || []);
      setUnmatchedSkills(data.missingSkills || []);
      setMatchedPercentage(data.matchPercentage || 0);
    } catch (error) {
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch skill gap if we have a resume
    if (!isResumeEmpty) {
      fetchSkillGap();
    } else {
      setIsLoading(false);
    }
  }, [opportunityId, isResumeEmpty]);

  const createRoadmap = async () => {
    try {
      const res = await axiosInstance.get(`/roadmap/generate/${opportunityId}`);
      console.log("Roadmap Generated:", res.data);
      // Optional: navigate to the roadmap view
      navigate('/Dashboard')
    } catch (error) {
      console.error(error);
    }
  };

  if (isResumeEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-md text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            📄
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Resume Missing</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            To analyze your skill gap and generate a custom roadmap for **SkillBridge**, we first need to see your experience.
          </p>
          <button 
            onClick={() => navigate('/Resume')}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Upload Resume
          </button>
        </div>
      </div>
    );
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Analyzing your skills...</p>
        </div>
      </div>
    );
  }

  if (matchedskills.length === 0 && unmatchedskills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No roadmap required</h2>
          <p className="text-slate-500 mb-6">You're already a perfect match for this opportunity! No skill gaps detected.</p>
          <button 
            onClick={() => navigate('/opportunities')}
            className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-2xl font-extrabold text-slate-800 mb-6">Analysis Report</h1>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Overall Match</span>
              <span className="text-3xl font-black text-indigo-600">{matchedPercentage}%</span>
            </div>
            <ProgressBar value={matchedPercentage} />
          </div>
        </div>

        {/* Chart & Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <SkillGapChart matchedCount={matchedskills.length} unmatchedCount={unmatchedskills.length}/>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col justify-center">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Ready to bridge the gap?</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              We've identified <b>{unmatchedskills.length}</b> skills you can improve to increase your chances.
            </p>
            <button 
              onClick={createRoadmap}
              className="group relative w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <span>Create AI Roadmap</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Path 17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;