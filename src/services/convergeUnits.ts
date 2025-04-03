type Unit = {
  planet: string;
  name: string;
  relic: number;
  amount: number;
};
const convergedUnits: {
  [key: string]: {
    [key: string]: {
      amount: number;
      relic: number;
    };
  };
} = {};

export const convergeUnits = (units: Unit[]) => {
  units.forEach(unit => {
    const currentUnit = convergedUnits[unit.name];
    if (!currentUnit) {
      convergedUnits[unit.name] = {
        [unit.planet]: {
          amount: unit.amount,
          relic: unit.relic,
        },
      };
    } else if (!currentUnit[unit.planet]) {
      currentUnit[unit.planet] = { amount: unit.amount, relic: unit.relic };
    }
  });
  const convergedUnitsArr = Object.entries(convergedUnits);
  const result = convergedUnitsArr.map(([name, planets]) => {
    const planetObj = Object.entries(planets).reduce(
      (acc, planet) => {
        const [planetName, { amount, relic }] = planet;
        if (acc.relic == 0) {
          acc.relic = relic;
        }
        if (acc.relic === relic) {
          acc.amount = Number(acc.amount) + Number(amount);
          return { ...acc };
        } else {
          acc.isSameRelic = false;
          return {
            ...acc,
            differentRelic: [
              ...acc.differentRelic,
              {
                name: planetName,
                amount,
                relic,
              },
            ],
          };
        }
      },
      {
        amount: 0,
        relic: 0,
        isSameRelic: true,
        differentRelic: [],
      } as {
        amount: number;
        relic: number;
        isSameRelic: boolean;
        differentRelic: { amount: number; relic: number; name: string }[] | [];
      },
    );
    return { ...planetObj, name };
  });

  return result.sort((a, b) => b.amount - a.amount);
};
