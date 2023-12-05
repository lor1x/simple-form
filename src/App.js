import { useEffect, useState } from "react";
import "./App.css";
import sectorsData from "./database/data.json";

function App() {
  const [editMode, setEditMode] = useState(true);

  const saveFormData = (e) => {
    e.preventDefault();

    const options = e.target[1].selectedOptions;
    const selectedSectors = Array.from(options).map(({ value }) => value);

    localStorage.setItem(
      "formData",
      JSON.stringify({
        name: e.target[0].value,
        sectors: selectedSectors,
        terms: e.target[2].value === "on",
      })
    );

    changeMode();
  };

  const changeMode = () => {
    setEditMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem("formData") !== null) setEditMode(false);
  }, []);

  return (
    <div className="App">
      <section className="container">
        <header>
          Please enter your name and pick the sectors you are currently involved
          in.
        </header>
        <form
          name="simple-form"
          className={`simpleForm ${!editMode && "simpleFormSaved"}`}
          onSubmit={saveFormData}
        >
          <div className="inputBox">
            <label>Name</label>
            <input
              name="name-input"
              type="text"
              readOnly={!editMode}
              placeholder="Enter your name"
              defaultValue={JSON.parse(localStorage.getItem("formData"))?.name}
              required
            />
          </div>
          <div className="inputBox">
            <label>Sectors</label>
            <select
              name="select-sectors"
              className="selectSectors"
              multiple
              placeholder="Sectors..."
              size="5"
              required
              defaultValue={
                JSON.parse(localStorage.getItem("formData"))?.sectors
              }
            >
              {sectorsData.map((data) => {
                return (
                  <option
                    key={data.value}
                    value={data.value}
                    disabled={!editMode}
                  >
                    {"\xa0".repeat(data.identation) + data.description}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="termsCheckbox">
            <input
              name="agree-to-terms"
              type="checkbox"
              disabled={!editMode}
              required
              defaultChecked={
                JSON.parse(localStorage.getItem("formData"))?.terms
              }
            />
            <label>Agree to terms</label>
          </div>

          <div className="inputBox">
            {!editMode && <button onClick={changeMode}>Edit</button>}
            {editMode && <button type="submit">Save</button>}
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
