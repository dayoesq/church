'use client';
import * as React from 'react';

export default function Page() {
    function submitForm(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <div className=''>
            <h1>Contact Page</h1>

            <form onSubmit={submitForm} noValidate>
                <fieldset className='border border-gray-500'>
                    <legend>
                        <label htmlFor='firstName' className=''>
                            First Name
                        </label>
                        <input
                            type='text'
                            name='firstName'
                            className='border border-gray-500 ml-3'
                        />
                    </legend>

                    <div className='relative'>
                        <label htmlFor='lastName' className=''>
                            Last Name
                        </label>
                        <input type='text' name='firstName' />
                    </div>
                    <div>
                        <label htmlFor='email' className=''>
                            Email
                        </label>
                        <input type='email' name='email' />
                    </div>
                    <div className=''>
                        <label htmlFor='telephone' className=''></label>
                        <input type='text' name='telephone' />
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
