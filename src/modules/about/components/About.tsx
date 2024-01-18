import Breakline from '@/common/components/elements/Breakline';
import { CareerProps } from '@/common/types/careers';
import { EducationProps } from '@/common/types/education';

import CareerList from './CareerList';
import EducationList from './EducationList';
import Resume from './Resume';
import Skills from './Skills';
import Story from './Story';

interface AboutProps {
  content: string;
  frontMatter: {
    resume: string;
    education: EducationProps[];
    career: CareerProps[];
  };
}

const About = ({ about }: { about: AboutProps }) => {
  return (
    <>
      <Story content={about.content} />
      {about.frontMatter.resume && (
        <>
          <Resume resumeUrl={about.frontMatter.resume} />
        </>
      )}
      <Breakline className='my-8' />
      <Skills />
      {about.frontMatter.career && (
        <>
          <Breakline className='my-8' />
          <CareerList careerList={about.frontMatter.career} />
        </>
      )}
      {about.frontMatter.education && (
        <>
          <Breakline className='my-8' />
          <EducationList educationList={about?.frontMatter.education} />
        </>
      )}
    </>
  );
};

export default About;
