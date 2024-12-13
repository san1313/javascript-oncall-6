import { InputView, OutputView } from './view';
import OnCall from './class/OnCall';
import InputValidator from './util/InputValidator';
import MESSAGE from './constant/message';

class App {
  #step = 0;
  #inputData = {};
  #onCall;

  async run() {
    while (this.#step !== 99) {
      if (this.#step === 0) await this.readDate();
      else if (this.#step === 1) await this.readEmployee();
      else if (this.#step === 2) this.initOnCall();
      else if (this.#step === 3) this.printWorkTableData();
    }
  }

  async readDate() {
    try {
      const date = await InputView.readDate();
      this.#step = 1;
      this.#inputData.date = date;
    } catch (err) {
      OutputView.printErrorMessage(err);
    }
  }

  async readEmployee() {
    try {
      await this.readWeekday();
      await this.readWeekend();
      if (!InputValidator.validateEmployeeList(this.#inputData.weekday, this.#inputData.weekend)) {
        throw new Error(MESSAGE.ERROR.INVALID_INPUT);
      }
      this.#step = 2;
    } catch (err) {
      OutputView.printErrorMessage(err);
    }
  }

  initOnCall() {
    const { date, weekday, weekend } = this.#inputData;
    this.#onCall = new OnCall(date, weekday, weekend);
    this.#step = 3;
  }

  printWorkTableData() {
    const dataArr = this.#onCall.createWorkTableData();
    OutputView.printWorkTable(dataArr);
    this.#step = 99;
  }

  async readWeekday() {
    const weekday = await InputView.readWeekday();
    this.#inputData.weekday = weekday;
  }

  async readWeekend() {
    const weekend = await InputView.readWeekEnd();
    this.#inputData.weekend = weekend;
  }
}

export default App;
