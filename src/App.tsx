import { useState } from "react";
import { Value } from "sass";
import "./App.scss";

interface IFormData {
  jobTitle: string;
  description: string;
}
const _formData = {
  jobTitle: "",
  description: "",
};

function App() {
  const [formData, setFormData] = useState(_formData);

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
                  value={formData.description}
                  onChange={(e) => handleFieldChange(e, "description")}
                />
              </div>
            </div>
          </fieldset>
        </form>

        <div className="debuggingArea">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}

export default App;
