'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './input';

export const formSchema = z
  .object({
    day: z
      .string()
      .min(1, { message: 'This field is required' })
      .refine(
        (value) => {
          const day = Number(value);
          return day > 0 && day <= 31;
        },
        { message: 'Must be a valid day' },
      ),
    month: z
      .string()
      .min(1, { message: 'This field is required' })
      .refine(
        (value) => {
          const month = Number(value);
          return month > 0 && month <= 12;
        },
        { message: 'Must be a valid month' },
      ),
    year: z
      .string()
      .min(1, { message: 'This field is required' })
      .refine((value) => Number(value) > 0, { message: 'Must be a valid year' })
      .refine((value) => Number(value) <= new Date().getFullYear(), {
        message: 'Must be in the past',
      }),
  })
  .refine(
    (data) => {
      const day = Number(data.day);
      const month = Number(data.month);

      if ([4, 6, 9, 11].includes(month)) return day <= 30;
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return day <= 31;

      const year = Number(data.year);

      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return day <= 29;
      }

      return day <= 28;
    },
    { message: 'Must be a valid date' },
  )
  .refine(
    ({ day, month, year }) => {
      const birthDate = new Date(`${year}-${month}-${day}`);
      return birthDate < new Date();
    },
    { message: 'Must be in the past' },
  );

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  day: '',
  month: '',
  year: '',
};

export const AgeCalculator = () => {
  const [years, setYears] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema), defaultValues });

  // temp solution for root error, since it's always undefined
  errors.root =
    !errors.day && !errors.month && !errors.year ? errors['' as keyof FormSchema] : undefined;

  const onSubmit: SubmitHandler<FormSchema> = ({ day, month, year }) => {
    const now = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      const lastMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

      days += lastMonthDays;
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    setYears(years);
    setMonths(months);
    setDays(days);
  };

  return (
    <div className="bg-off-white flex max-w-5xl flex-col gap-12 rounded-3xl rounded-br-[10rem] p-6 py-16 lg:px-12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="grid grid-cols-3 gap-x-4 gap-y-1 lg:w-10/12 lg:gap-x-8">
          <Input
            label="Day"
            placeholder="DD"
            error={errors.day?.message}
            isRootError={!!errors.root}
            {...register('day')}
          />

          <Input
            label="Month"
            placeholder="MM"
            error={errors.month?.message}
            isRootError={!!errors.root}
            {...register('month')}
          />

          <Input
            label="Year"
            placeholder="YYYY"
            error={errors.year?.message}
            isRootError={!!errors.root}
            {...register('year')}
          />

          {errors.root && <span className="text-light-red italic">{errors.root.message}</span>}
        </div>

        <div className="relative isolate flex justify-center lg:justify-end">
          <div className="bg-light-grey absolute top-1/2 -z-10 h-0.5 w-full" />

          <button
            className="bg-purple focus:bg-off-black hover:bg-off-black grid aspect-square place-content-center rounded-full p-4 transition-colors"
            type="submit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 lg:w-12" viewBox="0 0 46 44">
              <g fill="none" stroke="#FFF" stroke-width="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </button>
        </div>
      </form>

      <ul className="text-off-black flex flex-col gap-4 text-5xl font-extrabold italic lg:text-8xl">
        <li>
          <span className="text-purple">{years ?? '--'}</span> years
        </li>
        <li>
          <span className="text-purple">{months ?? '--'}</span> months
        </li>
        <li>
          <span className="text-purple">{days ?? '--'}</span> days
        </li>
      </ul>
    </div>
  );
};
