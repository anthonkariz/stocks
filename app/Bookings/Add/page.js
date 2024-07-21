"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "@/app/Components/common/input";
import { set, useForm } from "react-hook-form";
import Button from "@/app/Components/common/Button";
import { CalendarIcon } from "@heroicons/react/24/outline";
const service = [
  { id: 1, name: "Nurse" },
  { id: 2, name: "support" },
  { id: 3, name: "Care" },
];
const employees = [
  { id: 1, name: "John" },
  { id: 2, name: "Doe" },
  { id: 3, name: "Jane" },
];

export default function addBooking() {
  const [theDate, setDate] = useState({
    start: null,
    end: null,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(theDate);
    reset();
  };
  const CustomInput = ({ value, onClick }) => {
    return (
      <div className="border-2">
        <label className="flex">
          <input type="text" value={value} onClick={onClick} />
          <span>
            <CalendarIcon className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0" />
          </span>
        </label>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center flex-col w-full h-full">
      <h1>Add Booking</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex-col">
        <Input
          type="text"
          name="title"
          label="Todo (e.g do laundry)"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Todo text is required",
            minLength: {
              value: 3,
              message: "Please enter a minimum of 3 characters",
            },
          }}
          required
        />
        <div>
          <select name="employee">
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select name="service">
            {service.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="py-4">
          <DatePicker
            selected={theDate.start}
            onChange={(date) => setDate({ ...theDate, start: date })}
            showTimeSelect
            dateFormat="dd/MM/YYYY h:mm"
            placeholder="Birth Date"
            minDate={new Date()}
            isClearable
            showYearDropdown
            scrollableYearDropdown
            customInput={<CustomInput />}
          />
        </div>
        <label htmlFor="end" className="py-3">
          Start Time:
        </label>
        <div className="">
          <DatePicker
            selected={theDate.end}
            onChange={(date) => setDate({ ...theDate, end: date })}
            showTimeSelect
            dateFormat="dd/MM/YYYY h:mm"
            isClearable
            showYearDropdown
            scrollableYearDropdown
            customInput={<CustomInput />}
          />
        </div>
        <div className="flex items-center justify-end mt-3 w-full">
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
}
