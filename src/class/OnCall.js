class OnCall {
  #month;
  #day;
  #weekday;
  #weekend;

  constructor(date, weekday, weekend) {
    const { month, day } = date;
    this.#month = month;
    this.#day = day;
    this.#weekday = weekday;
    this.#weekend = weekend;
  }
}

export default OnCall;
