import { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

interface IJobs {
  jobTitle: string;
  description: string;
}
const _formData = {
  jobTitle: "",
  description: "",
};

const backendUrl = "http://localhost:5557";

function App() {
  const [formData, setFormData] = useState(_formData);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${backendUrl}/jobs`);
      const _jobs = response.data;
      console.log(_jobs);
      setJobs(_jobs);
    })();
  }, []);
  const handleFieldChange = (e: any, fieldName: string) => {
    const _Data = e.target.value;

    switch (fieldName) {
      case "jobTitle":
        formData.jobTitle = _Data;
        break;

      case "description":
        formData.description = _Data;
        break;
    }
    setFormData({ ...formData });
    // setFormData({ ..._Data });
    console.log(formData);
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
            <div className="buttonRow">
              <button>Save</button>
            </div>
          </fieldset>
        </form>
        <div className="currentJobs">
          <h1>There are {jobs.length} Jobs.</h1>
        </div>
        <div className="currentJobs">
          {jobs.map((job: IJobs) => {
            return (
              <>
                <div>{job.jobTitle}</div>
                <div>{job.description}</div>
              </>
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
