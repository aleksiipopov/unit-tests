const unitTestingTask = require('./unitTestingTask');

const selectDay = new Date(2011, 0, 1, 13, 3, 4, 3);

function getTimeZone (date, flag) {
  const arrayOfPartsString = date.toString().split('GMT');
  if(flag) {
    const result = arrayOfPartsString[1].split('').splice(0, 5).join('');
    return result.substr(0, 3) + ':' + result.substr(3, 2);
  }
  return arrayOfPartsString[1].split('').splice(0, 5).join('');
};

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(selectDay);
})

afterAll(() => {
  jest.useRealTimers();
});

describe('unitTestingTask', () => {

  it('it should return error if we invoke unitTestingTask without arguments', () => {
    expect(() => {unitTestingTask()}).toThrow('Argument `format` must be a string');
  });

  it('it should return error if we invoke unitTestingTask with incorrect format', () => {
    expect(() => {unitTestingTask('test', true)})
    .toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  })

  describe('formate of date', () => {
  
    it('it should return 2011 if we set YYYY format', () => {
      expect(unitTestingTask('YYYY')).toBe('2011');
    })
  
    it('it should return 11 if we set YY format', () => {
      expect(unitTestingTask('YY')).toBe('11');
    })
  
    it('it should return 02 if we set YY format and year 2002', () => {
      const testDate = new Date(2002, 2, 4 );
      expect(unitTestingTask('YY', testDate)).toBe('02');
    })
    
    it('it should return January if we set MMMM format', () => {
      expect(unitTestingTask('MMMM')).toBe('January');
    })
    
    it('it should return Jan if we set MMM format', () => {
      expect(unitTestingTask('MMM')).toBe('Jan');
    })
    
    it('it should return 1 if we set M format', () => {
      expect(unitTestingTask('M')).toBe('1');
    })
    
    it('it should return December if we set MMMM format and month', () => {
      const testDate = new Date (2011, 23, 11);
      expect(unitTestingTask('MMMM', testDate)).toBe('December');
    })
    
    it('it should return Dec if we set MMM format and month', () => {
      const testDate = new Date (2011, 23, 11);
      expect(unitTestingTask('MMM', testDate)).toBe('Dec');
    })
    
    it('it should return 12 if we set MMM format and month', () => {
      const testDate = new Date (2011, 23, 11);
      expect(unitTestingTask('M', testDate)).toBe('12');
    })
  
    it('it should return Saturday if we set DDD format', () => {
      expect(unitTestingTask('DDD')).toBe('Saturday');
    })
  
    it('it should return Satu if we set DD format', () => {
      expect(unitTestingTask('DD')).toBe('Sat');
    })
  
    it('it should return Sa if we set D format', () => {
      expect(unitTestingTask('D')).toBe('Sa');
    })
  
    it('it should return string with length equle 2 if we set dd format', () => {
      expect(unitTestingTask('dd')).toHaveLength(2);
    })
  
    it('it should return 01 if we set dd format', () => {
      expect(unitTestingTask('dd')).toBe('01');
    })
  
    it('it should return 1 if we set d format', () => {
      expect(unitTestingTask('d')).toBe('1');
    })
  
    it('it should return string with length equle 2 if we set HH format', () => {
      expect(unitTestingTask('HH')).toHaveLength(2);
    })
  
    it('it should return 13 if we set HH format', () => {
      expect(unitTestingTask('HH')).toBe('13');
    })
  
    it('it should return 08 if we set HH format and set date', () => {
      const testDate = new Date(2011, 0, 1, 8, 3, 4,);
      expect(unitTestingTask('HH', testDate)).toBe('08');
    })
  
    it('it should return 8 if we set H format and set date', () => {
      const testDate = new Date(2011, 0, 1, 8, 3, 4,);
      expect(unitTestingTask('H', testDate)).toBe('8');
    })
  
    it('it should return string with length equle 2 if we set h format', () => {
      expect(unitTestingTask('hh')).toHaveLength(2);

    })
  
    it('it should return 01 if we set hh format', () => {
      expect(unitTestingTask('hh')).toBe('01');
    })
  
    it('it should return 1 if we set h format', () => {
      expect(unitTestingTask('h')).toBe('1');
    })
    
    it('it should return string with length equle 2 if we set mm format', () => {
      expect(unitTestingTask('mm')).toHaveLength(2);
    })
    
    it('it should return 03 if we set mm format', () => {
      expect(unitTestingTask('mm')).toBe('03');
    })
    
    it('it should return 3 if we set m format', () => {
      expect(unitTestingTask('m')).toBe('3');
    })
    
    it('it should return string with length equle 2 if we set ss format', () => {
      expect(unitTestingTask('ss')).toHaveLength(2);
    })
    
    it('it should return 04 if we set ss format', () => {
      expect(unitTestingTask('ss')).toBe('04');
    })
    
    it('it should return 4 if we set s format', () => {
      expect(unitTestingTask('s')).toBe('4');
    })
    
    it('it should return string with length equle 3 if we set ff format', () => {
      expect(unitTestingTask('ff')).toHaveLength(3);
    })
    
    it('it should return 003 if we set ff format', () => {
      expect(unitTestingTask('ff')).toBe('003');
    })
    
    it('it should return 3 if we set f format', () => {
      expect(unitTestingTask('f')).toBe('3');
    })
  
    it('it should return PM if we set A format', () => {
      expect(unitTestingTask('A')).toBe('PM');
    })
  
    it('it should return pm if we set a format', () => {
      expect(unitTestingTask('a')).toBe('pm');
    })
  
    it('it should return am if we set a format and date', () => {
      const testDate = new Date(2011, 0, 1, 2, 3, 4,);
      expect(unitTestingTask('a', testDate)).toBe('am');
    })
  
    it('it should return timeZone if we set ZZ format', () => {
      expect(unitTestingTask('ZZ', selectDay)).toBe(getTimeZone(selectDay, false));
    })
  
    it('it should return timeZone if we set Z format', () => {
      expect(unitTestingTask('Z', selectDay)).toBe(getTimeZone(selectDay, true));
    })
  });

    it('it should return en language by default', () => {
      expect(unitTestingTask._languages.current).toBe('en');
    });

    it('it should return be language if we set lanuage with option', () => {
      unitTestingTask.lang('en');
      unitTestingTask.lang('be', 'cs');
      unitTestingTask.lang('kk');
      expect(unitTestingTask._languages.current).toBe('be');
    });

    it('it should return date in formate which we set in argument in function', () => {
      expect(unitTestingTask('ISODate')).toBe('2011-01-01');
    })

    it('it should return date in formate which we registered', () => {
      unitTestingTask.register('myFormat', 'YY-M-dd, h:mm');
      expect(unitTestingTask('myFormat')).toBe(unitTestingTask('YY-M-dd, h:mm'));
    })

    it('it should return date in custome formate which we set in argument in function', () => {
      unitTestingTask.register('myFormat', 'YY-M-dd, h:mm');
      expect(unitTestingTask('myFormat')).toBe('11-1-01, 1:03');
    })
});
