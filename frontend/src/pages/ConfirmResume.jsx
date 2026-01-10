import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const ConfirmResume = ({ resumeId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/resume/${resumeId}`);
    console.log(res.data);
    setSkills(res.data.data.skills);
    setEducation(res.data.data.education);
    setExperience(res.data.data.experience);
    setProjects(res.data.data.projects);
    console.log("Data Fetched Succesfully");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full space-y-10">

      {/* Skill Section */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>

        {skills.map((item, index) => {
          return isEdit ? (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={item.name}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setSkills(prev =>
                    prev.map((skill, i) =>
                      i === index
                        ? { ...skill, name: e.target.value }
                        : skill
                    )
                  )
                }
              />

              <input
                type="text"
                value={item.level}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setSkills(prev =>
                    prev.map((skill, i) =>
                      i === index
                        ? { ...skill, level: e.target.value }
                        : skill
                    )
                  )
                }
              />
            </div>
          ) : (
            <div key={index} className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div>
                <label className="text-sm font-medium text-gray-500">Skill Name</label>
                <p className="text-gray-800">{item.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Skill Level</label>
                <p className="text-black">{item.level}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Section */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Projects</h3>

        {projects.map((item, index) => {
          return isEdit ? (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={item.title}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setProjects(prev =>
                    prev.map((project, i) =>
                      i === index
                        ? { ...project, title: e.target.value }
                        : project 
                    )
                  )
                }
              />

              <input
                type="text"
                value={item.description}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setProjects(prev =>
                    prev.map((project, i) =>
                      i === index
                        ? { ...project, description: e.target.value }
                        : project
                    )
                  )
                }
              />
            </div>
          ) : (
            <div key={index} className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div>
                <label className="text-sm font-medium text-gray-500">Project Name</label>
                <p className="text-gray-800">{item.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Project Description</label>
                <p className="text-black">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Education Section */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Education</h3>

        {education.map((item, index) => {
          return isEdit ? (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={item.degree}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setEducation(prev =>
                    prev.map((education, i) =>
                      i === index
                        ? { ...education, degree: e.target.value }
                        : education
                    )
                  )
                }
              />

              <input
                type="text"
                value={item.year}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setEducation(prev =>
                    prev.map((education, i) =>
                      i === index
                        ? { ...education, year: e.target.value }
                        : education
                    )
                  )
                }
              />
            </div>
          ) : (
            <div key={index} className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div>
                <label className="text-sm font-medium text-gray-500">Degree Name</label>
                <p className="text-gray-800">{item.degree}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Year of Joining</label>
                <p className="text-black">{item.year}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Experience Section */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Experience</h3>

        {experience.map((item, index) => {
          return isEdit ? (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={item.role}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setExperience(prev =>
                    prev.map((experience, i) =>
                      i === index
                        ? { ...experience, role: e.target.value }
                        : experience
                    )
                  )
                }
              />

              <input
                type="text"
                value={item.company}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setExperience(prev =>
                    prev.map((experience, i) =>
                      i === index
                        ? { ...experience, company: e.target.value }
                        : experience
                    )
                  )
                }
              />
            </div>
          ) : (
            <div key={index} className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div>
                <label className="text-sm font-medium text-gray-500">Current Role</label>
                <p className="text-gray-800">{item.role}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Company Name</label>
                <p className="text-black">{item.company}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};


export default ConfirmResume;
