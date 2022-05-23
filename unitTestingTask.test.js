const unitTestingTask = require('./unitTestingTask');

function handleValue (value) {
  if (value.length === 1) {
    return `0${value}`;
  }
  return `${value}`;
}

function handleValueForMS (value) {
  if (value.length === 1) {
    return `00${value}`;
  }
  if (value.length === 2) {
    return `0${value}`;
  }
  return `${value}`;
}

function formatHoursTo12(date) {
  return date.getHours() % 12 || 12;
}

const selectDay = new Date(2011, 0, 1, 12, 3, 4,);

describe('unitTestingTask', () => {

  it('errors', () => {
    expect(() => {unitTestingTask()}).toThrow('Argument `format` must be a string');
    expect(() => {unitTestingTask('test', true)})
    .toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  })

  describe('formate of time', () => {
  
    it('year', () => {
      const testDate = new Date(2002, 0, 1)
      expect(unitTestingTask('YYYY', selectDay)).toBe(selectDay.getFullYear().toString());
      expect(unitTestingTask('YY', selectDay)).toBe(selectDay.getFullYear().toString().substr(-2));
      expect(unitTestingTask('YY', testDate)).toBe(testDate.getFullYear().toString().substr(-2));
    })
    
    it('month', () => {
      const testDate = new Date (2011, 23, 11)
      expect(unitTestingTask('MMMM', selectDay)).toBe(selectDay.toLocaleString('local', { month: 'long' }));
      expect(unitTestingTask('MMM', selectDay)).toBe(selectDay.toLocaleString('local', {month: 'short'}));
      expect(unitTestingTask('M', selectDay)).toBe((selectDay.getMonth() + 1).toString())
      expect(unitTestingTask('MMMM', testDate)).toBe(testDate.toLocaleString('local', { month: 'long' }));
      expect(unitTestingTask('MMM', testDate)).toBe(testDate.toLocaleString('local', {month: 'short'}));
      expect(unitTestingTask('M', testDate)).toBe((testDate.getMonth() + 1).toString())
    })
  
    it('day of week', () => {
      expect(unitTestingTask('DDD', selectDay)).toBe(selectDay.toLocaleDateString('local', { weekday: 'long' }));
      expect(unitTestingTask('DD', selectDay)).toBe(selectDay.toLocaleDateString('local', { weekday: 'short' }));
      expect(selectDay.toLocaleDateString('local', { weekday: 'long' })).toContain(unitTestingTask('D', selectDay));
    })
  
    it('day of month', () => {
      expect(unitTestingTask('dd', selectDay)).toHaveLength(2)
      expect(unitTestingTask('dd', selectDay)).toBe(handleValue(selectDay.getDate().toString()));
      expect(unitTestingTask('d', selectDay)).toBe(selectDay.getDate().toString());
    })
  
    it('hours', () => {
      const testDate = new Date(2011, 0, 1, 8, 3, 4,);
      expect(unitTestingTask('HH', selectDay)).toHaveLength(2);
      expect(unitTestingTask('HH', selectDay)).toBe(handleValue(selectDay.getHours().toString()));
      expect(unitTestingTask('HH', testDate)).toBe(handleValue(testDate.getHours().toString()));
      expect(unitTestingTask('hh', selectDay)).toHaveLength(2);
      expect(unitTestingTask('hh', selectDay)).toBe(handleValue(formatHoursTo12(selectDay).toString()));
      expect(unitTestingTask('h', selectDay)).toBe(formatHoursTo12(selectDay).toString());
    })
    
    it('minutes', () => {
      expect(unitTestingTask('mm', selectDay)).toHaveLength(2);
      expect(unitTestingTask('mm', selectDay)).toBe(handleValue(selectDay.getMinutes().toString()));
      expect(unitTestingTask('m', selectDay)).toBe(selectDay.getMinutes().toString());
    })
    
    it('seconds', () => {
      expect(unitTestingTask('ss', selectDay)).toHaveLength(2);
      expect(unitTestingTask('ss', selectDay)).toBe(handleValue(selectDay.getSeconds().toString()));
      expect(unitTestingTask('s', selectDay)).toBe(selectDay.getSeconds().toString());
    })
    
    it('seconds', () => {
      expect(unitTestingTask('ff', selectDay)).toHaveLength(3);
      expect(unitTestingTask('ff', selectDay)).toBe(handleValueForMS(selectDay.getMilliseconds().toString()));
      expect(unitTestingTask('f', selectDay)).toBe(selectDay.getMilliseconds().toString());
    })
  
    it('AM/PM or am/pm', () => {
      const testDate = new Date(2011, 0, 1, 2, 3, 4,);
      expect(unitTestingTask('A', selectDay)).toBe(selectDay.getHours() < 12 ? 'AM' : 'PM');
      expect(unitTestingTask('a', selectDay)).toBe(selectDay.getHours() < 12 ? 'am' : 'pm');
      expect(unitTestingTask('a', testDate)).toBe(testDate.getHours() < 12 ? 'am' : 'pm');
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
      const lang = 'en';
      unitTestingTask.lang(lang)
      expect(unitTestingTask._languages.current).toBe(lang);
    });

    it('formatters', () => {
      expect(unitTestingTask('ISODate', selectDay)).toBe('2011-01-01')
    })

});
