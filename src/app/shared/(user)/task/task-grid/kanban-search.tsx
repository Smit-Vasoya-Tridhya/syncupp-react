"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { handleKeyDown } from '@/utils/common-functions';
import { PiMagnifyingGlassBold } from "react-icons/pi";


export default function KanbanSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    // console.log("search term....", searchTerm)
   
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