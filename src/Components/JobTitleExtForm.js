import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import countries from '../data/countries.json';
import '../css/JobTitleExtForm.css'

const JobTitleExtForm = () => {
    const [email, setEmail] = useState('');
    const [projectNumber, setProjectNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [companyPairs, setCompanyPairs] = useState([{ companyURL: '', companyName: '' }]);

    const navigate = useNavigate();

    // const [companyPairs, setCompanyPairs] = useState(
    //     Array(1).fill({ companyURL: '', companyType: '' })
    // );

    const [loading, setLoading] = useState(false);

    // const companyTypeOptions = ['former', 'current', 'both'];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = {
            email,
            projectNumber,
            subject,
            title,
            selectedCountries,
            companyPairs,
        };

        console.log(formData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job-titles`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Set loading to false after submission
        }

        console.log('Form Data Submitted:', formData);
        navigate('/employee', { state: formData });
    };

    // const handleCheckboxChange = (country) => {
    //     setSelectedCountries((prevSelectedCountries) => {
    //         if (prevSelectedCountries.includes(country)) {
    //             return prevSelectedCountries.filter((con) => con !== country);
    //         } else {
    //             return [...prevSelectedCountries, country];
    //         }
    //     });
    // };

    const handleCheckboxChange = (country) => {
        setSelectedCountries((prevSelectedCountries) => {
            if (prevSelectedCountries.some((con) => con.code === country.code)) {
                // Remove the country if it exists in the array
                return prevSelectedCountries.filter((con) => con.code !== country.code);
            } else {
                // Add the country to the array
                return [...prevSelectedCountries, country];
            }
        });
    };

    // const handleRadioChange = (countryCode) => {
    //     setSelectedCountries(countryCode); // Update the selected country
    // };

    const handleCompanyChange = (index, field, value) => {
        setCompanyPairs((prevCompanyPairs) => {
            const updatedCompanyPairs = [...prevCompanyPairs];
            updatedCompanyPairs[index] = {
                ...updatedCompanyPairs[index],
                [field]: value,
            };
            return updatedCompanyPairs;
        });
    };


    const addCompanyPair = () => {
        setCompanyPairs([...companyPairs, { companyURL: '', companyName: '' }]);
    };

    const removeCompanyPair = (index) => {
        setCompanyPairs((prevCompanyPairs) => prevCompanyPairs.filter((_, i) => i !== index));
    };

    return (

        <form onSubmit={handleSubmit}>
            <center><h1>Form1: Relevant Job Title Search</h1></center>
            <div className='form-group'>
                <label htmlFor="email">Client Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="projectNumber">Project Number</label>
                <input
                    type="text"
                    id="projectNumber"
                    value={projectNumber}
                    onChange={(e) => setProjectNumber(e.target.value)}
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="subject">Project Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="title">Job Title Keywords - seperate with spaces</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <div className='select-countries'>Select Lead Locations</div>

                <div className='checkbox-container'>
                    {countries.map((country) => (
                        <div key={country.code}>
                            <input
                                type="checkbox"
                                id={country.code}
                                value={country.name}
                                checked={selectedCountries.includes(country)}
                                onChange={() => handleCheckboxChange(country)}
                            />
                            <label htmlFor={country.code}>{country.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            {companyPairs.map((pair, index) => (
                <div key={index} className='company-pair-container'>
                    <div className='input-group'>
                        <label htmlFor={`companyURL-${index}`}>Company URL-{index + 1}</label>
                        <input
                            type="text"
                            id={`companyURL-${index}`}
                            value={pair.companyURL}
                            onChange={(e) => handleCompanyChange(index, 'companyURL', e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor={`companyName-${index}`}>Company Name-{index + 1}</label>
                        <input
                            type="text"
                            id={`companyName-${index}`}
                            value={pair.companyName}
                            onChange={(e) => handleCompanyChange(index, 'companyName', e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeCompanyPair(index)}
                        disabled={companyPairs.length === 1}
                    >
                        X
                    </button>
                </div>
            ))}

            <button type="button" className="add-button" onClick={addCompanyPair}>
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

export default JobTitleExtForm;