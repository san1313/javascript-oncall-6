import InputValidator from './InputValidator';
import MESSAGE from '../constant/message';
import DATE from '../constant/date';
import EMPLOYEE from '../constant/employee';

const Parser = {
  parseDateInput(input) {
    if (!InputValidator.validateDate(input)) {
      throw new Error(MESSAGE.ERROR.INVALID_INPUT);
    }
    let [month, day] = input.split(',');
    month = Number(month);
    day = DATE.DAY.indexOf(day);
    if (DATE.MONTH_MIN > month || DATE.MONTH_MAX < month) {
      throw new Error(MESSAGE.ERROR.INVALID_INPUT);
    }
    return { month, day };
  },
  parseEmployeeName(input) {
    if (!InputValidator.validateEmployeeName(input)) throw new Error(MESSAGE.ERROR.INVALID_INPUT);
    const employees = input.split(',');
    const size = employees.length;
    employees.forEach((employee) => {
      const nameLength = employee.length;
      if (nameLength < EMPLOYEE.NAME_LENGTH_MIN || nameLength > EMPLOYEE.NAME_LENGTH_MAX) {
        throw new Error(MESSAGE.ERROR.INVALID_INPUT);
      }
    });
    if (size !== new Set(employees).size || size < EMPLOYEE.SIZE_MIN || size > EMPLOYEE.SIZE_MAX) {
      throw new Error(MESSAGE.ERROR.INVALID_INPUT);
    }
    return employees;
  },
  parseWorkTable(data) {
    const {
      month, date, day, isWeekend: isHoliday, name,
    } = data;
    const form = MESSAGE.OUTPUT.RESULT_FORM;
    let holiday = '';
    if (isHoliday) holiday = DATE.HOLIDAY_MARK;
    const msg = form.replace('$0', month)
      .replace('$1', date)
      .replace('$2', DATE.DAY[day])
      .replace('$3', holiday)
      .replace('$4', name);
    return msg;
  },
};

export default Parser;
