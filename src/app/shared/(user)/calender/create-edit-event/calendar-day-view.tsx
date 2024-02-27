'use client';

import type { CalendarEvent } from '@/types';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
// import EventForm from '@/app/shared/event-calendar/event-form';
// import DetailsEvents from '@/app/shared/event-calendar/details-event';
import { useModal } from '@/app/shared/modal-views/use-modal';
import useEventCalendar from '@/hooks/use-event-calendar';
import cn from '@/utils/class-names';
import { useDispatch } from 'react-redux';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';
import moment from 'moment';
import DetailsEvents from '../event-calendar/details-event';

const localizer = dayjsLocalizer(dayjs);

// rbc-active -> black button active custom css classes
const calendarToolbarClassName = '[&_.rbc-toolbar]:py-2 [&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-time-header.rbc-overflowing]:hidden [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 ';

export default function EventCalendarDayView(props: any) {

  const { title, isClientModule, isClientEdit, clientReferenceId, isTeamModule, isTeamEdit, teamReferenceId, isAgencyTeam, isClientTeam } = props;

  // console.log("title....", title)
  // console.log("isClientModule....", isClientModule)
  // console.log("clientReferenceId....", clientReferenceId)
  // console.log("isClientEdit....", isClientEdit)
  // console.log("isTeamModule....", isTeamModule)
  // console.log("teamReferenceId....", teamReferenceId)
  // console.log("isAgencyTeam....", isAgencyTeam)
  // console.log("isClientTeam....", isClientTeam)
  // console.log("isTeamEdit....", isTeamEdit)

  // const { events } = useEventCalendar();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [events, setEvents] = useState<any[]>([]);




  useEffect(() => {

    if(title === 'New Activity' && isClientModule && isAgencyTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_id: clientReferenceId, given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })  
    } else if(title === 'New Activity' && !isAgencyTeam && !isTeamModule) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_team_id: clientReferenceId, given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(title === 'New Activity' && isTeamModule && isAgencyTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamReferenceId, given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(((title === 'New Activity' || title === 'New Task') && !isClientModule) || ((title === 'New Activity' || title === 'New Task') && !isTeamModule)) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    }

    if(title === 'Edit Activity' && isClientEdit && !isClientTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_id: clientReferenceId, given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })  
    } else if(title === 'Edit Activity' && isClientTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_team_id: clientReferenceId, given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(title === 'Edit Activity' && isTeamEdit && !isClientTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamReferenceId, given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(((title === 'Edit Activity' || title === 'Edit Task') && !isClientEdit) || ((title === 'Edit Activity' || title === 'Edit Task') && !isTeamEdit)) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', given_date: moment().format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    }


  }, [title, dispatch, clientReferenceId, isClientModule, isTeamModule, isTeamEdit, teamReferenceId, isAgencyTeam, isClientTeam, isClientEdit]);



  const handleNavigationApiCall = (date: any) => {

    console.log("navigation date....", date)

    if(title === 'New Activity' && isClientModule && isAgencyTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_id: clientReferenceId, given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })  
    } else if(title === 'New Activity' && !isAgencyTeam && !isTeamModule) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_team_id: clientReferenceId, given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(title === 'New Activity' && isTeamModule && isAgencyTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamReferenceId, given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(((title === 'New Activity' || title === 'New Task') && !isClientModule) || ((title === 'New Activity' || title === 'New Task') && !isTeamModule)) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    }

    if(title === 'Edit Activity' && isClientEdit && !isClientTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_id: clientReferenceId, given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })  
    } else if(title === 'Edit Activity' && isClientTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_team_id: clientReferenceId, given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(title === 'Edit Activity' && isTeamEdit && !isClientTeam) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamReferenceId, given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    } else if(((title === 'Edit Activity' || title === 'Edit Task') && !isClientEdit) || ((title === 'Edit Activity' || title === 'Edit Task') && !isTeamEdit)) {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', given_date: moment(date).format('DD-MM-YYYY'), pagination: false })).then((result: any) => {
        // console.log("result...", result);
        if (getAllActivity.fulfilled.match(result)) {
          if (result && result?.payload?.response?.success === true) {
            const eventData = result?.payload?.response?.data && result?.payload?.response?.data.length > 0 && result?.payload?.response?.data?.map((dataa: any) => {
                return {
                  ...dataa, 
                  start: new Date(dataa?.start),
                  end: new Date(dataa?.end),
                }
            }) || [];
            // console.log("customize event data....", eventData)
            setEvents(eventData)
          }
        }
      })
    }


  } 



//   const handleSelectSlot = useCallback(
//     ({ start, end }: { start: Date; end: Date }) => {
//       openModal({
//         view: <EventForm startDate={start} endDate={end} />,
//         customSize: '650px',
//       });
//     },
//     [openModal]
//   );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      openModal({
        view: <DetailsEvents event={event} />,
        customSize: '500px',
      });
    },
    [openModal]
  );

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        day: true,
      },
      scrollToTime: new Date(2023, 10, 27, 6),
      formats: {
        dateFormat: 'D',
        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd', culture),
        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd M/D', culture),
        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'hh A', culture),
      },
    }),
    []
  );

  return (
    <div className="@container">
      <Calendar
        localizer={localizer}
        events={events}
        views={views}
        formats={formats}
        defaultView={Views.DAY}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        onNavigate={(date) => handleNavigationApiCall(date)}
        selectable
        scrollToTime={scrollToTime}
        className={cn('h-[659px] md:h-[659px]', calendarToolbarClassName)}
      />
    </div>
  );
}
