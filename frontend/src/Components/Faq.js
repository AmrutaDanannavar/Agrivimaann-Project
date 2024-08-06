import React from 'react';
import img1 from '../Images/fa5.jpg';
import img2 from '../Images/fa6.jpg';
import { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is AGRIVIMAAN?',
      answer: 'AGRIVIMAAN is a leading provider of agricultural drone solutions.'
    },

    {
      question: 'How can I purchase a drone?',
      answer: 'You can purchase a drone by contacting us through the "Contact Us" page.'
    },

    {
      question: 'Do you offer drone services?',
      answer: 'Yes, we offer various drone services including spray and monitoring.'
    },

    {
      question: 'What is the tank capacity ?',
      answer: '11 liters, filling 8 liters recommended.'
    },

    {
      question: 'How many people will be needed to spray ?',
      answer: 'Pilot, co-pilot, and helper (arranged by farmer)'
    },

    {
      question: 'Can we spray any type of pesticides ?',
      answer: 'Yes'
    },

    {
      question: 'Do you train farmers to fly ?',
      answer: 'Basic training is provided.'
    },

    {
      question: 'How do we transport it ?',
      answer: 'Ideally 4-wheeler, you can also modify a 2-wheeler to transport.'
    },

    {
      question: 'How many acres can we spray in a day ?',
      answer: '(1 acre - 3 minutes) Depending on the spare batteries we can spray 20 - 30 acres in a day'
    },

    {
      question: 'Will we need a generator on the field ?',
      answer: 'Not needed if there are enough no of spare batteries'
    }

  ];

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      <div style={{ backgroundImage: `url(${img1})` }} className='md:h-96 bg-no-repeat h-32 md:bg-cover'>

      </div>

      <div className='h-auto bg-white'>
        <div className=' flex flex-col md:flex-row p-4 gap-10'>
          <div className=' w-full md:w-2/3 '>
            <h1 className=' text-xl md:text-3xl font-bold mb-4'>Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
              <div key={index} className='mb-2'>
                <div
                  className='cursor-pointer p-2 bg-gray-200 rounded'
                  onClick={() => handleToggle(index)}
                >
                  <h2 className='text-xl font-semibold'>{faq.question}</h2>
                </div>
                {activeIndex === index && (
                  <div className='p-2 mt-1 bg-gray-100 rounded'>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}

          </div>
          <div>
            <img src={img2} />
          </div>
        </div>
      </div>

    </div>


  )
}

export default Faq
