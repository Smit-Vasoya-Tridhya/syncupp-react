import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Faqimage from '../../../../public/assets/images/faq-banner.png';
import Image from 'next/image';

function Faq() {

  const faqlisting = [
    {
      id: 1,
      question: "What types of businesses can use Syncupp?",
      answer: "Syncupp can benefit all types and sizes of businesses including SMEs, agencies, coaches, consultants and more.",
    },
    {
      id: 2,
      question: "What types of businesses can use Syncupp?",
      answer: "Syncupp can benefit all types and sizes of businesses including SMEs, agencies, coaches, consultants and more.",
    },
    {
      id: 3,
      question: "What types of businesses can use Syncupp?",
      answer: "Syncupp can benefit all types and sizes of businesses including SMEs, agencies, coaches, consultants and more.",
    },
  ];

  const faqlistingcomponent = faqlisting.map((listing) => (
    <ol className='list-decimal'>
      <li className='pt-5 text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>{listing.question}
        <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>{listing.answer}</p>
      </li>
    </ol>
  ))

  return <>
    <div>
      <Header />
      <div>
        <div className='relative'>
          <Image src={Faqimage} alt='Faqimage' />
          <p className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white font-interr font-bold text-6xl'>FAQ</p>
        </div>
        <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4 lg:pt-28 pt-10'>
          {faqlistingcomponent}
          {/* <ol className='list-decimal'>
            <li className='text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>What types of businesses can use Syncupp?
              <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>Syncupp can benefit all types and sizes of businesses including SMEs, agencies, coaches, consultants and more.</p>
            </li>
            <li className='pt-5 text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>How much does Syncupp cost?
              <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>Syncupp offers affordable pricing starting at just $29/month per user. Additional users and clients can be added for only $10/month each.</p>
            </li>
            <li className='pt-5 text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>Is there a free trial?
              <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>Yes, Syncupp offers a generous free trial so you can test all the features before committing.</p>
            </li>
            <li className='pt-5 text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>What features are included?
              <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>Syncupp provides unlimited CRM, notes, automations, client portals, proposals, invoices, tasks, calendars, chat and more - all powered by AI capabilities.</p>
            </li>
            <li className='pt-5 text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>Is the platform easy to use?
              <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>Yes, Syncupp is designed with intuitive workflows and user-friendly dashboards to help you get up and running quickly.</p>
            </li>
            <li className='pt-5 text-lightblack font-interr font-bold text-xl pb-7 border-b border-lightgray'>What types of businesses can use Syncupp?
              <p className='font-normal font-interr pt-3 text-base leading-5 text-textcolor'>Syncupp can benefit all types and sizes of businesses including SMEs, agencies, coaches, consultants and more.</p>
            </li>
          </ol> */}
        </div>
      </div>
      <Footer />

    </div>;
  </>
}

export default Faq;
