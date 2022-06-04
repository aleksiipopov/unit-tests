const unitTestingTask = require('./unitTestingTask');

const selectDay = new Date(2011, 0, 1, 13, 3, 4, 3);

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(selectDay);
})

afterAll(() => {
  jest.useRealTimers();
});

describe('unitTestingTask', () => {

  it('errors', () => {
    expect(() => {unitTestingTask()}).toThrow('Argument `format` must be a string');
    expect(() => {unitTestingTask('test', true)})
    .toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  })

  describe('formate of time', () => {
  
    it('year', () => {
      const testDate = new Date(2002, 0, 1);
      expect(unitTestingTask('YYYY')).toBe('2011');
      expect(unitTestingTask('YY')).toBe('11');
      expect(unitTestingTask('YY', testDate)).toBe('02');
    })
    
    it('month', () => {
      const testDate = new Date (2011, 23, 11);
      expect(unitTestingTask('MMMM')).toBe('January');
      expect(unitTestingTask('MMM')).toBe('Jan');
      expect(unitTestingTask('M')).toBe('1')
      expect(unitTestingTask('MMMM', testDate)).toBe('December');
      expect(unitTestingTask('MMM', testDate)).toBe('Dec');
      expect(unitTestingTask('M', testDate)).toBe('12')
    })
  
    it('day of week', () => {
      expect(unitTestingTask('DDD')).toBe('Saturday');
      expect(unitTestingTask('DD')).toBe('Sat');
      expect('Sa').toBe(unitTestingTask('D'));
    })
  
    it('day of month', () => {
      expect(unitTestingTask('dd')).toHaveLength(2)
      expect(unitTestingTask('dd')).toBe('01');
      expect(unitTestingTask('d')).toBe('1');
    })
  
    it('hours', () => {
      const testDate = new Date(2011, 0, 1, 8, 3, 4,);
      expect(unitTestingTask('HH')).toHaveLength(2);
      expect(unitTestingTask('HH')).toBe('13');
      expect(unitTestingTask('HH', testDate)).toBe('08');
      expect(unitTestingTask('H', testDate)).toBe('8');
      expect(unitTestingTask('hh')).toHaveLength(2);
      expect(unitTestingTask('hh')).toBe('01');
      expect(unitTestingTask('h')).toBe('1');
    })
    
    it('minutes', () => {
      expect(unitTestingTask('mm')).toHaveLength(2);
      expect(unitTestingTask('mm')).toBe('03');
      expect(unitTestingTask('m')).toBe('3');
    })
    
    it('seconds', () => {
      expect(unitTestingTask('ss')).toHaveLength(2);
      expect(unitTestingTask('ss')).toBe('04');
      expect(unitTestingTask('s')).toBe('4');
    })
    
    it('seconds', () => {
      expect(unitTestingTask('ff')).toHaveLength(3);
      expect(unitTestingTask('ff')).toBe('003');
      expect(unitTestingTask('f')).toBe('3');
    })
  
    it('AM/PM or am/pm', () => {
      const testDate = new Date(2011, 0, 1, 2, 3, 4,);
      expect(unitTestingTask('A')).toBe('PM');
      expect(unitTestingTask('a')).toBe('pm');
      expect(unitTestingTask('a', testDate)).toBe('am');
    })
  
    it('AM/PM or am/pm', () => {
      function getTimeZone (date, flag) {
        const arrayOfPartsString = date.toString().split('GMT');
        if(flag) {
          const result = arrayOfPartsString[1].split('').splice(0, 5).join('');
          return result.substr(0, 3) + ':' + result.substr(3, 2);
        }
        return arrayOfPartsString[1].split('').splice(0, 5).join('');
      }
      expect(unitTestingTask('ZZ', selectDay)).toBe(getTimeZone(selectDay, false));
      expect(unitTestingTask('Z', selectDay)).toBe(getTimeZone(selectDay, true));
    })
  });

    it('default en lang', () => {
      unitTestingTask.lang('en')
      expect(unitTestingTask._languages.current).toBe('en');
      unitTestingTask.lang('be', 'cs')
      unitTestingTask.lang('kk')
      expect(unitTestingTask._languages.current).toBe('be');
    });

    it('formatters', () => {
      unitTestingTask.register('myFormat', 'YY-M-dd, h:mm')
      expect(unitTestingTask('myFormat')).toBe('11-1-01, 1:03')
      expect(unitTestingTask('myFormat')).toBe(unitTestingTask('YY-M-dd, h:mm', new Date()))
      expect(unitTestingTask('ISODate')).toBe('2011-01-01')
    })

});
