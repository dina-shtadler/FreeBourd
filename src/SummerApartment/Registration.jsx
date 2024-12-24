
import React from 'react';
import { useState } from 'react';

const Registration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // Add more fields as needed
    });

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://your-node-js-api-url/registerc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data); // Handle response data as needed
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
       asd     {/* Registration form with input fields and submit button */}
        </div>
    );
};

export default Registration;