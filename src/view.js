import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './constant/message';
import Parser from './util/Parser';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.INPUT.DATE);
    return Parser.parseDateInput(input);
  },
  async readWeekday() {
    const input = await Console.readLineAsync(MESSAGE.INPUT.WEEKDAY);
    return Parser.parseEmployeeName(input);
  },
  async readWeekEnd() {
    const input = await Console.readLineAsync(MESSAGE.INPUT.WEEKEND);
    return Parser.parseEmployeeName(input);
  },
};

const OutputView = {
  printWorkTable(dataArr) {
    dataArr.forEach((data) => {
      Console.print(Parser.parseWorkTable(data));
    });
  },
  printErrorMessage(err) {
    Console.print(`[ERROR] ${err}`);
  },
};
export { InputView, OutputView };