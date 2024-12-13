import { InputView } from '../view';

class OnCall {
  #month;
  #day;
  #weekday;
  #weekend;
  #holidayData;
  #monthData;
  #prevEmployee = '';

  constructor(date, weekday, weekend) {
    const { month, day } = date;
    const dateData = InputView.readDateData();
    this.#month = month;
    this.#day = day;
    this.#weekday = weekday;
    this.#weekend = weekend;
    this.#holidayData = dateData.holiday;
    this.#monthData = dateData.month;
  }

  static isWeekend(day) {
    return day === 0 || day === 6;
  }

  static isHoliday(holidayData, month, date) {
    const holidayArr = holidayData[month];
    return holidayArr.includes(date);
  }

  static isPreviousEmployee(prevEmployeeName, currEmployeeName) {
    return prevEmployeeName === currEmployeeName;
  }

  createWorkTableData() {
    const lastDate = this.#monthData[this.#month];
    const dataArr = [];
    for (let i = 1; i <= lastDate; i += 1) {
      dataArr.push(this.createWorkTableDatum(i));
    }
    return dataArr;
  }

  createWorkTableDatum(date) {
    let target;
    const isWeekend = OnCall.isWeekend(this.#day);
    const isHoliday = OnCall.isHoliday(this.#holidayData, this.#month, date);
    if (isWeekend || isHoliday) target = this.#weekend;
    else target = this.#weekday;
    if (OnCall.isPreviousEmployee(this.#prevEmployee, target[0])) {
      this.swapOrder(isWeekend || isHoliday);
    }
    const datum = this.createDatum(date, isWeekend, isHoliday, target[0]);
    [this.#prevEmployee] = target;
    target.push(target.shift());
    this.#day = (this.#day + 1) % 7;
    return datum;
  }

  createDatum(date, isWeekend, isHoliday, name) {
    const datum = {
      month: this.#month,
      date,
      day: this.#day,
      isHoliday: !isWeekend && isHoliday,
      name,
    };
    return datum;
  }

  swapOrder(isWeekend) {
    let target;
    if (isWeekend) target = this.#weekend;
    else target = this.#weekday;
    const [first, second] = target;
    target[0] = second;
    target[1] = first;
  }

  get weekday() {
    return this.#weekday;
  }

  get weekend() {
    return this.#weekend;
  }
}

export default OnCall;
