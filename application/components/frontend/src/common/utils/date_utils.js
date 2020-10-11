import { MONTH_FULL_NAMES } from 'common/utils/date_constants';

export const getCurrentMonthName = () => MONTH_FULL_NAMES[new Date().getMonth()];

export const getCurrentYear = () => new Date().getFullYear();

export const getCurrentMonth = () => new Date().getMonth() + 1;

export const daysInCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

export const getCurrentDayOfMonth = () => new Date().getDate();
