import React, { useState } from "react";

const Formularz = () => {
  const [formData, setFormData] = useState({
    sex: "M",
    age: "15",
    famsize: "LT3",
    Pstatus: "T",
    Medu: "3",
    Fedu: "3",
    Mjob: "other",
    Fjob: "other",
    reason: "reputation",
    guardian: "mother",
    traveltime: "1",
    studytime: "2",
    failures: "0",
    schoolsup: "1",
    famsup: "1",
    paid: "1",
    activities: "0",
    nursery: "0",
    higher: "1",
    internet: "1",
    romantic: "0",
    famrel: "3",
    freetime: "3",
    goout: "3",
    Dalc: "3",
    Walc: "3",
    health: "3",
    absences: "10",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  function setInnerHTML(elm, html) {
    elm.innerHTML = html;

    Array.from(elm.querySelectorAll("script")).forEach((oldScriptEl) => {
      const newScriptEl = document.createElement("script");

      Array.from(oldScriptEl.attributes).forEach((attr) => {
        newScriptEl.setAttribute(attr.name, attr.value);
      });

      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);

      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const ageRegex = /^[0-9]+$/;

    // Validation of "age"
    if (formData.age.trim() === "" || !formData.age.match(ageRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Please enter a valid age (number)",
      }));
      return;
    }

    console.log(formData)

    fetch("http://localhost:8001/v1/dashboard/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const html = await response.text();
        console.log(html);
        setInnerHTML(document.getElementById("explanation"), html);
        // console.log(await response.text());
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formFields = {
    sex: "Sex",
    age: "Age",
    famsize: "Family Size",
    Pstatus: "Parents' Separation Status",
    Medu: "Mother's Education",
    Fedu: "Father's Education",
    Mjob: "Mother's Job",
    Fjob: "Father's Job",
    reason: "Reason for Choosing the School",
    guardian: "Legal Guardian",
    traveltime: "Travel Time to School",
    studytime: "Study Time",
    failures: "Number of Past Failures",
    schoolsup: "School's Extra Educational Support",
    famsup: "Family Educational Support",
    paid: "Paid Extra Classes",
    activities: "Extracurricular Activities",
    nursery: "Attended Nursery School",
    higher: "Desire for Higher Education",
    internet: "Internet Access at Home",
    romantic: "In a Romantic Relationship",
    famrel: "Family Relationship Quality",
    freetime: "Amount of Free Time",
    goout: "Time Spent Going Out with Friends",
    Dalc: "Weekday Alcohol Consumption",
    Walc: "Weekend Alcohol Consumption",
    health: "Health Status",
    absences: "Number of School Absences",
};

  const RadioButton = ({ name, value, onChange, style }) => {
    return (
        <input class='radiobtn' type='radio' checked={formData[name]===value} name={name} onChange={onChange} style={style} value={value}/>
    );
  };

  const input_type = (key, value) => {
    switch(key){
      case 'sex':
        return(
          <div>
            <span>Man</span><RadioButton name={key} value='M' onChange={handleChange} style={styles.input}/>
            <span>Woman</span><RadioButton name={key} value='F' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'famsize':
        return (
        <div>
          <span>Less than 4 people</span><RadioButton name={key} value='LE3' onChange={handleChange} style={styles.input}/>
          <span>4 or more people</span><RadioButton name={key} value='GT3' onChange={handleChange} style={styles.input}/>
        </div>
        )
      case 'Pstatus':
          return (
          <div>
            <span>Live together</span><RadioButton name={key} value='T' onChange={handleChange} style={styles.input}/>
            <span>In separation</span><RadioButton name={key} value='A' onChange={handleChange} style={styles.input}/>
          </div>
          )
      case 'Medu':
      case 'Fedu':
        return (
        <div>
          <span>None</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/>
          <span>Primary</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
          <span>Lower Secondary</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
          <span>Upper Secondary</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
          <span>Higher Education</span><RadioButton name={key} value='4' onChange={handleChange} style={styles.input}/>
        </div>
        )
      case 'Mjob':
      case 'Fjob':
        return (
          <div>
            <span>Home Work</span><RadioButton name={key} value='at_home' onChange={handleChange} style={styles.input}/>
            <span>Other</span><RadioButton name={key} value='other' onChange={handleChange} style={styles.input}/>
            <span>Health Services</span><RadioButton name={key} value='health' onChange={handleChange} style={styles.input}/>
            <span>Teacher</span><RadioButton name={key} value='teacher' onChange={handleChange} style={styles.input}/>
            <span>Services</span><RadioButton name={key} value='services' onChange={handleChange} style={styles.input}/>
          </div>
          )
      case 'reason':
        return (
          <div>
            <span>Near Home</span><RadioButton name={key} value='close' onChange={handleChange} style={styles.input}/>
            <span>Preferred Program</span><RadioButton name={key} value='course' onChange={handleChange} style={styles.input}/>
            <span>School Reputation</span><RadioButton name={key} value='reputation' onChange={handleChange} style={styles.input}/>
            <span>Other</span><RadioButton name={key} value='other' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'guardian':
        return (
          <div>
            <span>Mother</span><RadioButton name={key} value='mother' onChange={handleChange} style={styles.input}/>
            <span>Father</span><RadioButton name={key} value='father' onChange={handleChange} style={styles.input}/>
            <span>Other</span><RadioButton name={key} value='other' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'traveltime':
        return (
          <div>
            <span>Less than 15 minutes</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/> 
            <span>15 to 30 minutes</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>30 minutes to 1 hour</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>More than 1 hour</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'studytime':
        return (
          <div>
            <span>Less than 2 hours</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/>
            <span>2 to 5 hours</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>5 to 10 hours</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>More than 10 hours</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'schoolsup':
      case 'famsup':
      case 'paid':
      case 'activities':
      case 'nursery':
      case 'higher':
      case 'internet':
      case 'romantic':
        return(
          <div>
            <span>Yes</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>No</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'famrel':
      case 'health':
        return(
          <div>
            <span>Very Poor</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>Poor</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>Average</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
            <span>Good</span><RadioButton name={key} value='4' onChange={handleChange} style={styles.input}/>
            <span>Excellent</span><RadioButton name={key} value='5' onChange={handleChange} style={styles.input}/>
          </div>
        )

      case 'freetime':
      case 'goout':
      case 'Dalc':
      case 'Walc':
        return(
          <div>
            <span>Very Little</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/> 
            <span>Little</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>Average</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
            <span>Many</span><RadioButton name={key} value='4' onChange={handleChange} style={styles.input}/>
            <span>Very Many</span><RadioButton name={key} value='5' onChange={handleChange} style={styles.input}/>
          </div>
        )

      default:  
        return (<input
          type="text"
          id={key}
          name={key}
          value={value}
          onChange={handleChange}
          style={styles.input}
        />)
    }
  }

  return (
    <div style={styles.root}>
      <span style={styles.title}>How can I improve my grades?</span>
      <form onSubmit={handleSubmit} style={styles.form}>
        <table>
          <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <tr key={key}>
                <td>
                  <label htmlFor={key} style={styles.label}>
                    {formFields[key]}
                  </label>
                </td>
                <td>
                  {input_type(key, value)}

                  {errors[key] && (
                    <span style={styles.error}>{errors[key]}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={styles.button}>
          Check
        </button>
      </form>
      <div id="explanation"></div>
    </div>
  );
};

const colorPrimary = '#ebe0d6';
const colorSecondary = '#6d4c3d';
const colorTertiary = '#ebe0d6';

const styles = {
  root: {
    height: '100vw',
    width: '100vw',
    backgroundColor: colorPrimary,
    color: colorTertiary,
    display:'flex',
    flexDirection: 'column'
  },
  title: {
    color: colorPrimary,
    backgroundColor: colorSecondary,
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
    width: "1000px",
    padding: '15px',
    borderRadius: '25px',
    alignItems: "center",
    fontSize: '25px',
  },
  form: {
    backgroundColor: colorSecondary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: '10px auto',
    width: "1000px",
    padding: '15px',
    borderRadius: '25px',
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    border: `1px solid ${colorSecondary}`,
    color: colorSecondary,
    borderRadius: "4px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: colorTertiary,
    color: colorSecondary,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "5px",
  },
};

export default Formularz;
