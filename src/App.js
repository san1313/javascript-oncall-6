import { InputView, OutputView } from './view';
import OnCall from './class/OnCall';

class App {
  #step = 0;
  #inputData = {};
  #onCall;

  async run() {
    while (this.#step !== 4) {
      if (this.#step === 0) await this.readDate();
      else if (this.#step === 1) await this.readEmployee();
      else if (this.#step === 2) this.initOnCall();
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
