'use client';

import axios from 'axios';
import clsx from 'clsx';
import { useState } from 'react';
import { FiClock as ClockIcon } from 'react-icons/fi';

import Button from '@/common/components/elements/Button';

interface FormDataProps {
  name: string;
  email: string;
  message: string;
}

const formInitialState: FormDataProps = {
  name: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormDataProps>(formInitialState);

  const [formErrors, setFormErrors] = useState<Partial<FormDataProps>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value ? undefined : `${name} is required`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = Object.values(formErrors).some((error) => error);

    if (!hasErrors) {
      setIsLoading(true);
      try {
        const response = await axios.post('/api/contact', { formData });
        if (response.status === 200) {
          alert('Message sent!');
          setFormData(formInitialState);
        }
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    } else {
      alert('Error!');
    }
  };

  const isSubmitDisabled = Object.values(formErrors).some((error) => error);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col grow gap-5'>
        <div className='flex flex-col md:flex-row gap-5'>
          <input
            className='w-full py-2 px-3 rounded-md border border-neutral-200 focus:outline-none dark:border-neutral-700'
            type='text'
            placeholder='Name*'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className='w-full py-2 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 focus:outline-none'
            type='email'
            placeholder='Email*'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          className='w-full py-2 px-3 rounded-md border border-neutral-200 focus:outline-none dark:border-neutral-700'
          rows={5}
          placeholder='Message*'
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button
          className={clsx(
            'py-2.5 bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 flex justify-center hover:dark:bg-neutral-50 hover:bg-neutral-900 hover:scale-[101%]'
          )}
          type='submit'
          icon={<></>}
          data-umami-event='Send Contact Message'
          disabled={isSubmitDisabled}
        >
          {isLoading ? 'Sending Message...' : 'Send Message'}
        </Button>
      </div>

      <div className='flex items-center gap-2 dark:text-neutral-400 my-5'>
        <ClockIcon />
        <div className='text-sm'>
          <span className='font-medium'>Avg. response:</span> 1-2 Hours (Working
          Hours, GMT+7)
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
