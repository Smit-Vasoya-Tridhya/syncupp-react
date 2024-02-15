'use client';

import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation'
import Spinner from '@/components/ui/spinner';
import { useState } from 'react';
import Header from '../Header';
import Image from 'next/image';
import Arrow from '../../../../public/assets/images/right-arrow-with-bg.png';
import Arrowright from '../../../../public/assets/images/right-arrow.png';
import Slackimg from '../../../../public/assets/images/slack.png';
import Asanaimg from '../../../../public/assets/images/asana.png';
import Mondayimg from '../../../../public/assets/images/monday.png';
import Simpleimg from '../../../../public/assets/images/simple-invoice.png';
import Agreement from '../../../../public/assets/images/agreement.png';
import Agreementdetail from '../../../../public/assets/images/agreement-detail.png';
import Appointmnet from '../../../../public/assets/images/appointment.png';
import Appointmnetdetail from '../../../../public/assets/images/appointment-detail.png';
import Dashboard from '../../../../public/assets/images/dashboard.png';
import Dashboarddetail from '../../../../public/assets/images/dashboard-detail.png';
import Task from '../../../../public/assets/images/task.png';
import Taskdetail from '../../../../public/assets/images/task-detail.png';
import Notification from '../../../../public/assets/images/notification.png';
import Notificationdetail from '../../../../public/assets/images/notification-detail.png';
import Arrowrightsmall from '../../../../public/assets/images/arrow-right-small.png';
import Couponimg from '../../../../public/assets/images/coupon-img.png';
import Workfun from '../../../../public/assets/images/work-fun-img.png';
import Manageprojectimg from '../../../../public/assets/images/manage-project.png';
import Empowerimg from '../../../../public/assets/images/empower-img.png';
import Efficiencyimg from '../../../../public/assets/images/efficiency-img.png';
import Chatimg from '../../../../public/assets/images/chat-img.png';
import Stremlineimg from '../../../../public/assets/images/streamline-img.png';
import Clientimg1 from '../../../../public/assets/images/clients-img-1.png';
import Clientimg2 from '../../../../public/assets/images/clients-img-2.png';
import Link from 'next/link';
import Footer from '../Footer';
import Slackcolored from '../../../../public/assets/images/slack-colored.png';
import Mondaycolored from '../../../../public/assets/images/monday-colored.png';
import Crmimg from '../../../../public/assets/images/crm.png';
import Logo from '../../../../public/assets/images/logo.png';
import Arrowgreen from '../../../../public/assets/images/right-green.png';

