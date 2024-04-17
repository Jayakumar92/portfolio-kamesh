'use client';
import React, { useState } from 'react';
import Input from '@/components/input';

function Resources() {
  const [cylinderValue, setCylinderValue] = useState<any>({
    bore: '80',
    rod: '40',
    stock: '1300',
    rod_pressure: 110,
    bore_pressure: 94,
    test_pressure: 1.5,
    lowering_speed: 0.5,
    lifting_speed: 0.5,
  });
  const [results, setResults] = useState<any>([]);
  const [motor, setMotor] = useState<any>('');

  function onChange(e: any) {
    const key = e.target.name;
    const value = e.target.value;

    setCylinderValue({
      ...cylinderValue,
      [key]: value,
    });
  }

  function proceedCalculation() {
    const { bore, rod, stock, test_pressure, bore_pressure, rod_pressure, lowering_speed, lifting_speed } =
      cylinderValue;

    const convertedBore = parseFloat(bore);
    const convertedRod = parseFloat(rod);
    const convertedStock = parseFloat(stock);

    const convertedRodPressure = parseFloat(rod_pressure);
    const convertedBorePressure = parseFloat(bore_pressure);
    const convertedTestPressure = parseFloat(test_pressure);

    const convertedLiftingSpeed = parseFloat(lifting_speed);
    const convertedLoweringSpeed = parseFloat(lowering_speed);

    /**
     * area
     */

    const boreArea = 3.14 * (convertedBore / 2) ** 2;

    const rodside = boreArea - 3.14 * (convertedRod / 2) ** 2;
    const ratio = boreArea / rodside;

    const area = {
      'Annulur (Rod side)  Area of Cylinder': rodside,
      'Bore Side Area of Cylinder': boreArea,
      'Ratio  = Area (Bore ) / Area (Rod)': ratio,
    };

    /**
     * volume
     */

    const volumeOfRod = rodside * convertedStock;
    const volumeOfBore = boreArea * convertedStock;

    const volume = {
      'Volume of Annular (Rod) Side': volumeOfRod,
      'Volume of Bore Side': volumeOfBore,
    };

    /**
     * pressure
     */

    const testPressureRod = convertedTestPressure * convertedRodPressure;
    const testPressureBore = convertedTestPressure * convertedBorePressure;

    const pressure = {
      'Test Pressure at Rod side': testPressureRod,
      'Test Pressure at Bore  side': testPressureBore,
    };

    /**
     * force
     */

    const pullingForceRod = convertedRodPressure * 0.01 * rodside;
    const pullingForceBore = convertedBorePressure * 0.01 * boreArea;

    const force = {
      'Pulling Force - Rod Side': pullingForceRod,
      'Pushing Force - Piston Side': pullingForceBore,
    };

    /**
     * speed
     */

    const liftingCylinder = convertedLiftingSpeed * 0.166;
    const loweringCylinder = convertedLoweringSpeed * 0.166;

    const speed = {
      'Lifting Cylinder': liftingCylinder,
      'Pushing Force - Piston Side': loweringCylinder,
    };

    /**
     * Flow
     */

    const liftingFlow = rodside * convertedLiftingSpeed;
    const loweringFlow = boreArea * convertedLoweringSpeed;

    const flow = {
      'Lifting  Flow': liftingFlow,
      'Lowering Flow': loweringFlow,
    };

    /**
     *
     */

    const pumpCylinder = loweringFlow / 1000 + 1;

    const pump = {
      'Pump  for One cylinder': pumpCylinder,
    };

    const motor = ((pumpCylinder * testPressureRod) / 600 / 0.9) * 1.1;

    setMotor(motor);

    setResults([
      { id: '1', title: 'Area', value: area, units: 'mm^2' },
      { id: '2', title: 'Volume', value: volume, units: 'mm^3' },
      { id: '3', title: 'Pressure', value: pressure, units: 'bar' },
      { id: '4', title: 'Force', value: force, units: 'Kg F' },
      { id: '5', title: 'Speed', value: speed, units: 'm/sec' },
      { id: '6', title: 'Flow =  Area * Speed', value: flow, units: 'cm^3/min' },
      { id: '7', title: 'Pump', value: pump, units: 'LPM' },
    ]);
  }

  console.log(JSON.stringify(results));

  return (
    <div className="container mx-auto flex min-h-dvh w-screen gap-5  bg-white py-8">
      <div className="w-2/3 space-y-12">
        <div className="space-y-3">
          <h3 className=" text-lg font-bold text-gray-700">Cylinder</h3>
          <div className="flex w-full justify-between">
            <Input
              label="Bore"
              id="bore"
              placeholder="Bore Diameter of Cylinder"
              value={cylinderValue?.bore}
              onChange={onChange}
            />
            <Input
              label="Rod"
              id="rod"
              placeholder="Rod Diameter of Cylinder"
              value={cylinderValue?.rod}
              onChange={onChange}
            />
            <Input
              label="Stock"
              id="stock"
              placeholder="Stock Length of Cylinder"
              value={cylinderValue?.stock}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className=" text-lg font-bold text-gray-700">Pressure</h3>

          <div className="flex w-full justify-between">
            <Input
              label="Bore"
              id="bore_pressure"
              placeholder="Working Pressure at Bore  side"
              value={cylinderValue?.bore_pressure}
              onChange={onChange}
            />
            <Input
              label="Rod"
              id="rod_pressure"
              placeholder="Working Pressure at Rod side"
              value={cylinderValue?.rod_pressure}
              onChange={onChange}
            />
            <Input
              label="Test"
              id="test_pressure"
              placeholder="Test Pressure"
              value={cylinderValue?.test_pressure}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-700">Speed</h3>

          <div className="flex w-full gap-7">
            <Input
              label="Lifting"
              id="lifting_speed"
              placeholder="Lifting Cylinder"
              value={cylinderValue?.lifting_speed}
              onChange={onChange}
            />
            <Input
              label="Lowering"
              id="lowering_speed"
              placeholder="Lowering Cylinder"
              value={cylinderValue?.lowering_speed}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-primary rounded-md px-5 py-2" onClick={proceedCalculation}>
            {'Calculate'}
          </button>
        </div>
      </div>

      {results && (
        <div className="w-1/3 rounded-md bg-slate-100 p-5">
          <div className=" space-y-6">
            {results.map(({ title, value, units, id }: any) => (
              <div className="flex flex-col gap-3" key={id}>
                <h3 className=" text-primary text-lg font-bold capitalize">{title}</h3>
                <div>
                  {Object.entries(value as never).map(([key, result]) => (
                    <div key={key} className="flex items-center justify-between space-y-1">
                      <h3 className=" text-sm font-normal text-gray-700">{key}</h3>
                      <span className="flex items-center">
                        <p className=" text-base font-bold text-black">
                          {typeof result === 'number'
                            ? Number.isInteger(result)
                              ? result
                              : result.toFixed(3)
                            : result + ''}
                        </p>
                        <span className="ml-1 text-end text-[10px] text-gray-400">{units}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {motor && (
            <div className="mt-[40px] flex justify-between">
              <h3 className=" text-primary text-lg font-bold capitalize">{'Motor'}</h3>
              <span className="flex items-center">
                <p className=" text-base font-bold text-black">
                  {typeof motor === 'number' ? (Number.isInteger(motor) ? motor : motor.toFixed(3)) : motor + ''}
                </p>
                <span className="ml-1 text-end text-[10px] text-gray-400">KW</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Resources;
