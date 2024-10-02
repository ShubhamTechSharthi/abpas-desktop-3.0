export const findKeyValue = (data, formKey) => {
  const value = data?.[formKey];
  return value !== null && value !== undefined ? value : "-";
};

export const findValue = (data, key, matchKey = "TypeId") => {
  const foundItem = data.find((item) => item[matchKey] === key);
  // console.log("founditem", foundItem?.DisplayName);
  return foundItem?.DisplayName;
};

export const findAllKeyValues = (obj, keyToFind, values = []) => {
  if (typeof obj !== "object" || obj === null) {
    return values;
  }

  if (obj.hasOwnProperty(keyToFind)) {
    values.push(obj[keyToFind]);
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      findAllKeyValues(obj[key], keyToFind, values);
    }
  }

  return values;
};

function replaceZero(value) {
  return value === 0 ? "-" : value;
}
function fixToTwoDecimalPlaces(value) {
  return Number(value).toFixed(2);
}

export const camelCaseToHumanReadable = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (match) => match.toUpperCase());
};

export const formatDate = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  return formattedDate;
};
export const formatNumber = (value) => {
  const number = parseFloat(value);
  return isNaN(number) ? "0.00" : number.toFixed(2);
};
