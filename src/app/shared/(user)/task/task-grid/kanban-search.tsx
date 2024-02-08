"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { handleKeyDown } from '@/utils/common-functions';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { getAllTask } from '@/redux/slices/user/task/taskSlice';
import { useDebouncedValue } from '@/hooks/use-debounce';


export default function KanbanSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    // console.log("search term....", searchTerm)
    const dispatch = useDispatch();

    const debouncedValue = useDebouncedValue<string>(searchTerm, 1000);


    useEffect(() => {
        dispatch(getAllTask({ search: debouncedValue, pagination: false }))
    }, [dispatch, debouncedValue]);
   
    const onSearchClear = () => {
        setSearchTerm('');
    }

    const onSearchChange = (event: any) => {
        setSearchTerm(event?.target?.value)
    }
    
    return (
        <>
        <Input
            type="search"
            placeholder="Search by anything..."
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            onKeyDown={handleKeyDown}
            inputClassName="h-9 w-[16.7rem]"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        </>
    );
}