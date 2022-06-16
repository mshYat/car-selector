import { useEffect, useMemo, useState } from "react";
import { Cars, CarType } from "./consts/Cars";
import "./App.scss";

const uniqTypes: CarType[] = Array.from(
  new Set(Cars.map((car) => car.type))
).sort();

export interface ICarsAttrs {
  type: string;
  color: string;
  seats: string;
  tires: string;
}

const attrsToSelect: (keyof ICarsAttrs)[] = ["type", "color", "seats", "tires"];

const initialFiltersState: ICarsAttrs = {
  type: "",
  color: "",
  seats: "",
  tires: "",
};

function App() {
  const [directionMode, setDirectionMode] = useState(false);
  const [resultCarName, setResultCarName] = useState("");

  const [selectedValue, setSelectedValue] = useState(initialFiltersState);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedValue({
      ...selectedValue,
      [name]: value,
    });
  };

  const uniqAttrs = useMemo(() => {
    let carsOfType = Cars;

    if (!directionMode) {
      attrsToSelect.forEach((p) => {
        if (selectedValue[p]) {
          carsOfType = carsOfType.filter(
            (car) => car[p].toString() === selectedValue[p]
          );
        }
      });
    }

    let result: { [key: string]: (string | number)[] } = {};
    attrsToSelect.forEach((p) => {
      // exclude type from result
      if (p !== "type") {
        result[p] = Array.from(new Set(carsOfType.map((car) => car[p]))).sort();
      }

      if (directionMode) {
        if (selectedValue[p]) {
          carsOfType = carsOfType.filter(
            (car) => car[p].toString() === selectedValue[p]
          );
        }
      }
    });

    return result;
  }, [directionMode, selectedValue]);

  useEffect(() => {
    // Reset filters on type reset
    if (!selectedValue.type && (selectedValue.color || selectedValue.seats)) {
      setSelectedValue(initialFiltersState);
    }

    const foundCar = Cars.filter(
      (car) =>
        car.type === selectedValue.type &&
        car.color === selectedValue.color &&
        car.seats.toString() === selectedValue.seats &&
        car.tires === selectedValue.tires
    );
    setResultCarName(foundCar.length === 1 ? foundCar[0].fullName : "");
  }, [selectedValue]);

  return (
    <div className="app">
      <div className="filter-mode-wrapper">
        <input
          type="checkbox"
          id="filter-mode-mode"
          checked={directionMode}
          onChange={() => setDirectionMode(!directionMode)}
        />
        <label htmlFor="filter-mode-mode">Enable direction filter mode</label>
      </div>

      <div className="selects-group">
        <>
          <select
            name="type"
            value={selectedValue.type}
            onChange={handleSelectChange}
          >
            <option value="">Select type</option>
            {uniqTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {Object.keys(uniqAttrs).map((attrKey) => {
            return (
              <select
                key={attrKey}
                name={attrKey}
                value={(selectedValue as any)[attrKey]}
                onChange={handleSelectChange}
                disabled={!selectedValue.type}
              >
                <option value="">Select {attrKey}</option>
                {uniqAttrs[attrKey].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            );
          })}
        </>
      </div>

      <div className="selected-car">
        <h2>
          {resultCarName.length ? resultCarName : "Please select filters"}
        </h2>
      </div>
    </div>
  );
}

export default App;
