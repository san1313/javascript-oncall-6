const MESSAGE = Object.freeze({
  INPUT: Object.freeze({
    DATE: '비상 근무를 배정할 월과 시작 요일을 입력하세요> ',
    WEEKDAY: '평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ',
    WEEKEND: '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ',
  }),
  OUTPUT: Object.freeze({
    RESULT_FORM: '$0월 $1일 $2$3 $4',
  }),
  ERROR: Object.freeze({
    INVALID_INPUT: '유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
  }),
});

export default MESSAGE;
