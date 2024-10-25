import React from 'react';
import { Label, TextInput } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { Checkbox, Table } from "flowbite-react";
import { Button } from "flowbite-react";

function BookRoom() {
  return (
    <div className="flex justify-between max-w-4xl mx-auto gap-8">
      
      {/* Left Form with Search Bar */}
      <div className="flex flex-col gap-4   w-72"  >
        {/* Search Bar */}
        <form className="flex items-center mb-4">   
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
              </svg>
            </div>
            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Search branch name..." required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Left Form Fields */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="first_name" value="First Name" />
          </div>
          <TextInput id="f_name" type="text" sizing="sm"   className="w-72"/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="LatName" value="Last Name" />
          </div>
          <TextInput id="l_name" type="text" sizing="sm"  className="w-72"/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nicNo" value="NIC" />
          </div>
          <TextInput id="nic" type="text" sizing="sm"  className="w-72"/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone_number" value="Phone Number" />
          </div>
          <TextInput id="phone_no" type="text" sizing="sm"  className="w-72"/>
        </div>
      </div>

 {/* Right Form */}
<div className="flex flex-col gap-4 w-1/2">
  <div className="w-72"> {/* Wrapper with fixed width */}
    <Dropdown label="ROOM TYPE" dismissOnClick={false}>
      <Dropdown.Item>Single Room</Dropdown.Item>
      <Dropdown.Item>Double Room</Dropdown.Item>
      <Dropdown.Item>Family Room</Dropdown.Item>
    </Dropdown>
  </div>
 
  <div className="ml-11 flex space-x-2 gap-16">
  <Button color="blue">A/C</Button>
  <Button color="success">None A/C</Button>
</div>


  <Table hoverable>
  <Table.Head>
    <Table.HeadCell>Room No</Table.HeadCell>
    <Table.HeadCell>   Book  </Table.HeadCell>
  </Table.Head>

  <Table.Body className="divide-y">

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        R001
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      <Checkbox />
      </Table.Cell>
    </Table.Row>

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        R002
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      <Checkbox />
      </Table.Cell>
    </Table.Row>

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        R003
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      <Checkbox />
      </Table.Cell>
    </Table.Row>

  </Table.Body>
</Table>


</div>
    

      
    </div>
  );
}

export default BookRoom;
