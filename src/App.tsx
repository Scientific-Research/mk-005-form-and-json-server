import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1>Job Site</h1>
      <form action="">
        <fieldset>
          <legend>New Job</legend>
          <div className="row">
            <label htmlFor="">Job Title</label>
            <div>
              <input type="text" />
            </div>
          </div>

          <div className="row">
            <label htmlFor="">Description</label>
            <div>
              <textarea />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
