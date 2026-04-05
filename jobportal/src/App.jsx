import { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Google",
        location: "San Francisco, CA",
        salary: "$150K - $180K",
        tags: ["React", "TypeScript", "UI/UX"],
        applied: false,
      },
      {
        id: 2,
        title: "Data Scientist",
        company: "Amazon",
        location: "New York, NY",
        salary: "$140K - $170K",
        tags: ["Python", "ML", "AWS"],
        applied: false,
      },
    ]);
  }, []);

  const addJob = () => {
    if (!title || !company) {
      alert("⚠️ Fill all fields");
      return;
    }

    const duplicate = jobs.some(
      (job) => job.title === title && job.company === company
    );

    if (duplicate) {
      alert("⚠️ Job already exists");
      return;
    }

    const newJob = {
      id: Date.now(),
      title,
      company,
      location: "Remote",
      salary: "Contact for details",
      tags: ["New"],
      applied: false,
    };

    setJobs([newJob, ...jobs]);
    setTitle("");
    setCompany("");
  };

  const applyJob = (id) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, applied: true } : job
      )
    );
  };

  const deleteJob = (id) => {
    if (window.confirm("Delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const text =
      job.title +
      job.company +
      job.location +
      job.tags.join(" ");
    return text.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1>💼 JobHub</h1>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h2>Find Your Dream Job</h2>

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </section>

      {/* Add Job */}
      <div className="add-job-section">
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button onClick={addJob}>+ Post Job</button>

        <p>Total Jobs: {jobs.length}</p>
      </div>

      {/* Jobs */}
      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p className="company-name">{job.company}</p>

            <p>📍 {job.location}</p>
            <p>💰 {job.salary}</p>

            <div className="job-tags">
              {job.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <button
              className="apply-btn"
              disabled={job.applied}
              onClick={() => applyJob(job.id)}
            >
              {job.applied ? "✓ Applied" : "Apply"}
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteJob(job.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;