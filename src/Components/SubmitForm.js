import React, { useState } from 'react';
import axios from 'axios';

import countries from '../data/countries.json';
import '../css/SubmitForm.css'

const SubmitForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [companyPairs, setCompanyPairs] = useState(
        Array(1).fill({ companyURL: '', companyType: '' })
    );

    const [loading, setLoading] = useState(false);

    const companyTypeOptions = ['former', 'current', 'both'];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = {
            email,
            subject,
            selectedCountries,
            companyPairs,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/employees', formData, {
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
    };

    const handleCheckboxChange = (countryName) => {
        setSelectedCountries((prevSelectedCountries) => {
            if (prevSelectedCountries.includes(countryName)) {
                return prevSelectedCountries.filter((name) => name !== countryName);
            } else {
                return [...prevSelectedCountries, countryName];
            }
        });
    };

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

    return (

        <form onSubmit={handleSubmit}>
            <center><h1>Employee Extraction</h1></center>
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
                <label htmlFor="subject">Job Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
            </div>

            <div>
                <div className='select-countries'>Select Country Codes</div>

                <div className='checkbox-container'>
                    {countries.map((country) => (
                        <div key={country.code}>
                            <input
                                type="checkbox"
                                id={country.code}
                                value={country.name}
                                checked={selectedCountries.includes(country.code)}
                                onChange={() => handleCheckboxChange(country.code)}
                            />
                            <label htmlFor={country.code}>{country.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            {[...Array(1)].map((_, index) => (
                <div key={index} className='company-pair-container'>
                    <div className='input-group'>
                        <label htmlFor={`companyURL-${index}`}>Company URL-{index + 1}</label>
                        <input
                            type="text"
                            id={`companyURL-${index}`}
                            value={companyPairs[index].companyURL}
                            onChange={(e) => handleCompanyChange(index, 'companyURL', e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor={`companyType-${index}`}>Type</label>
                        <select
                            id={`companyType-${index}`}
                            value={companyPairs[index].companyType}
                            onChange={(e) => handleCompanyChange(index, 'companyType', e.target.value)}
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
            ))}

            <div className='button-container'>
                <button type="submit" disabled={loading}>
                    {loading ? <div className="spinner"></div> : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default SubmitForm;