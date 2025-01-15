import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// import countries from '../data/countries.json';
// import '../css/SubmitForm.css'

const EmployeeExtForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { email, projectNumber, subject, title, selectedCountries, companyPairs } = location.state || {};
    const [jobTitles, setJobTitles] = useState([{ jobTitle: '', type: '' }]);

    const formData = {
        email,
        projectNumber,
        subject,
        title,
        selectedCountries,
        // companyPairs,
        jobTitles
    };

    const [loading, setLoading] = useState(false);

    const companyTypeOptions = ['former', 'current', 'both'];

    const [selectedURL, setSelectedURL] = useState("");

    const handleSelectChange = (event) => {
        const selectedCompany = companyPairs.find(
            (pair) => pair.companyName === event.target.value
        );
        setSelectedURL(selectedCompany?.companyURL || "");
    };

    const handleNewProject = () => {

        navigate('/', { state: {} });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // try {
        //     const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/employees`, formData, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //     console.log('Success:', response.data);
        // } catch (error) {
        //     console.error('Error:', error);
        // } finally {
        //     setLoading(false);
        // }

        console.log('Form2 Data Submitted:', formData);
    };

    const handleJobChange = (index, field, value) => {
        setJobTitles((prevJobTitles) => {
            const updatedJobTitles = [...prevJobTitles];
            updatedJobTitles[index] = {
                ...updatedJobTitles[index],
                [field]: value,
            };
            return updatedJobTitles;
        });
    };


    const addJobTitle = () => {
        setJobTitles([...jobTitles, { jobTitle: '', type: '' }]);
    };

    const removeJobTitle = (index) => {
        setJobTitles((prevJobTitles) => prevJobTitles.filter((_, i) => i !== index));
    };

    return (

        <form onSubmit={handleSubmit} style={{ width: "70%", margin: "0 auto", marginTop: "50px" }}>
            <button className="offset-button" onClick={handleNewProject}>
                New Project
            </button>
            <center><h1>Form2: Lead Search</h1></center>
            <div className='form-group'>
                <label htmlFor="email">Client Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    disabled
                />
            </div>

            <div className='form-group'>
                <label htmlFor="projectNumber">Project Number</label>
                <input
                    type="text"
                    id="projectNumber"
                    value={projectNumber}
                    // onChange={(e) => setProjectNumber(e.target.value)}
                    disabled
                />
            </div>

            <div className='form-group'>
                <label htmlFor="subject">Project Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    // onChange={(e) => setSubject(e.target.value)}
                    disabled
                />
            </div>


            <div className='input-group'>
                <label htmlFor="companySelection">Select Company</label>
                <select
                    id='companySelection'
                    onChange={handleSelectChange}
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select a company
                    </option>
                    {companyPairs.map((pair) => (
                        <option key={pair.companyURL} value={pair.companyName}>
                            {pair.companyName}
                        </option>
                    ))}
                </select>
                <div style={{ marginTop: "20px" }}>
                    <strong>Selected Company URL:</strong> {selectedURL || "None selected"}
                </div>
            </div>


            {/* <div className='form-group'>
                <label htmlFor="title">Job Title Keywords - seperate with spaces</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div> */}

            {/* {[...Array(1)].map((_, index) => (
                <div key={index} className='company-pair-container'>
                    <div className='input-group'>
                        <label htmlFor={`companyURL-${index}`}>Company URL-{index + 1}</label>
                        <input
                            type="text"
                            id={`companyURL-${index}`}
                            value={companyPairs[index].companyURL}
                            onChange={(e) => handleJobChange(index, 'companyURL', e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor={`companyType-${index}`}>Type</label>
                        <select
                            id={`companyType-${index}`}
                            value={companyPairs[index].companyType}
                            onChange={(e) => handleJobChange(index, 'companyType', e.target.value)}
                            required
                        >
                            <option value="">Select a type</option>
                            {companyTypeOptions.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ))} */}



            {jobTitles.map((pair, index) => (
                <div key={index} className='company-pair-container'>
                    <div className='input-group'>
                        <label htmlFor={`jobTitle-${index}`}>Job Title-{index + 1}</label>
                        <input
                            type="text"
                            id={`jobTitle-${index}`}
                            value={pair.jobTitle}
                            onChange={(e) => handleJobChange(index, 'jobTitle', e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor={`Type-${index}`}>Type</label>
                        <select
                            id={`Type-${index}`}
                            value={pair.type}
                            onChange={(e) => handleJobChange(index, 'type', e.target.value)}
                            required
                        >
                            <option value="">Select a type</option>
                            {companyTypeOptions.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeJobTitle(index)}
                        disabled={jobTitles.length === 1}
                    >
                        X
                    </button>
                </div>
            ))}

            <button type="button" className="add-button" onClick={addJobTitle}>
                + Add
            </button>

            <div className='button-container'>
                <button type="submit" disabled={loading}>
                    {loading ? <div className="spinner"></div> : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default EmployeeExtForm;