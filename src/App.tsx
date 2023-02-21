import React, { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

interface IDetails {
  details: {
    remote: boolean;
    fullTime: boolean;
    largeCompany: boolean;
  };
}
interface IJob {
  id: number;
  jobTitle: string;
  description: string;
  city: string;
  details: IDetails;
}
const _formData = {
  jobTitle: "",
  description: "",
  city: "",
  details: {
    remote: false,
    fullTime: false,
    largeCompany: false,
  },
};

const backendUrl = "http://localhost:5557";

function App() {
  const [formData, setFormData] = useState(_formData);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const getJobs = async () => {
    const response = await axios.get(`${backendUrl}/jobs`);
    const _jobs = response.data;
    console.log(_jobs);
    setJobs(_jobs);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleFieldChange = (e: any, fieldName: string) => {
    const value = e.target.value;
    const checked = e.target.checked;
    // console.log(checked);

    switch (fieldName) {
      case "jobTitle":
        formData.jobTitle = value;
        break;

      case "description":
        formData.description = value;
        break;

      case "city":
        formData.city = value;
        break;

      case "remote":
        formData.details.remote = checked;
        break;

      case "fullTime":
        formData.details.fullTime = checked;
        break;

      case "largeCompany":
        formData.details.largeCompany = checked;
        break;
    }
    setFormData({ ...formData });
    // setFormData({ ..._Data });
    console.log(formData);
  };

  const handleDeleteJob = (job: IJob) => {
    (async () => {
      const response = await axios.delete(`${backendUrl}/jobs/${job.id}`);
      // const _jobs = response.data;
      // setJobs({ ..._jobs });
      getJobs();
    })();
  };

  const handleSaveForm = (e: any) => {
    e.preventDefault();
    // alert("Data saved already!");
    // console.log("saving!");
    (async () => {
      const response = await axios.post(`${backendUrl}/jobs`, formData);
      getJobs();
      formData.jobTitle = "";
      formData.description = "";
      // console.log(response);
      // setFormData(_formData);
      // setFormData({ ...formData });
    })();
  };
  return (
    <div className="App">
      <h1>Job Site</h1>

      <section>
        <form action="">
          <fieldset>
            <legend>New Job</legend>
            <div className="row">
              <label htmlFor="">Job Title</label>
              <div>
                <input
                  value={formData.jobTitle}
                  type="text"
                  onChange={(e) => handleFieldChange(e, "jobTitle")}
                />
              </div>
            </div>

            <div className="row">
              <label htmlFor="">Description</label>
              <div>
                <textarea
                  spellCheck="false"
                  value={formData.description}
                  onChange={(e) => handleFieldChange(e, "description")}
                />
              </div>
            </div>

            <div className="row">
              <label htmlFor="">City</label>
              <div>
                <select
                  onChange={(e) => handleFieldChange(e, "city")}
                  name=""
                  id=""
                  value={formData.city}
                >
                  <option value="">Please choose</option>
                  <option value="hamburg">Hamburg</option>
                  <option value="berlin">Berlin</option>
                  <option value="dresden">Dresden</option>
                  <option value="leipzig">Leipzig</option>
                </select>
              </div>
            </div>

            <div className="row">
              <label htmlFor="">Details</label>
              <div>
                <div>
                  <input
                    onChange={(e) => handleFieldChange(e, "remote")}
                    type="checkbox"
                    checked={formData.details.remote}
                  />{" "}
                  remote
                </div>
                <div>
                  <input
                    onChange={(e) => handleFieldChange(e, "fullTime")}
                    type="checkbox"
                    checked={formData.details.fullTime}
                  />{" "}
                  full-time
                </div>
                <div>
                  <input
                    onChange={(e) => handleFieldChange(e, "largeCompany")}
                    type="checkbox"
                    checked={formData.details.largeCompany}
                  />{" "}
                  large company
                </div>
              </div>
            </div>

            <div className="buttonRow">
              <button onClick={(e) => handleSaveForm(e)}>Save</button>
            </div>
          </fieldset>
        </form>
        <div className="currentJobs">
          <h1>There are {jobs.length} Jobs:</h1>
        </div>
        <div className="currentJobs">
          {jobs.map((job: IJob) => {
            return (
              <div className="job" key={job.id}>
                <div className="title">
                  {job.jobTitle} (
                  <span onClick={() => handleDeleteJob(job)} className="delete">
                    delete
                  </span>
                  )
                </div>
                {/* <div>{job.description}</div> */}
              </div>
            );
          })}
        </div>
        <div className="debuggingArea">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}

export default App;