export default function HomePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const onSubmit: SubmitHandler<any> = (data: any) => {
        router.replace('/signin');
        setLoading(true)
    };

    return (
        <>
            <Header />

            {/* <!-- Banner --> */}
            <div className='bg-white lg:pt-[100px] pt-10 lg:pb-[80px] pb-10'>
                <div className='max-w-screen-xl mx-auto w-full lg:px-0 px-4'>
                    <div className='text-center'>
                        <h1 className='text-darkpurple text-center font-interr font-black lg:leading-[75px] leading-normal lg:text-6xl md:text-4xl text-3xl lg:max-w-[923px] w-full mx-auto'>Your Entire Business In A Single Dashboard</h1>
                        <p className='lg:pt-6 pt-4 text-lightblack font-interr font-medium lg:text-xl text-base lg:leading-8 leading-normal text-center lg:max-w-[686px] w-full mx-auto'>Syncupp is a home for businesses of all types & sizes.Reports, Chats, Tasks, Invoices, Proposals & Agreements - All on the Same Platform.</p>
                        <div className=''>
                            <a href='#' className='lg:mt-12 mt-6 mx-auto bg-purple text-white rounded uppercase text-center lg:text-xl text-lg lg:py-5 py-3 relative lg:px-[138px] px-20 inline-block'>
                                Try for free
                                <span className='absolute right-2.5 lg:top-[22%] top-[14%]'><Image src={Arrow} alt='arrow-img' /></span>
                            </a>
                            <div className='mt-2.5 flex items-center gap-2 justify-center'>
                                <svg className="hidden">
                                    <symbol id="star" width="32" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.77 11.857H19.74L15.99.5l-3.782 11.357H0l9.885 6.903-3.692 11.21 9.736-7.05 9.796 6.962-3.722-11.18 9.766-6.845z" fill="currentColor" /></symbol>
                                </svg>
                                <div className='relative inline-block'>
                                    <div className="text-midpurple inline-flex gap-x-1 z-0">
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                    </div>
                                    <div className="z-10 overflow-hidden absolute left-0 top-0 text-purple flex gap-x-1" style={{ width: "93%" }}>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0	">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0	">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0	">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                        <svg viewBox="0 0 32 30" className="w-6 h-6 flex-shrink-0	">
                                            <use xlinkHref="#star"></use>
                                        </svg>
                                    </div>
                                </div>
                                <span className='text-base font-medium text-black leading-[29px] font-interr'>4.5+Stars Rated by 1000+ Users</span>
                            </div>
                        </div>
                        <div className='bg-lightpurple/20 px-7 py-2.5 rounded-lg lg:max-w-[929px] w-full mx-auto flex gap-8 items-center mt-12 lg:overflow-x-auto overflow-x-scroll'>
                            <p className='font-medium text-xl text-darkpurple font-interr leading-6 uppercase'>replaces</p>
                            <Image src={Arrowright} alt='arrow-right' />
                            <Image src={Slackimg} alt='Slackimg' />
                            <Image src={Asanaimg} alt='Asanaimg' />
                            <Image src={Mondayimg} alt='Mondayimg' />
                            <Image src={Simpleimg} alt='Simpleimg' />
                            <a href='#' className='font-medium text-xl text-darkpurple font-interr leading-6 uppercase'>& more</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- reduce cost --> */}
            <div className='lg:py-24 py-10 bg-gradient-to-r from-gradientcolor1 to-gradientcolor2'>
                <div className='max-w-screen-xl mx-auto w-full lg:px-[115px] px-4'>
                    <div className='flex lg:gap-7 md:gap-5 lg:flex-row flex-col'>
                        <div className='lg:w-1/3 w-full'>
                            <h3 className='font-black text-white xl:text-6xl lg:text-[45px] md:text-4xl text-3xl font-interr'>Save time Reduce costs</h3>
                            <p className='font-interr font-normal text-lg text-white/60 mt-1.5 xl:leading-9 leading-normal'>Dump separate tools for a single solution</p>
                            <div className='bg-transparent rounded-lg border border-black/40 p-5 shadow-customshadow lg:mt-5 mt-3'>
                                <div className='flex gap-2 lg:pb-5 pb-3 items-center'>
                                    <Image src={Agreement} alt='agreement-img' />
                                    <span className='text-white lg:text-2xl text-xl font-normal leading-7'>Agreement</span>
                                </div>
                                <Image src={Agreementdetail} alt='Agreementdetail' />
                            </div>
                            <div className='bg-transparent rounded-lg border border-black/40 p-5 shadow-customshadow lg:mt-5 mt-3'>
                                <div className='flex gap-2 lg:pb-5 pb-3 items-center'>
                                    <Image src={Appointmnet} alt='Appointmnet-img' />
                                    <span className='text-white lg:text-2xl text-xl font-normal leading-7'>Appointment</span>
                                </div>
                                <Image src={Appointmnetdetail} alt='Appointmnetdetail' />
                            </div>
                        </div>
                        <div className='lg:w-2/3 w-full'>
                            <div className='bg-transparent rounded-lg border border-black/40 px-5 pt-[30px] pb-0 shadow-customshadow lg:mt-0 mt-3'>
                                <div className='flex gap-2 lg:pb-5 pb-3 items-center'>
                                    <Image src={Dashboard} alt='Dashboard-img' />
                                    <span className='text-white lg:text-2xl text-xl font-normal leading-7'>Dashboard</span>
                                </div>
                                <Image src={Dashboarddetail} alt='Dashboarddetail' />
                            </div>
                            <div className='flex lg:gap-7 lg:flex-row flex-col'>
                                <div className='bg-transparent rounded-lg border border-black/40 p-5 shadow-customshadow lg:mt-5 mt-3'>
                                    <div className='flex gap-2 lg:pb-5 pb-3 items-center'>
                                        <Image src={Task} alt='Task-img' />
                                        <span className='text-white lg:text-2xl text-xl font-normal leading-7'>Task</span>
                                    </div>
                                    <Image src={Taskdetail} alt='Taskdetail' className='w-full' />
                                </div>
                                <div className='bg-transparent rounded-lg border border-black/40 p-5 shadow-customshadow lg:mt-5 mt-3'>
                                    <div className='flex gap-2 lg:pb-5 pb-3 items-center'>
                                        <Image src={Notification} alt='Notification-img' />
                                        <span className='text-white lg:text-2xl text-xl font-normal leading-7'>Notification</span>
                                    </div>
                                    <Image src={Notificationdetail} alt='Notificationdetail' className='w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href='#' className='max-w-[288px] flex lg:gap-4 gap-2 items-center lg:mt-12 mt-6 mx-auto bg-lightpink text-[#4D2351] rounded uppercase lg:text-xl text-lg lg:py-4 py-3 relative lg:px-4 px-2 text-center justify-center'>
                        Try for free
                        <span className=''><Image src={Arrowrightsmall} alt='arrow-img' /></span>
                    </a>
                </div>
            </div>

            {/* <!-- number of users --> */}
            <div className='lg:py-24 py-10'>
                <div className='max-w-screen-xl mx-auto w-full lg:px-[115px] px-4'>
                    <p className='text-2xl font-bold font-interr leading-7 text-lightblack capitalize'>number of users</p>
                    <div className="range-slider">
                        <div id="slider_thumb" className="range-slider_thumb"></div>
                        <div className="range-slider_line">
                            <div id="slider_line" className="range-slider_line-fill"></div>
                        </div>
                        <input id="slider_input" className="range-slider_input" type="range" value="20" min="0" max="100" />
                    </div>

                    <div>
                        <div className='flex'>
                            <div className='w-4/6'>
                                <div className='border-t border-l border-b border-lightgray rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[20px]'>
                                    <div className=''>
                                        <h4 className='font-interr font-bold lg:text-5xl text-lg lg:leading-[88px] leading-normal text-darkpurple text-center py-5'>Technology Stacks</h4>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <ul className='border-r border-lightgray'>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray lg:max-h-[69px] h-full lg:flex-row flex-col'><Image src={Slackcolored} alt='slackcolored' className='lg:max-w-[100px] max-w-[50px]' /><span className='font-normal font-interr lg:text-base text-xs leading-7 text-lightblack'>(Communication)</span></li>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray lg:max-h-[69px] h-full lg:flex-row flex-col'><Image src={Mondaycolored} alt='Mondaycolored' className='lg:max-w-[100px] max-w-[50px]' /><span className='font-normal font-interr lg:text-base text-xs leading-7 text-lightblack'>(Project Management)</span></li>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray lg:max-h-[69px] h-full lg:flex-row flex-col'><Image src={Crmimg} alt='Crmimg' className='lg:max-w-[100px] max-w-[50px]' /><span className='font-normal font-interr lg:text-base text-xs leading-7 text-lightblack'>(CRM)</span></li>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray font-bold lg:text-3xl text-xl lg:leading-[48px] leading-normal uppercase'>Total</li>
                                        </ul>
                                        <ul>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray'><span className='font-normal font-interr text-lg leading-7 text-lightblack'><span className='text-lightblack font-bold text-lg leading-7 font-interr'>$56</span> / Month</span></li>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray'><span className='font-normal font-interr text-lg leading-7 text-lightblack'><span className='text-lightblack font-bold text-lg leading-7 font-interr'>$56</span> / Month</span></li>
                                            <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray'><span className='font-normal font-interr text-lg leading-7 text-lightblack'><span className='text-lightblack font-bold text-lg leading-7 font-interr'>$56</span> / Month</span></li>
                                            <li className='lg:py-5 py-0 lg:px-5 px-0 flex gap-3 items-center border-t border-lightgray'><a href='#' className='flex lg:gap-4 gap-2 items-center mx-auto bg-lightpink text-[#4D2351] rounded uppercase lg:text-xl text-lg lg:py-4 py-3 relative lg:px-4 px-2 text-center justify-center'>$339 / Month</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/3 ml-[-20px]'>
                                <div className='border-custom-extra rounded-[20px]'>
                                    <a href="#" className=" leading-[88px] lg:py-[22px] py-3 inline-block text-center w-full">
                                        <Image src={Logo} className="mx-auto" alt="Logo" />
                                    </a>
                                    <ul>
                                        <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray'><Image src={Arrowgreen} alt='Arrowgreen' className='mx-auto' /></li>
                                        <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray'><Image src={Arrowgreen} alt='Arrowgreen' className='mx-auto' /></li>
                                        <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray'><Image src={Arrowgreen} alt='Arrowgreen' className='mx-auto' /></li>
                                        <li className='py-5 px-5 flex gap-3 items-center border-t border-lightgray lg:flex-row flex-col'><a href='#' className='flex lg:gap-4 gap-2 items-center mx-auto lg:bg-[#4D2351] lg:text-white text-[#4D2351] rounded uppercase lg:text-xl text-lg lg:py-4 py-0 relative lg:px-4 px-0 text-center justify-center'>$6 / Month</a><span>Save $262</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- make work fun --> */}
            <div className='bg-lightbg lg:py-[100px] py-10'>
                <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4'>
                    <div className='flex lg:gap-20 gap-4 items-center md:flex-row flex-col mb-7'>
                        <div className='md:w-1/2 w-full'>
                            <Image src={Couponimg} alt='coupon-img' />
                            <Image src={Workfun} alt='Workfun-img' className='mt-5' />
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <h5 className='text-darkpurple font-interr font-bold lg:text-6xl lg:leading-[68px] text-3xl leading-normal'>Make Work Fun</h5>
                            <p className='text-lightblack lg:leading-8 leading-normal text-lg font-interr font-normal lg:mt-4 mt-3'>Leaderboards & Points for completing activities, which you can redeem as coupon code from the rewards section</p>
                        </div>
                    </div>
                    <div className='flex lg:gap-20 gap-4 items-center md:flex-row-reverse flex-col mb-7'>
                        <div className='md:w-1/2 w-full'>
                            <Image src={Manageprojectimg} alt='Manageprojectimg' />
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <h5 className='text-darkpurple font-interr font-bold lg:text-6xl lg:leading-[68px] text-3xl leading-normal'>Manage Projects & Tasks</h5>
                            <p className='text-lightblack lg:leading-8 leading-normal text-lg font-interr font-normal lg:mt-4 mt-3'>Track projects, share tasks with clients, and collaborate in real-time</p>
                        </div>
                    </div>
                    <div className='flex lg:gap-20 gap-4 items-center md:flex-row flex-col mb-7'>
                        <div className='md:w-1/2 w-full'>
                            <Image src={Empowerimg} alt='Empowerimg' className='mt-5' />
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <h5 className='text-darkpurple font-interr font-bold lg:text-6xl lg:leading-[68px] text-3xl leading-normal'>Empower Your Team</h5>
                            <p className='text-lightblack lg:leading-8 leading-normal text-lg font-interr font-normal lg:mt-4 mt-3'>Unlimited users, roles, permissions to scale your team</p>
                        </div>
                    </div>
                    <div className='flex lg:gap-20 gap-4 items-center md:flex-row-reverse flex-col mb-7'>
                        <div className='md:w-1/2 w-full'>
                            <Image src={Efficiencyimg} alt='Efficiencyimg' />
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <h5 className='text-darkpurple font-interr font-bold lg:text-6xl lg:leading-[68px] text-3xl leading-normal'>Increase Efficiency</h5>
                            <p className='text-lightblack lg:leading-8 leading-normal text-lg font-interr font-normal lg:mt-4 mt-3'>Streamline workflows, automate processes to save hours every week</p>
                        </div>
                    </div>
                    <div className='flex lg:gap-20 gap-4 items-center md:flex-row flex-col mb-7'>
                        <div className='md:w-1/2 w-full'>
                            <Image src={Chatimg} alt='Chatimg' className='mt-5' />
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <h5 className='text-darkpurple font-interr font-bold lg:text-6xl lg:leading-[68px] text-3xl leading-normal'>Enhance Chat & Communication</h5>
                            <p className='text-lightblack lg:leading-8 leading-normal text-lg font-interr font-normal lg:mt-4 mt-3'>Equip teams with interrnal chat, client messaging, and file sharing for better collaboration</p>
                        </div>
                    </div>
                    <div className='flex lg:gap-20 gap-4 items-center md:flex-row-reverse flex-col mb-7'>
                        <div className='md:w-1/2 w-full'>
                            <Image src={Stremlineimg} alt='Stremlineimg' />
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <h5 className='text-darkpurple font-interr font-bold lg:text-6xl lg:leading-[68px] text-3xl leading-normal'>Streamline Agreements & Invoicing</h5>
                            <p className='text-lightblack lg:leading-8 leading-normal text-lg font-interr font-normal lg:mt-4 mt-3'>Create standardized proposals and invoices, track payments, and automate workflows to get paid faster</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- our clients say --> */}
            <div className='lg:py-24 py-10 bg-gradient-to-r from-gradientcolor2 interr to-gradientcolor1'>
                <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4'>
                    <h5 className='font-interr font-bold lg:text-6xl text-3xl lg:leading-[72px] leading-normal text-white text-center'>What our clients say</h5>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 gap-7 lg:pt-20 pt-7'>
                        <div className='group lg:hover:scale-110 transition duration-[500ms] ease-in-out cursor-pointerr bg-white hover:bg-transparent'>
                            <div className='relative '>
                                <Image src={Clientimg1} alt='clientimg1' className='w-full rounded-bl-[66%]' />
                            </div>
                            <div className='lg:p-5 p-3 text-center'>
                                <h6 className=' inline-block w-full font-bold font-interr text-2xl text-lightblack group-hover:text-white'>Faham</h6>
                                <span className='lg:my-5 my-3 bg-gradient-to-r from-gradientcolor2 to-gradientcolor1 via-gradientcolor2 h-px w-8/12 inline-block'></span>
                                <p className='text-lg text-lightblack font-interr group-hover:text-white'>Syncupp is how our teams centralize work, stay on track, and easily collaborate.</p>
                            </div>
                        </div>
                        <div className='group lg:hover:scale-110 transition duration-[500ms] ease-in-out cursor-pointerr bg-white hover:bg-transparent'>
                            <div className='relative '>
                                <Image src={Clientimg2} alt='clientimg1' className='w-full rounded-bl-[66%]' />
                            </div>
                            <div className='lg:p-5 p-3 text-center '>
                                <h6 className=' inline-block w-full font-bold font-interr text-2xl text-lightblack group-hover:text-white'>Jasmeet</h6>
                                <span className='lg:my-5 my-3 bg-gradient-to-r from-gradientcolor2 to-gradientcolor1 via-gradientcolor2 h-px w-8/12 inline-block'></span>
                                <p className='text-lg text-lightblack font-interr group-hover:text-white'>Syncupp is the best tool out there and the 10X more affordable for teams of all sizes</p>
                            </div>
                        </div>
                        <div className='group lg:hover:scale-110 transition duration-[500ms] ease-in-out cursor-pointerr bg-white hover:bg-transparent'>
                            <div className='relative '>
                                <Image src={Clientimg1} alt='clientimg1' className='w-full rounded-bl-[66%]' />
                            </div>
                            <div className='lg:p-5 p-3 text-center'>
                                <h6 className=' inline-block w-full font-bold font-interr text-2xl text-lightblack group-hover:text-white'>Ankit</h6>
                                <span className='lg:my-5 my-3 bg-gradient-to-r from-gradientcolor2 to-gradientcolor1 via-gradientcolor2 h-px w-8/12 inline-block'></span>
                                <p className='text-lg text-lightblack font-interr group-hover:text-white'>Syncupp has helped us 3x our productivity without having to scale our team.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- pricing --> */}
            <div className='lg:py-24 py-10'>
                <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4'>
                    <h5 className='font-interr font-bold lg:text-6xl text-3xl lg:leading-[72px] leading-normal text-darkpurple text-center'>Pricing</h5>
                    <div className='grid md:grid-cols-3 grid-cols-1 lg:gap-12 gap-7 lg:pt-20 pt-7 items-center'>
                        <div className='rounded border-custom group blur-xs'>
                            <div className='bg-gradient-to-r from-gradientcolor1 to-gradientcolor2 text-center lg:py-5 py-3'>
                                <h5 className='text-white font-bold text-2xl font-interr'>Advanced</h5>
                            </div>
                            <ul className='text-center'>
                                <li className='lg:py-2.5 py-2 text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <Link href='#' className='bg-gradient-to-r from-gradientcolor1 to-gradientcolor2 text-center text-white uppercase text-base px-4 py-3 rounded-xl inline-block my-5 mx-auto'>try now</Link>
                            </ul>
                        </div>
                        <div className='rounded border-custom group lg:scale-110'>
                            <div className='bg-gradient-to-r from-gradientcolor1 to-gradientcolor2 text-center lg:py-5 py-3'>
                                <h5 className='text-white font-bold text-2xl font-interr pb-3'>Basic</h5>
                                <p className='flex justify-center items-center gap-2 font-interr font-bold lg:leading-9 leading-normal text-3xl text-white'>$6 <span className='text-base lg:leading-9 leading-normal font-interr text-white font-normal'>/ Month </span></p>
                            </div>
                            <ul className='text-center'>
                                <li className='lg:py-2.5 py-2 text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <Link href='#' className='text-center text-white uppercase text-base px-4 py-3 rounded-xl inline-block my-5 mx-auto bg-gradient-to-r from-gradientcolor1 to-gradientcolor1'>try now</Link>
                            </ul>
                        </div>
                        <div className='rounded border-custom group blur-xs'>
                            <div className='bg-gradient-to-r from-gradientcolor1 to-gradientcolor2 text-center lg:py-5 py-3'>
                                <h5 className='text-white font-bold text-2xl font-interr'>Enterprise</h5>
                            </div>
                            <ul className='text-center'>
                                <li className='lg:py-2.5 py-2 text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <li className='lg:py-2.5 py-2  text-lightblack text-base leading-7 font-interr text-center border-b border-lightgray'>Unlimited flows</li>
                                <Link href='#' className='bg-gradient-to-r from-gradientcolor1 to-gradientcolor2 text-center text-white uppercase text-base px-4 py-3 rounded-xl inline-block my-5 mx-auto'>try now</Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- any question --> */}
            <div className='lg:py-24 py-10 bg-gradient-to-r from-gradientcolor2 interr to-gradientcolor1'>
                <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4'>
                    <div className='flex lg:flex-row flex-col gap-6'>
                        <div className='lg:w-1/2 w-full'>
                            <h5 className='font-interr lg:text-6xl text-3xl font-bold text-white capitalize leading-normal pb-4'>Have Any <br /> Questions ?</h5>
                            <p className='text-lightpink text-lg max-w-[80%]'>Curious about our services? Find quick answers to common queries in our FAQ section. Discover more about what we offer for a seamless experience.</p>
                            <div className='flex lg:gap-7 gap-4'>
                                <a href='#' className='flex lg:gap-4 items-center lg:mt-12 mt-6 bg-lightpink text-[#4D2351] rounded uppercase lg:text-base text-sm py-3 relative lg:px-4 px-2 text-center justify-center'>
                                    View More
                                </a>
                                <a href='#' className='flex lg:gap-4 gap-2 items-center lg:mt-12 mt-6 bg-lightpink text-[#4D2351] rounded uppercase lg:text-base text-sm py-3 relative lg:px-4 px-2 text-center justify-center'>
                                    Contact sales
                                    <span className=''><Image src={Arrowrightsmall} alt='arrow-img' /></span>
                                </a>
                            </div>
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <ol className='list-decimal pl-4'>
                                <li className='text-white font-interr font-bold text-lg pb-7'>What types of businesses can use Syncupp?
                                    <p className='font-normal font-interr pt-4 text-lg'>Syncupp can benefit all types and sizes of businesses including SMEs, agencies, coaches, consultants and more.</p>
                                </li>
                                <li className='text-white font-interr font-bold text-lg pb-7'>How much does Syncupp cost?
                                    <p className='font-normal font-interr pt-4 text-lg'>Syncupp offers affordable pricing starting at just $29/month per user. Additional users and clients can be added for only $10/month each.</p>
                                </li>
                                <li className='text-white font-interr font-bold text-lg pb-7'>Is there a free trial?
                                    <p className='font-normal font-interr pt-4 text-lg'>Yes, Syncupp offers a generous free trial so you can test all the features before committing.</p>
                                </li>
                                <li className='text-white font-interr font-bold text-lg pb-7'>What features are included?
                                    <p className='font-normal font-interr pt-4 text-lg'>Syncupp provides unlimited CRM, notes, automations, client portals, proposals, invoices, tasks, calendars, chat and more - all powered by AI capabilities.</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}