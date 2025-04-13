import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='bg-[#EDF7FF] flex items-center'>
      <div className='container px-6 py-10 md:py-16'>
        <div className='py-10'>
          <p className="text-gray-600 mt-4">FAQs</p>
          <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='w-full md:w-1/2'>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<FaChevronUp />} aria-controls="panel1-content" id="panel1-header">
                <Typography component="span">Expanded by default</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<FaChevronUp />} aria-controls="panel2-content" id="panel2-header">
                <Typography component="span">Header 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary expandIcon={<FaChevronUp />} aria-controls="panel3-content" id="panel3-header">
                <Typography component="span">Header 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary expandIcon={<FaChevronUp />} aria-controls="panel4-content" id="panel4-header">
                <Typography component="span">Header 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="/feedback.jpg" // Ensure image is in the public folder
              alt="Feedback"
              className=" object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
