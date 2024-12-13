import OnCall from '../src/class/OnCall';

describe('OnCall 클래스 테스트', () => {
  test('해당 일자가 주말인지 확인한다.', () => {
    expect(OnCall.isWeekend(0)).toBe(true);
  });

  test('해당 일자가 법정 공휴일인지 확인한다.', () => {
    const holidayData = { '5': [5] };
    expect(OnCall.isHoliday(holidayData, 5, 1)).toBe(false);
    expect(OnCall.isHoliday(holidayData, 5, 5)).toBe(true);
  });

  test('이전 근무자와 현재 근무자 대상자가 동일한지 확인한다.', () => {
    const prev = '김김김';
    let curr = '김김김';
    expect(OnCall.isPreviousEmployee(prev, curr)).toBe(true);
    curr = '박박박';
    expect(OnCall.isPreviousEmployee(prev, curr)).toBe(false);
  })

  test('다음 근무자와 순서를 바꾼다.', () => {
    const oncall = new OnCall({ month: 5, day: 1 },
      ['준팍', '도밥', '고니', '수아', '루루', '글로', '솔로스타', '우코', '슬링키', '참새', '도리'],
      ['준팍', '도밥', '고니', '수아', '루루', '글로', '솔로스타', '우코', '슬링키', '참새', '도리']);
    oncall.swapOrder(false);
    expect(oncall.weekday[0]).toBe('도밥');
    expect(oncall.weekday[1]).toBe('준팍');
    expect(oncall.weekend[0]).toBe('준팍');
    expect(oncall.weekend[1]).toBe('도밥');
    oncall.swapOrder(true);
    expect(oncall.weekend[0]).toBe('도밥');
    expect(oncall.weekend[1]).toBe('준팍');
  });

  test('근무 편성표를 생성한다.', () => {
    const oncall = new OnCall({ month: 5, day: 1 },
      ['준팍', '도밥', '고니', '수아', '루루', '글로', '솔로스타', '우코', '슬링키', '참새', '도리'],
      ['수아', '루루', '글로', '솔로스타', '우코', '슬링키', '참새', '도리', '준팍', '도밥', '고니']);
    const dataArr = oncall.createWorkTableData();
    console.log(dataArr);
  });
})