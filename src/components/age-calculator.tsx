'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '~/utils/cn';

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
      .refine(
        (value) => {
          const year = Number(value);
          return year > 0 && year <= new Date().getFullYear();
        },
        { message: 'Must be a valid year' },
      ),
  })
  .refine(
    (data) => {
      const day = Number(data.day);
      const month = Number(data.month);
      const year = Number(data.year);

      if (month === 2) {
        if (year % 4 === 0) {
          return Number(day) <= 29;
        }

        return Number(day) <= 28;
      }

      if ([4, 6, 9, 11].includes(month)) {
        return Number(day) <= 30;
      }

      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return Number(day) <= 31;
      }
    },
    { message: 'Must be a valid date' },
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

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const { day, month, year } = data;

    const now = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);

    setYears(now.getFullYear() - birthDate.getFullYear());
    setMonths(now.getMonth() - birthDate.getMonth());
    setDays(now.getDate() - birthDate.getDate());
  };

  console.log(errors);

  return (
    <div className="bg-off-white flex flex-col gap-12 rounded-3xl rounded-br-[25%] p-6 py-16">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="day"
              className={cn(
                'text-smokey-grey text-sm font-bold uppercase tracking-widest',
                (errors.day || errors.root) && 'text-light-red',
              )}
            >
              Day
            </label>

            <input
              className={cn(
                'border-light-grey rounded-lg border bg-transparent p-4 text-xl font-bold',
                (errors.day || errors.root) && 'border-light-red',
              )}
              type="number"
              id="day"
              placeholder="DD"
              {...register('day')}
            />

            {errors.day && <span className="text-light-red text-xs">{errors.day.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="month"
              className={cn(
                'text-smokey-grey text-sm font-bold uppercase tracking-widest',
                (errors.month || errors.root) && 'text-light-red',
              )}
            >
              Month
            </label>

            <input
              className={cn(
                'border-light-grey rounded-lg border bg-transparent p-4 text-xl font-bold',
                (errors.month || errors.root) && 'border-light-red',
              )}
              type="number"
              id="day"
              placeholder="MM"
              {...register('month')}
            />

            {errors.month && <span className="text-light-red text-xs">{errors.month.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="year"
              className={cn(
                'text-smokey-grey text-sm font-bold uppercase tracking-widest',
                (errors.year || errors.root) && 'text-light-red',
              )}
            >
              Year
            </label>

            <input
              className={cn(
                'border-light-grey rounded-lg border bg-transparent p-4 text-xl font-bold',
                (errors.year || errors.root) && 'border-light-red',
              )}
              type="number"
              id="year"
              placeholder="YYYY"
              {...register('year')}
            />

            {errors.year && <span className="text-light-red text-xs">{errors.year.message}</span>}
          </div>

          {!errors.day && !errors.month && !errors.year && errors && (
            <span className="text-light-red text-xs">
              {Object.values(errors)
                .map(({ message }) => message)
                .join(', ')}
            </span>
          )}
        </div>

        <div className="relative isolate flex justify-center">
          <div className="bg-light-grey absolute top-1/2 -z-10 h-0.5 w-full" />
          <button
            className="bg-purple grid h-16 w-16 place-content-center rounded-full"
            type="submit"
          >
            <img src="/icon-arrow.svg" className="h-8 w-8" alt="Arrow" />
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4 text-5xl font-extrabold italic">
        <div>
          <span className="text-purple">{years ?? '--'}</span> years
        </div>
        <div>
          <span className="text-purple">{months ?? '--'}</span> months
        </div>
        <div>
          <span className="text-purple">{days ?? '--'}</span> days
        </div>
      </div>
    </div>
  );
};
